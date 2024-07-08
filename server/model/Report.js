const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  tableNo:Number,
  orders: [{
    dish: String,
    quantity: Number,
    price: Number
  }],
  total: { type: Number, required: true }
});

module.exports = mongoose.model('Report', ReportSchema);
