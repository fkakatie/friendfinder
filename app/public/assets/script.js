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
    
    // setup modal
    var modal = $('#modal-container');
    var close = $('.close');

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
                case '1':
                case 1:
                    array[i] = 5;
                    break;
                case '2':
                case 2:
                    array[i] = 4;
                    break;
                case '4':
                case 4:
                    array[i] = 2;
                    break;
                case '5':
                case 5:
                    array[i] = 1;
                    break;
                default:
                    break;
                }

            }

            // combine scores in each mbti dichotomy
            var iE = Number(array[0]) + Number(array[1]); // introversion/extraversion
            var sN = Number(array[2]) + Number(array[3]); // sensing/intuiting
            var fT = Number(array[4]) + Number(array[5]); // feeling/thinking
            var pJ = Number(array[6]) + Number(array[7]); // perceiving/judging
            var tA = Number(array[8]) + Number(array[9]); // turbulent/assertive

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

        var arrayToConvert = Array.from(newFriend.survey);

        // find mbti based on user survey
        findMbti(arrayToConvert);

        // console.log(newFriend);
        // console.log('> ' + newFriend.username);
        // console.log('> ' + newFriend.profPic);
        // console.log('> ' + newFriend.survey);
        // console.log('> ' + newFriend.mbtiType);

        // post data to api
        $.post('/api/friends', newFriend, function(data) {

            $('.user-img').attr('src', newFriend.profPic);

            for (var j = 0; j < newFriend.mbtiArray.length; j++) {

                switch (newFriend.mbtiArray[j]) {
                    case '2':
                    case 2:
                        newFriend.mbtiArray[j] = 'two';
                        break;
                    case '3':
                    case 3:
                        newFriend.mbtiArray[j] = 'three';
                        break;   
                    case '4':
                    case 4:
                        newFriend.mbtiArray[j] = 'four';
                        break;  
                    case '5':
                    case 5:
                        newFriend.mbtiArray[j] = 'five';
                        break;  
                    case '6':
                    case 6:
                        newFriend.mbtiArray[j] = 'six';
                        break;   
                    case '7':
                    case 7:
                        newFriend.mbtiArray[j] = 'seven';
                        break;   
                    case '8':
                    case 8:
                        newFriend.mbtiArray[j] = 'eight';
                        break;       
                    case '9':
                    case 9:
                        newFriend.mbtiArray[j] = 'nine';
                        break;   
                    case '10':
                    case 10:
                        newFriend.mbtiArray[j] = 'ten';
                        break;             
                    default:
                        break;
                }

            }

            $('.user-iE').addClass(newFriend.mbtiArray[0]);
            $('.user-sN').addClass(newFriend.mbtiArray[1]);
            $('.user-fT').addClass(newFriend.mbtiArray[2]);
            $('.user-pJ').addClass(newFriend.mbtiArray[3]);
            $('.user-tA').addClass(newFriend.mbtiArray[4]);

            $('.match-name').text(data.username);
            $('.match-img').attr('src', data.profPic);

            for (var l = 0; l < data.mbtiArray.length; l++) {

                switch (data.mbtiArray[l]) {
                    case '2':
                    case 2:
                        data.mbtiArray[l] = 'two';
                        break;
                    case '3':
                    case 3:
                        data.mbtiArray[l] = 'three';
                        break;   
                    case '4':
                    case 4:
                        data.mbtiArray[l] = 'four';
                        break;  
                    case '5':
                    case 5:
                        data.mbtiArray[l] = 'five';
                        break;  
                    case '6':
                    case 6:
                        data.mbtiArray[l] = 'six';
                        break;   
                    case '7':
                    case 7:
                        data.mbtiArray[l] = 'seven';
                        break;   
                    case '8':
                    case 8:
                        data.mbtiArray[l] = 'eight';
                        break;       
                    case '9':
                    case 9:
                        data.mbtiArray[l] = 'nine';
                        break;   
                    case '10':
                    case 10:
                        data.mbtiArray[l] = 'ten';
                        break;             
                    default:
                        break;
                }

            }

            $('.match-iE').addClass(data.mbtiArray[0]);
            $('.match-sN').addClass(data.mbtiArray[1]);
            $('.match-fT').addClass(data.mbtiArray[2]);
            $('.match-pJ').addClass(data.mbtiArray[3]);
            $('.match-tA').addClass(data.mbtiArray[4]);

            modal.css('display', 'block');

        });

    });

    // style modal 
    function styleModal() {



    }

    // close modal
    $('.close').on('click', function(event) {
        modal.css('display', 'none');
    });

    // get current time & put it in modal
    var now = moment().format('h:mm');
    $('.time').text(now);
    
    // update time every 15 seconds, just in case...
    setInterval(function() {
        now = moment().format('h:mm');
        $('.time').text(now);
    }, 15000);

});