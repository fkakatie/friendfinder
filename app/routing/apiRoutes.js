// load data
var friendsData = require('../data/friends');
var match = require('./javascript/modules/match.js');

// routing...
module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friendsData);
    });

    app.post('/api/friends', function(req, res) {
        
        // store current user data
        var user = req.body;
        // store potential match scores in array
        var matchScores = [];
        // setup match variables
        var friendMatchIndex;
        var friendMatch;
        
        // check match
        match.checkScore(user, friendsData, matchScores);

        // find index of lowest score in array
        friendMatchIndex = matchScores.indexOf(Math.min(...matchScores));
        friendMatch = friendsData[friendMatchIndex];

        res.json(friendMatch);

        friendsData.push(user);
        
    });

}