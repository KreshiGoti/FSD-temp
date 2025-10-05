const express = require('express');
const homeRoutes = require('./routes/home.routes');

const app = express();

// middleware placeholders for future features
app.use(express.json());

// routes
app.use('/', homeRoutes);

module.exports = app;
