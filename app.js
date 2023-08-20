const express = require('express');
const path = require('path');
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const router = require('./routes');

const app = express();

app.use(cors());
app.options('*', cors()); // cors preflight
app.use(express.json({limit: '10kb'}));
router.use(express.urlencoded({extended: true, limit: '10kb'}));
app.use(express.static(path.join(__dirname, 'public'))); //static files


app.use('/', router);


module.exports = app;