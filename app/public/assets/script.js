var friendsData = require("../data/friends");

$(document).ready(function() {

    // check on profile pic button event
    $('.profPic').each( function() {

		$(this).on('change', function(event) {

            // if the user uploads a file
            if (this.files.length === 1) {

                // add file name as attribute
                $('.profPic').attr('data-caption', this.files[0].name);
                // change button text
                $('form .profBtn').html('<i class="fas fa-user-check"></i>' + '&nbsp;&nbsp;' + 'Pic Uploaded!');
                // add uploaded button class
                $('.profBtn').addClass('picUploaded');

            }
                
		});

		// firefox bug fix
		$(this).on('focus', function() {
            $(this).addClass('has-focus');
        });

		$(this).on('blur', function() {
            $(this).removeClass('has-focus');
        });

	});

    // when submit button is clicked
    $('#submit').on('click', function(event) {
        // prevent reload
        event.preventDefault();

        // user response to survey questions
        var q1 = $('#q1').val();
        var q2 = $('#q2').val();
        var q3 = $('#q3').val();
        var q4 = $('#q4').val();
        var q5 = $('#q5').val();
        var q6 = $('#q6').val();
        var q7 = $('#q7').val();
        var q8 = $('#q8').val();
        var q9 = $('#q9').val();
        var q10 = $('#q10').val();

        // store user data in object
        var newFriend = {
            username: $('#username').val().trim(),
            profPic: $('#pictureURL').val().trim(),
            survey: [q1, q2, q3, q4, q5, q6,q7, q8, q9, q10]
        }

        // console.log(newFriend.profPic);

        var mbtiType;
        let randomNum;

        // generate random number between 0 and 1
        function coinflip() {
            randomNum = Math.round(Math.random());
        }

        // find user mbti, but only based on ten questions...
        function findMbti(array) {

            // inverse user input on even questions
            for (var i = 1; i < array.length; i+=2) {

                switch (array[i]) {
                case 1:
                    array[i] = 5;
                    break;
                case 2:
                    array[i] = 4;
                    break;
                case 4:
                    array[i] = 2;
                    break;
                case 5:
                    array[i] = 1;
                    break;
                default:
                    break;
                }

            }

            // combine scores in each mbti dichotomy
            var iE = array[0] + array[1]; // introversion/extraversion
            var sN = array[2] + array[3]; // sensing/intuiting
            var fT = array[4] + array[5]; // feeling/thinking
            var pJ = array[6] + array[7]; // perceiving/judging
            var tA = array[8] + array[9]; // turbulent/assertive

            // store dichotomy scores in array
            var newArr = [iE, sN, fT, pJ, tA];

            for (var k = 0; k < newArr.length; k++) {

                // if dichotomy score is on the cusp, flip a coin to assign type
                if (newArr[k] === 6) {
                    coinflip();
                    newArr[k] += randomNum;
                }

            }

            // sets new value for each dichotomy
            iE = newArr[0];
            sN = newArr[1];
            fT = newArr[2];
            pJ = newArr[3];
            tA = newArr[4];

            // create mbti string
            iE <= 6 ? mbtiType = 'I' : mbtiType = 'E';
            sN <= 6 ? mbtiType += 'S' : mbtiType += 'N';
            fT <= 6 ? mbtiType += 'F' : mbtiType += 'T';
            pJ <= 6 ? mbtiType += 'P' : mbtiType += 'J';
            tA <= 6 ? mbtiType += '-T' : mbtiType += '-A';

            // add mbti array to newFriend object
            newFriend.mbtiArray = newArr;
            // add mbti type to newFriend object
            newFriend.mbtiType = mbtiType;

        }

        // find mbti based on user survey
        findMbti(newFriend.survey);

        // console.log(newFriend);
        // console.log('> ' + newFriend.username);
        // console.log('> ' + newFriend.profPic);
        // console.log('> ' + newFriend.survey);
        // console.log('> ' + newFriend.mbtiType);

        // post data to api
        $.post('/api/friends', newFriend, function(data) {

            console.log('this works');

            

        })

    });

    function match() {
        // store potential match scores in array
        var potentialMatches = [];

        // compare mbtiArray of user against all friends in friendsData
        for (var j = 0; j < friendsData.length; j++) {

            let matchScore = 0;

            // > get mbtiArray for each friend in friendData
            var friendMbtiArr = friendsData[j].mbtiArray;
            // > compare each item in mbtiArray
            // > get match score
            // > find friend with the closest match score

            for (var k = 0; k < (newFriend.mbtiArray.length - 1); k++) {

                matchScore += Math.abs(Number(friendMbtiArr[k]) - newFriend.mbtiArray[k]);
                console.log('match score: ' + matchScore)

            }

            potentialMatches.push(matchScore);
        
            console.log('potential matches: ' + potentialMatches);

        }

    }

    // get current time & put it in modal
    var now = moment().format('h:mm');
    $('.time').text(now);
    
    // update time every 15 seconds, just in case...
    setInterval(function() {
        now = moment().format('h:mm');
        $('.time').text(now);
    }, 15000);

});