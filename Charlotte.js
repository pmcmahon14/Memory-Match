/**
 * Created by Patrick on 7/24/2017.
 */

//SET VARIABLES

var firstCard = null;
var secondCard = null;
var matchCount = 0;
var totalMatch = 6;
var winCount = 0;
var accuracy = 0;
var attempts = 0;
var cards = [];
var size = 6;
var pick;

//LOAD SCREEN

$(document).ready(function(){
    $('.card').click(pickCard);
    pickDriver();
});

var cardArray = [
    {driver: 'Images/drivers/aj.png',
        car: 'Images/cars/AJ_47.jpg'},
    {driver: 'Images/drivers/aric.png',
        car: 'Images/cars/aric_43.jpg'},
    {driver: 'Images/drivers/austin.png',
        car: 'Images/cars/Austin_3.jpg'},
    {driver: 'Images/drivers/brad.png',
        car: 'Images/cars/brad_2.jpg'},
    {driver: 'Images/drivers/chase.png',
        car: 'Images/cars/chase_24.jpg'},
    {driver: 'Images/drivers/chris.png',
        car: 'Images/cars/chris_37.jpg'},
    {driver: 'Images/drivers/clint.png',
        car: 'Images/cars/clint_14.jpg'},
    {driver: 'Images/drivers/cole.png',
        car: 'Images/cars/cole_72.jpg'},
    {driver: 'Images/drivers/dale.png',
        car: 'Images/cars/dale_88.jpg'},
    {driver: 'Images/drivers/danica.png',
        car: 'Images/cars/danica_10.jpg'},
    {driver: 'Images/drivers/daniel.png',
        car: 'Images/cars/daniel_19.jpg'},
    {driver: 'Images/drivers/david.png',
        car: 'Images/cars/david_38.jpg'},
    {driver: 'Images/drivers/denny.png',
        car: 'Images/cars/denny_11.jpg'},
    {driver: 'Images/drivers/erik.png',
        car: 'Images/cars/erik_77.jpg'},
    {driver: 'Images/drivers/jamie.png',
        car: 'Images/cars/jamie_1.jpg'},
    {driver: 'Images/drivers/jimmie.png',
        car: 'Images/cars/jimmie_48.jpg'},
    {driver: 'Images/drivers/kylebusch.png',
        car: 'Images/cars/kyle_18.jpg'},
    {driver: 'Images/drivers/kylelarson.png',
        car: 'Images/cars/kyle_42.jpg'},
    {driver: 'Images/drivers/landon.png',
        car: 'Images/cars/landon_34.jpg'},
    {driver: 'Images/drivers/martin.png',
        car: 'Images/cars/martin_78.jpg'},
    {driver: 'Images/drivers/matt.png',
        car: 'Images/cars/matt_20.jpg'},
    {driver: 'Images/drivers/michael.png',
        car: 'Images/cars/michael_95.jpg'},
    {driver: 'Images/drivers/paul.png',
        car: 'Images/cars/paul_27.jpg'},
    {driver: 'Images/drivers/ricky.png',
        car: 'Images/cars/ricky_17.jpg'},
    {driver: 'Images/drivers/ryannewman.png',
        car: 'Images/cars/ryan_31.jpg'},
    {driver: 'Images/drivers/ryanblaney.png',
        car: 'Images/cars/ryan_21.jpg'},
    {driver: 'Images/drivers/trevor.png',
        car: 'Images/cars/trevor_6.jpg'},
    {driver: 'Images/drivers/ty.png',
        car: 'Images/cars/ty_13.jpg'}
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
    cardArray = [
        {driver: 'Images/drivers/aj.png',
            car: 'Images/cars/AJ_47.jpg'},
        {driver: 'Images/drivers/aric.png',
            car: 'Images/cars/aric_43.jpg'},
        {driver: 'Images/drivers/austin.png',
            car: 'Images/cars/Austin_3.jpg'},
        {driver: 'Images/drivers/brad.png',
            car: 'Images/cars/brad_2.jpg'},
        {driver: 'Images/drivers/chase.png',
            car: 'Images/cars/chase_24.jpg'},
        {driver: 'Images/drivers/chris.png',
            car: 'Images/cars/chris_37.jpg'},
        {driver: 'Images/drivers/clint.png',
            car: 'Images/cars/clint_14.jpg'},
        {driver: 'Images/drivers/cole.png',
            car: 'Images/cars/cole_72.jpg'},
        {driver: 'Images/drivers/dale.png',
            car: 'Images/cars/dale_88.jpg'},
        {driver: 'Images/drivers/danica.png',
            car: 'Images/cars/danica_10.jpg'},
        {driver: 'Images/drivers/daniel.png',
            car: 'Images/cars/daniel_19.jpg'},
        {driver: 'Images/drivers/david.png',
            car: 'Images/cars/david_38.jpg'},
        {driver: 'Images/drivers/denny.png',
            car: 'Images/cars/denny_11.jpg'},
        {driver: 'Images/drivers/erik.png',
            car: 'Images/cars/erik_77.jpg'},
        {driver: 'Images/drivers/jamie.png',
            car: 'Images/cars/jamie_1.jpg'},
        {driver: 'Images/drivers/jimmie.png',
            car: 'Images/cars/jimmie_48.jpg'},
        {driver: 'Images/drivers/kylebusch.png',
            car: 'Images/cars/kyle_18.jpg'},
        {driver: 'Images/drivers/kylelarson.png',
            car: 'Images/cars/kyle_42.jpg'},
        {driver: 'Images/drivers/landon.png',
            car: 'Images/cars/landon_34.jpg'},
        {driver: 'Images/drivers/martin.png',
            car: 'Images/cars/martin_78.jpg'},
        {driver: 'Images/drivers/matt.png',
            car: 'Images/cars/matt_20.jpg'},
        {driver: 'Images/drivers/michael.png',
            car: 'Images/cars/michael_95.jpg'},
        {driver: 'Images/drivers/paul.png',
            car: 'Images/cars/paul_27.jpg'},
        {driver: 'Images/drivers/ricky.png',
            car: 'Images/cars/ricky_17.jpg'},
        {driver: 'Images/drivers/ryannewman.png',
            car: 'Images/cars/ryan_31.jpg'},
        {driver: 'Images/drivers/ryanblaney.png',
            car: 'Images/cars/ryan_21.jpg'},
        {driver: 'Images/drivers/trevor.png',
            car: 'Images/cars/trevor_6.jpg'},
        {driver: 'Images/drivers/ty.png',
            car: 'Images/cars/ty_13.jpg'}
    ];
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


