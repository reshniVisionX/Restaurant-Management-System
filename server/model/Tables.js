const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tno: Number,
  status: Boolean,
<<<<<<< HEAD
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
=======
  orders: [{ dish: String , quantity:Number ,price :Number}],
  total: Number
>>>>>>> origin/main
});

module.exports = mongoose.model('Table', tableSchema);
