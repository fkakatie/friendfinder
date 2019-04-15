// load data
var friendsData = require('../data/friends');

// routing...
module.exports = function(app) {

    'use strict';

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
        function checkScore(user, friendsData, matchScores) {

            // compare mbtiArray of user against all friends in friendsData
            for (var j = 0; j < friendsData.length; j++) {
                let matchScore = 0;
                // get mbtiArray for each friend in friendData
                var matchMbtiArr = friendsData[j].mbtiArray;
                for (var k = 0; k < user.mbtiArray.length; k++) {
                    // calculate score by how similiar user response is to each friend response
                    matchScore += Math.abs(Number(matchMbtiArr[k]) - Number(user.mbtiArray[k]));
                }
                // push match score into array
                matchScores.push(matchScore);
            }
        }

        checkScore(user, friendsData, matchScores);

        // find index of lowest score in array
        friendMatchIndex = matchScores.indexOf(Math.min(...matchScores));
        friendMatch = friendsData[friendMatchIndex];
        friendsData.push(user);
        res.json(friendMatch);
    });

}
