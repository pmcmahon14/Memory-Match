/**
 * Created by Patrick on 11/16/2016.
 */
first_card_clicked = null;
second_card_clicked = null;
total_number_matches = 2;
var match_counter = 0;
var matches = 0;
var games_played = 0;
var attempts = 0;
var accuracy = 0;

$(document).ready(function() {
    console.log("hello");
    $('.back').click(clickon);
    $('.reset').click(function() {
        games_played++;
        reset_stats();
        $('.front').hide();
        $('.back').show();
    });
});

function display_stats() {
    $('.games-played').find('.value').text(games_played);
    $('.attempts').find('.value').text(attempts);
    accuracyString = accuracy + "%";
    $('.accuracy').find('.value').text(accuracyString);
}

function reset_stats(){
    accuracy = 0;
    matches = 0;
    attempts = 0;
    match_counter = 0;
    first_card_clicked = null;
    second_card_clicked = null;
    display_stats();
}

/*this checks for match*/

function clickon() {
    var click1 = $(this).parent();
    var card1 = null;
    click1.find('.back').hide();
    click1.find('.front').show();
    if (first_card_clicked === null) {
        first_card_clicked = click1;
        console.log('this is : ', this);
        console.log("first_card_clicked");
    }   else {
            second_card_clicked = click1;
            card1 = first_card_clicked;
            attempts++;
            display_stats();
            if (first_card_clicked.attr('class') == (second_card_clicked.attr('class'))) {
                console.log('first_card_clicked is : ', first_card_clicked);
                console.log('second_card_clicked is : ', second_card_clicked);
                console.log("match");
                matches++;
                match_counter++;
                accuracy = Math.round(match_counter / attempts * 100);
                display_stats();
                card1.find('.front').addClass('match');
                click1.find('.front').addClass('match');
                setTimeout(match, 2000, card1, click1);
                first_card_clicked = null;
                second_card_clicked = null;
                if (match_counter == total_number_matches) {
                    console.log("You won!");
                    $('.card').addClass('win');
                    setTimeout(won, 2000);
                }
            } else {
                accuracy = (match_counter / attempts) * 100;
                display_stats();
                first_card_clicked.find('.front').addClass('diff');
                second_card_clicked.find('.front').addClass('diff');
                first_card_clicked = null;
                second_card_clicked = null;
                setTimeout(none, 2000, card1, click1);
            }
    }
}

function match(card1, click1) {
    card1.find('.front').removeClass('match');
    click1.find('.front').removeClass('match');
}
function won() {
    $('.card').removeClass('win');
}

function none(card1, click1) {
    card1.find('.front').removeClass('diff');
    click1.find('.front').removeClass('diff');
    card1.find('.front').hide();
    card1.find('.back').show();
    click1.find('.front').hide();
    click1.find('.back').show();
}



/*function clickon() {
    $(this).hide();
    if (first_card_clicked === null) {
        first_card_clicked = this;
        console.log('this is : ', this);
        console.log("first_card_clicked");
        return;
    } else {
        second_card_clicked = this;
        attempts++;
        $('.attempts > .value').text(attempts);
        if (($(first_card_clicked).next('image').attr('src')) === ($(second_card_clicked).next('image').attr('src'))) {
            console.log('first_card_clicked is : ', first_card_clicked);
            console.log('second_card_clicked is : ', second_card_clicked);
            console.log("match");
            matches++;
            $(".matching > .value")/*.text(games_played);
            var accuracy = (matches / attempts).toFixed(2) * 100 + ('%');
            $('.accuracy > .value').text(accuracy);
            first_card_clicked = null;
             second_card_clicked = null;
            if (matches === total_number_matches) {
                games_played++;
                console.log("You won!");
            } else {
                console.log("Good job!");
            }
        } else {
            setTimeout(timer, 2000);
            console.log("restart");
            return;
        } timer();
    }
}
function timer() {
    $(first_card_clicked).find('.back').show();
    $(second_card_clicked).find('.front').show();
}*/


