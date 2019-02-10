module.exports = {

    checkScore: function(user, friendsData, matchScores) {

        // compare mbtiArray of user against all friends in friendsData
        for (var j = 0; j < friendsData.length; j++) {

            let matchScore = 0;

            // get mbtiArray for each friend in friendData
            var matchMbtiArr = friendsData[j].mbtiArray;

            for (var k = 0; k < user.mbtiArray.length; k++) {

                matchScore += Math.abs(Number(matchMbtiArr[k]) - Number(user.mbtiArray[k]));

            }

            matchScores.push(matchScore);

        }

    }

}