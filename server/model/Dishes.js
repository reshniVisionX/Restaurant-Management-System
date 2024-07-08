const mongoose = require('mongoose');

const dishSchema = new mongoose.Schema({
  item_id: { type: Number,  unique: true },
  category: { type: String },
  name: { type: String },
  rate: { type: Number},
  quantity: { type: Number },
  rating: { type: Number},
  image: { type: String }
});

const Dish = mongoose.model('Dish', dishSchema);

module.exports = Dish;
