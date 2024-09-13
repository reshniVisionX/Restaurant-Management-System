const express = require('express');
const router = express.Router();
const User = require('../model/register');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cors = require('cors');
require('dotenv').config();
const cookieParser = require('cookie-parser');
router.use(cookieParser());
// Enable CORS for all routes in this router
router.use(cors());
router.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const createToken=(_id)=>{
  return jwt.sign({_id: _id},process.env.JWT_SECRET,{ expiresIn: '1d' })
}


router.post('/registers', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields must be filled' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    const newUser = new User({ name, email, password });
    await newUser.validate();

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    const token = createToken(user._id);

    const savedUser = await user.save();
    console.log("Saved user into db:", savedUser);
    return res.json({ Status: "success", token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ errors: validationErrors });
    } else {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Failed to register user' });
    }
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
   
    if (!email || !password) {
      console.log("Email or password field is empty");
      return res.status(401).json({ error: 'Fields must not be empty' });
    }

   
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with the provided email");
      return res.status(401).json({ error: 'Invalid credentials, user does not exist' });
    }

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      req.session.userData = { name: user.name, email: user.email };
      res.cookie('userData', { name: user.name, email: user.email }, { httpOnly: true });
      console.log("Admin login successful");
      const token = createToken(user._id);
      return res.json({ message: 'Login successful', login: true, isAdmin: true, token });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("Password is invalid");
      return res.status(401).json({ error: 'Invalid credentials, password is incorrect' });
    }

    req.session.userData = { name: user.name, email: user.email };
    res.cookie('userData', { name: user.name, email: user.email }, { httpOnly: true });

    const token = createToken(user._id);
    console.log("Login successful for user:", user.email);
    res.json({ message: 'Login successful', login: true, isAdmin: false, token });
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to login' });
  }
});


  router.post('/logout', (req, res) => {
  
    req.session.destroy(err => {
      if (err) {
        console.error('Error destroying session:', err);
        res.status(500).json({ success: false, error: 'Failed to logout' });
      } else {
      
        res.clearCookie('connect.sid');
        res.clearCookie('userData'); 
      
        res.json({ success: true });
      }
    });
  });
  
  

  router.get('/userData', (req, res) => {
    const connectSid = req.cookies['connect.sid'];
    const userDataCookie = req.cookies['userData'];
  
    if (!userDataCookie || !userDataCookie.name || !userDataCookie.email) {
      console.log('User not logged in, or user data is missing.');
      return res.status(401).json({ error: 'Not logged in' });
    }
  
    console.log('connect.sid:', connectSid);
    res.json({ name: userDataCookie.name, email: userDataCookie.email });
  });
  

  router.get('/',(req,res)=>{
    const userDataCookie = req.cookies['userData'];
          if(userDataCookie){
           res.json({valid:true, name:req.session.name,email:req.session.email});
          }else{
            res.json({valid:false});
          }
  })

module.exports = router;
