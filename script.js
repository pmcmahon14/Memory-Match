
//SET VARIABLES

var firstCard = null;
var secondCard = null;
var matchCount = 0;
var totalMatch = 9;
var winCount = 0;
var accuracy = 0;
var attempts = 0;

//LOAD SCREEN

$(document).ready(function(){
    $('.card').click(pickCard);
    //$('.resetCards').click(resetCards);
    reset();
});

//READS VALUES OF BOTH CARDS

function pickCard(){
    if($(this).find('.back').is(':visible') === true){
        $(this).find('.back').hide();
        $(this).find('.front').show();
        console.log('back hidden');
        if(firstCard === null){
            firstCard = this;
            console.log('first card is', firstCard);
            return
            }else{
            secondCard = this;
            attempts++;
            $('#attempts').text(attempts);
            console.log('second card is', secondCard);

            //DETERMINE MATCH, UPDATE MATCH, ACCURACY RATING

            if($(firstCard).find('.front > img ').attr('src') === $(secondCard).find('.front > img').attr('src')){
                matchCount++;
                $('#matches').text(matchCount);
                firstCard = null;
                secondCard = null;
                console.log('You have a match!', matchCount);
                accuracyRating();

                //CHECKS FOR GAME WIN, UPDATE WIN COUNT

                if(matchCount < totalMatch){
                    return
                    }else{
                    winCount++;
                    $('#wins').text(winCount);
                    $('#winner').show();
                    $('.reset').off('click');
                    }

                    //NO MATCH, TURN CARDS BACK OVER, UPDATE ACCURACY RATING AT FUNCTION

                    }else{
                $('.card').off('click');
                setTimeout(function(){
                    $(firstCard).find('.back').show();
                    $(secondCard).find('.back').show();
                    firstCard = null;
                    secondCard = null;
                    $('.card').click(pickCard);
                    }, 1000)
                accuracyRating();

            }
        }

    //BLOCKS CARD ALREADY FACE UP

    }else{
        console.log('already clicked', this);
        return;
    }
}

//RESETS STATS

function reset() {
    matchCount = 0;
    accuracy = 0;
    attempts = 0;
    $('#matches').text(matchCount);
    $('#attempts').text(attempts);
    $('#accuracy').text(accuracy);
    $('.back').show();
    console.log('reset clicked');
}

//CALCULATES ACCURACY

function accuracyRating() {
    accuracy = Math.round((matchCount/attempts)*100) + '%';
    console.log(accuracy);
    $('#accuracy').text(accuracy);
}

//SETS BOARD UP FOR SELECTED LEVEL OF PLAY

function settings() {

}

//PICKS PAIRS AND SHUFFLES CARDS

function shuffle() {

}
/* Called by "$(document).ready" and "resetClicked".  Appends the 9 card fronts (2x) randomly into the 18 slots. */

/*function insertFrontCards () {
    var card;
    var card_img;
    var slot;
    var randomized_array;
    randomized_array = generateRandomCardSlots();
    for (var h=0; h <= 9; h+=9) {
        for (var i=1; i <= 9; i++) {                // go thru this loop 2x, when h=0 and h=9.
            if (theme === "pokemon") {
                if (i === 3 || i === 4) {
                    card = "images/pkmn_" + i + ".png";
                } else {
                    card = "images/pkmn_" + i + ".jpg";
                }
            } else {    // My Little Pony theme
                if (i === 4) {
                    card = "images/pony4b.png";     // pony4 is a png; all the rest are jpg
                } else {
                    card = "images/pony" + i + "b.jpg";
                }
            }
            card_img = $("<image>",
                {
                    src:    card,
                    alt:    "pony or pkmn" + i,
                    class:  "card_front"
                });
            slot = "#slot" + randomized_array[i-1+h] + " .front";
            $(slot).append(card_img);
        }
    }
    $("image").width("90%").height("100%");
}*/
