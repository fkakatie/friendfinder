// required packages
var express = require('express');
var path = require('path');

// setup express
var app = express();
var PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());