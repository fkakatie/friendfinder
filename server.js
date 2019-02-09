// required packages
var express = require('express');

// setup express
var app = express();
var PORT = process.env.PORT || 3000;

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('./app/public')); // serves static files

// setup routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// start the server
app.listen(PORT, function() {
    console.log("friend finder ready on http://localhost:" + PORT);
});