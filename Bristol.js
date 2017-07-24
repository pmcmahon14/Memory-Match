/**
 * Created by Patrick on 7/24/2017.
 */

//SET VARIABLES

var firstCard = null;
var secondCard = null;
var matchCount = 0;
var totalMatch = 4;
var winCount = 0;
var accuracy = 0;
var attempts = 0;
var cards = [];
var size = 4;
var pick;

//LOAD SCREEN

$(document).ready(function(){
    $('.card').click(pickCard);
    //$('.resetCards').click(resetCards);
    pickDriver();
    buildDaytona();
    reset();
});

var cardArray = [
    {driver: 'Images/drivers/aj.png',
        car: 'AJ_47.jpg'},
    {driver: 'Images/drivers/aric.png',
        car: 'aric_43.jpg'},
    {driver: 'Images/drivers/austin.png',
        car: 'Austin_3.jpg'},
    {driver: 'Images/drivers/brad.png',
        car: 'brad_2.jpg'},
    {driver: 'Images/drivers/chase.png',
        car: 'chase_24.jpg'},
    {driver: 'Images/drivers/chris.png',
        car: 'chris_37.jpg'},
    {driver: 'Images/drivers/clint.png',
        car: 'clint_14.jpg'},
    {driver: 'Images/drivers/cole.png',
        car: 'cole_72.jpg'},
    {driver: 'Images/drivers/dale.png',
        car: 'dale_88.jpg'},
    {driver: 'Images/drivers/danica.png',
        car: 'danica_10.jpg'},
    {driver: 'Images/drivers/daniel.png',
        car: 'daniel_19.jpg'},
    {driver: 'Images/drivers/david.png',
        car: 'david_38.jpg'},
    {driver: 'Images/drivers/denny.png',
        car: 'denny_11.jpg'},
    {driver: 'Images/drivers/erik.png',
        car: 'erik_77.jpg'},
    {driver: 'Images/drivers/jamie.png',
        car: 'jamie_1.jpg'},
    {driver: 'Images/drivers/jimmie.png',
        car: 'jimmie_48.jpg'},
    {driver: 'Images/drivers/kylebusch.png',
        car: 'kyle_18.jpg'},
    {driver: 'Images/drivers/kylelarson.png',
        car: 'kyle_42.jpg'},
    {driver: 'Images/drivers/landon.png',
        car: 'landon_34.jpg'},
    {driver: 'Images/drivers/martin.png',
        car: 'martin_78.jpg'},
    {driver: 'Images/drivers/matt.png',
        car: 'matt_20.jpg'},
    {driver: 'Images/drivers/michael.png',
        car: 'michael_95.jpg'},
    {driver: 'Images/drivers/paul.png',
        car: 'paul_27.jpg'},
    {driver: 'Images/drivers/ricky.png',
        car: 'ricky_17.jpg'},
    {driver: 'Images/drivers/ryannewman.png',
        car: 'ryan_31.jpg'},
    {driver: 'Images/drivers/ryanblaney.png',
        car: 'ryan_21.jpg'},
    {driver: 'Images/drivers/trevor.png',
        car: 'trevor_6.jpg'},
    {driver: 'Images/drivers/ty.png',
        car: 'ty_13.jpg'}
];

function pickDriver() {
    for (var i=0; i<size; i++) {
        if (cards.length < size*2) {
            pick = Math.floor(Math.random() * (cardArray.length-1));
            cards.push(cardArray[pick]);
            cards.push(cardArray[pick]);
            cardArray.splice(pick, 1);
        }
    }

    function shuffle(cards) {
        var currentIndex = cards.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            // And swap it with the current element.
            temporaryValue = cards[currentIndex];
            cards[currentIndex] = cards[randomIndex];
            cards[randomIndex] = temporaryValue;
        }
        return cards;
    }

// Used like so
    cards = shuffle(cards);
    console.log(cards);
    buildDaytona();
}

//create gameboard

function buildDaytona () {
    for (var x = 0; x < cards.length; x++) {
        $('#' + x).html("<img src='"+cards[x].driver+"' class='img-responsive img-thumbnail'>");
    }
}

//READS VALUES OF BOTH CARDS

function move() {
    var elem = document.getElementById("timeleft");
    var width = 1;
    var id = setInterval(frame, 500);
    function frame() {
        if (width >= 100) {
            clearInterval(id);
        } else {
            width++;
            elem.style.width = width + '%';
        }
    }
}

function pickCard(){
    if($(this).find('.back').is(':visible') === true){
        $(this).find('.back').hide();
        $(this).find('.front').show();
        console.log('back hidden');
        if(firstCard === null){
            firstCard = this;
            console.log('first card is', firstCard);
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
                }, 1000);
                accuracyRating();

            }
        }

        //BLOCKS CARD ALREADY FACE UP

    }else{
        console.log('already clicked', this);
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
    cards = [];
    pickDriver();
}

//CALCULATES ACCURACY

function accuracyRating() {
    accuracy = Math.round((matchCount/attempts)*100) + '%';
    console.log(accuracy);
    $('#accuracy').text(accuracy);
}

//SETS BOARD UP FOR SELECTED LEVEL OF PLAY

/*function settings() {

 }*/

//PICKS PAIRS AND SHUFFLES CARDS


