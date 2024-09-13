const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tno: Number,
  status: Boolean,
  orders: [{ dish: String, quantity: Number, price: Number }],
  total: Number
}, 
{
  timestamps: true // This is where the timestamps option goes
});

module.exports = mongoose.model('Table', tableSchema);
