$(document).ready(function() {

     var q1slide = $('#q1');
     var q2slide = $('#q2');
     var q3slide = $('#q3');
     var q4slide = $('#q4');
     var q5slide = $('#q5');
     var q6slide = $('#q6');
     var q7slide = $('#q7');
     var q8slide = $('#q8');
     var q9slide = $('#q9');
    var q10slide = $('#q10');

     var q1value = $('.q1');
     var q2value = $('.q2');
     var q3value = $('.q3');
     var q4value = $('.q4');
     var q5value = $('.q5');
     var q6value = $('.q6');
     var q7value = $('.q7');
     var q8value = $('.q8');
     var q9value = $('.q9');
    var q10value = $('.q10');

    $('input').change(function() {
        q1value.text(q1slide.val());
        q2value.text(q2slide.val());
        q3value.text(q3slide.val());
        q4value.text(q4slide.val());
        q5value.text(q5slide.val());
        q6value.text(q6slide.val());
        q7value.text(q7slide.val());
        q8value.text(q8slide.val());
        q9value.text(q9slide.val());
        q10value.text(q10slide.val());
    })

    var now = moment().format('h:mm');
    $('.time').text(now);
    
    setInterval(function() {
        now = moment().format('h:mm');
        $('.time').text(now);
    }, 15000);

});