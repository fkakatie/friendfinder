// required packages
var path = require('path');

// routing...
module.exports = function(app) {

    // route to home page
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    // route to survey
    app.get('/survey', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });

    // route to 404 error page
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/404.html'));
    });

}