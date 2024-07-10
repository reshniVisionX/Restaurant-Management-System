const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tno: Number,
  status: Boolean,
  orders: [{ dish: String, quantity: Number, price: Number }],
  total: Number,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  }
}, 
{
  timestamps: true 
});

module.exports = mongoose.model('Table', tableSchema);
