const express = require('express');
const app = express();

// create middleware
const AuthRoute = require('./routes/auth/auth');

// use route middleware
app.use('/api/auth', AuthRoute);

module.exports = app;