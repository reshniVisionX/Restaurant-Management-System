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
const Table = require('../model/Tables');

router.use(cookieParser());
router.use(cors());
router.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, PATCH, PUT');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});

const createDirIfNotExist = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

const imgUploadDir = path.join(__dirname, '../../frontend/public/images');


createDirIfNotExist(imgUploadDir);
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, imgUploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); 
    const filename = `${Date.now()}${ext}`; 
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

router.post('/createdish', upload.single('image'), async (req, res) => {
  try {
    const { item_id, category, name, rate, quantity, rating } = req.body;
    const image = req.file.filename; 

    const newDish = new Dish({
      item_id,
      category,
      name,
      rate,
      quantity,
      rating,
      image,
    });

    const savedDish = await newDish.save();
    res.status(201).json(savedDish);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Failed to create dish' });
  }
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


  router.delete('/dishes/:itemId', async (req, res) => {
    const { itemId } = req.params;
    try {
     
      const deletedDish = await Dish.findOneAndDelete({ item_id: itemId });
      if (!deletedDish) {
      
        return res.status(404).json({ error: 'Dish not found' });
      }
      res.status(200).json({ message: 'Dish deleted successfully' });
    } catch (error) {
     
      console.error('Error deleting dish:', error);
      res.status(500).json({ error: 'Failed to delete dish' });
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
  
  
  router.patch('/dishes/updateOne/:item_id', upload.single('uploadImage'), async (req, res) => {
    const { item_id } = req.params;
    const {
        category,
        name,
        rate,
        quantity,
        rating,
    } = req.body;

    try {
        const dish = await Dish.findOne({ item_id: item_id });
        if (!dish) {
            return res.status(404).send('Dish not found');
        }
    
        dish.category = category;
        dish.name = name;
        dish.rate = rate;
        dish.quantity = quantity;
        dish.rating = rating;

        if (req.file) {
            dish.image = `${req.file.filename}`; 
        }

        await dish.save();

        res.send('Dish updated successfully');
    } catch (error) {
        console.error('Error updating dish:', error);
        res.status(500).send('Internal Server Error');
    }
});

router.get('/tables', async (req, res) => {
  try {
    const tables = await Table.find();
    console.log(tables);
    res.json(tables);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
