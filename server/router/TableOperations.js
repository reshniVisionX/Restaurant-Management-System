const express = require('express');
const router = express.Router();
const cors = require('cors');
const Table = require('../model/Tables');
router.use(cors());
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

router.patch('/:tno', async (req, res) => {
   
  const { tno } = req.params;
  console.log("Setting false for ",tno)
  const { status, orders, total } = req.body;

  try {
    const updatedTable = await Table.findOneAndUpdate(
      { tno: tno },
      { status: status, orders: orders, total: total },
      { new: true }
    );

    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }

    res.json(updatedTable);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.patch('/update/:tno', async (req, res) => {
  const { tno } = req.params;
  const tableNumber = parseInt(tno, 10); // Parse tno to ensure it's an integer
  const { orders } = req.body;
 console.log("From Server orders ",tableNumber,orders);
  const updateFields = {};
  if (orders !== undefined) updateFields.orders = orders.orders;
  console.log("orders..",updateFields);
  try {
    const updatedTable = await Table.findOneAndUpdate(
      { tno: tableNumber },
      { $set: updateFields },
      { new: true }
    );
  
    console.log('Updated table:', updatedTable); // Add this line to check the updated document
  
    if (!updatedTable) {
      return res.status(404).json({ message: 'Table not found' });
    }
  
    res.json(updatedTable);
  } catch (err) {
    console.error('Error updating table:', err);
    res.status(500).json({ message: err.message });
  }
  
});

  
  router.patch('/clear/:tno', async (req, res) => {
    const { tno } = req.params;

    try {
        const updatedTable = await Table.findOneAndUpdate(
            { tno: tno }, 
            { status: true, orders: [], total: 0 }, 
            { new: true } 
        );

        if (!updatedTable) {
            return res.status(404).json({ message: `Table with tno ${tno} not found.` });
        }

        res.json({ message: `Table with tno ${tno} updated successfully.`, updatedTable });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
      const tables = await Table.find();
      res.json(tables);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  
  module.exports = router;