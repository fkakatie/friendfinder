// required packages
var express = require('express');
var path = require('path');

// setup express
var app = express();
var PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// start the server
app.listen(PORT, function() {
    console.log("friend finder ready on http://localhost:" + PORT);
});