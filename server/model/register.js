const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 255,
    match: /^[a-zA-Z ]+$/,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    maxlength: 255,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 4,
    maxlength: 255,
  }
},{
    timestamps:true,
  
});

module.exports = mongoose.model('User', UserSchema);
