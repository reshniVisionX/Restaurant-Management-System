const express = require('express');
const router = express.Router();
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();
const Dish = require('../model/Dishes');
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


router.get('/dishes', async (req, res) => {
    try {
      const dishes = await Dish.find();
      res.status(200).json(dishes);
    } catch (error) {
      console.error('Error fetching dishes:', error);
      res.status(500).json({ error: 'Failed to fetch dishes' });
    }
  });
  
  
  router.get('/dishes/search/:item_id', async (req, res) => {
    const { item_id } = req.params;
    console.log(item_id);
    try {
      const dish = await Dish.findOne({ item_id: item_id });
      if (!dish) {
        return res.status(404).send('Dish not found');
      }
      res.json({ dish });
    } catch (error) {
      console.error('Error fetching dish by ID:', error);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  router.get('/dishes/search/name/:name', async (req, res) => {
    const { name } = req.params;
    console.log(name);
    try {
      const dishes = await Dish.find({ name: { $regex: name, $options: 'i' } });
      if (!dishes.length) {
        return res.status(404).send('No dishes found with the given name');
      }
      res.json({ dishes });
    } catch (error) {
      console.error('Error fetching dishes by name:', error);
      res.status(500).send('Internal Server Error');
    }
  });

  
router.patch('/dishes/orderOne/:item_id', async (req, res) => {
 
    const { item_id } = req.params;
    console.log("decrementing id ",item_id);
    try {
      const dish = await Dish.findOne({ item_id: parseInt(item_id, 10) });
      console.log(dish);
      if (!dish) {
        return res.status(404).json({ error: 'Dish not found' });
      }
  
      if (dish.quantity <= 0) {
        return res.status(400).json({ error: 'Dish quantity is already zero' });
      }
  
      dish.quantity -= 1;
      await dish.save();
  
      res.status(200).json({ message: 'Dish quantity decremented successfully' });
    } catch (error) {
      console.error('Error decrementing dish quantity:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  module.exports = router;