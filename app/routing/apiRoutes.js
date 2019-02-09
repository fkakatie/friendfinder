// load data
var friends = require("../data/friends");

// routing...
module.exports = function(app) {

    app.get("/api/friends", function(req, res) {
        res.json(friends);
    });

}