const express = require('express');
const router = express.Router();
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const Report = require('../model/Report')
const cookieParser = require('cookie-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

router.use(cookieParser());
router.use(cors());
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
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
  
      res.status(200).json(reports);
    } catch (error) {
      console.error('Error fetching reports by date:', error);
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
  
  module.exports = router;
  