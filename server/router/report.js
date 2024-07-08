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

  router.get('/all', async (req, res) => {
    try {
      const reports = await Report.find();
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports:', error);
      res.status(500).json({ error: 'Failed to fetch reports' });
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

  router.get('/name/:name', async (req, res) => {
    const { name } = req.params;
  
    try {
      const reports = await Report.find({ name });
      if (!reports || reports.length === 0) {
        return res.status(404).json({ error: 'No reports found for this name' });
      }
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports by name:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.get('/email/:email', async (req, res) => {
    const { email } = req.params;
  
    try {
      const reports = await Report.find({ email_id: email });
      if (!reports || reports.length === 0) {
        return res.status(404).json({ error: 'No reports found for this email' });
      }
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports by email:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  router.get('/date/:date', async (req, res) => {
    const { date } = req.params;
  
    try {
<<<<<<< HEAD
      
      const dateObj = new Date(date);
      
      if (isNaN(dateObj.getTime())) {
        return res.status(400).json({ error: 'Invalid date format' });
      }
  
      const reports = await Report.find({
        date: {
          $gte: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()), 
          $lt: new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + 1) 
        }
      });

      if (!reports || reports.length === 0) {
        return res.status(404).json({ error: 'No reports found for this date' });
      }
  
=======
      const reports = await Report.find({ date: new Date(date) });
      if (!reports || reports.length === 0) {
        return res.status(404).json({ error: 'No reports found for this date' });
      }
>>>>>>> origin/main
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports by date:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
<<<<<<< HEAD
  
=======
>>>>>>> origin/main
module.exports = router;
