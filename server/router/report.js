const express = require('express');
const router = express.Router();
const cors = require('cors');
const Report = require('../model/Report');
router.use(cors());
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

router.get('/user', async (req, res) => {
    const { name, email } = req.query;
  
    try {
      const reports = await Report.find({ name: name, email_id: email });
      if (!reports) {
        return res.status(404).json({ error: 'No reports found for this user' });
      }
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });


router.post('/', async (req, res) => {
    try {
      const { name, email_id, date, time,tableNo, orders, total } = req.body;
  
      const newReport = new Report({
        name,
        email_id,
        date,
        time,
        tableNo,
        orders,
        total
      });
  
      await newReport.save();
      res.status(201).json({ message: 'Report created successfully' });
    } catch (error) {
      console.error('Error creating report:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  
module.exports = router;
