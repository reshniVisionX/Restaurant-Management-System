const express = require('express');
const mongoose = require('mongoose');
const authentication = require('./router/authentication');
const adminFunctions = require('./router/packageCRUD');
const dishes = require('./router/Dishes')
const Table = require('./router/TableOperations');
const Reports = require('./router/report');
const Feedback = require('./router/feedback');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authMiddleware = require('./middleware/AuthMiddleware');
const authAdmin = require('./middleware/AuthAdmin')
const adminReport = require('./router/AdminRoutes')
const app = express();

app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'], // Allow specific HTTP methods
    credentials: true, // Enable sending cookies from frontend
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false, //if no modification done
    saveUninitialized: false,
    cookie: {
        secure: false, //cause we dont use https
        maxAge: 1000 * 60 * 60 * 24, //=one day
    }
}));

const url = process.env.SECRET_URL;

mongoose.connect(url);
const con = mongoose.connection;

con.on('open', () => {
    console.log('DB connected SUCCESSFULLY ...');
});

app.use('/admin',  authAdmin,adminFunctions);
app.use('/admin/reports', authAdmin,adminReport);
app.use('/api',authMiddleware,dishes);
app.use('/tables', authMiddleware, Table); 
app.use('/reports', authMiddleware, Reports);
app.use('/api', authMiddleware,Feedback); 
app.use(authentication);

app.listen(4000, () => {
    console.log('Server running on port 4000');
});
