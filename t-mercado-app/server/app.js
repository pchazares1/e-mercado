const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');


// create middleware
const AuthRoute = require('./routes/auth/auth');

// .env
dotenv.config();
// body parser
app.use(express.json());

// connect DB
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);
mongoose.connect(process.env.CONNECT_DB2, { useNewUrlParser: true })
    .then(() => {
        console.log('DB Connection Successful')
    })
    .catch((error) =>{
        console.log('DB Connection Failed\n' + error);
    });

// use route middleware
app.use('/api/auth', AuthRoute);

module.exports = app;