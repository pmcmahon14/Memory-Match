
//SET VARIABLES

var firstCard = null;
var secondCard = null;
var matchCount = 0;
var totalMatch = 9;
var winCount = 0;
var accuracy = 0;
var attempts = 0;
var cards = [];
var size = 9;
var pick;
var timer = null;
var timerCount = 0;
var startOne = new Audio('Sounds/McConaugheyCommand.mp3');
var startTime;
var dnf = 0;
//var cardArray = firebase.database();

//LOAD SCREEN

$(document).ready(function(){
    $('.card').click(pickCard);
    startOne.play();
    pickDriver();

    //startTimer();
    });


var cardArray = [
    {driver: 'Images/drivers/aj.png',
        car: 'Images/thecars/aj.png'},
    {driver: 'Images/drivers/aric.png',
        car: 'Images/thecars/aric.png'},
    {driver: 'Images/drivers/austin.png',
        car: 'Images/thecars/austin.png'},
    {driver: 'Images/drivers/brad.png',
        car: 'Images/thecars/brad.png'},
    {driver: 'Images/drivers/chase.png',
        car: 'Images/thecars/chase.png'},
    {driver: 'Images/drivers/chris.png',
        car: 'Images/thecars/chris.png'},
    {driver: 'Images/drivers/clint.png',
        car: 'Images/thecars/clint.png'},
    {driver: 'Images/drivers/cole.png',
        car: 'Images/thecars/cole.png'},
    {driver: 'Images/drivers/dale.png',
        car: 'Images/thecars/dale.png'},
    {driver: 'Images/drivers/danica.png',
        car: 'Images/thecars/danica.png'},
    {driver: 'Images/drivers/daniel.png',
        car: 'Images/thecars/daniel.png'},
    {driver: 'Images/drivers/david.png',
        car: 'Images/thecars/david.png'},
    {driver: 'Images/drivers/denny.png',
        car: 'Images/thecars/denny.png'},
    {driver: 'Images/drivers/erik.png',
        car: 'Images/thecars/erik.png'},
    {driver: 'Images/drivers/jamie.png',
        car: 'Images/thecars/jamie.png'},
    {driver: 'Images/drivers/jimmie.png',
        car: 'Images/thecars/jimmie.png'},
    {driver: 'Images/drivers/kylebusch.png',
        car: 'Images/thecars/kylebusch.png'},
    {driver: 'Images/drivers/kylelarson.png',
        car: 'Images/thecars/kylelarson.png'},
    {driver: 'Images/drivers/landon.png',
        car: 'Images/thecars/landon.png'},
    {driver: 'Images/drivers/martin.png',
        car: 'Images/thecars/martin.png'},
    {driver: 'Images/drivers/matt.png',
        car: 'Images/thecars/matt.png'},
    {driver: 'Images/drivers/michael.png',
        car: 'Images/thecars/michael.png'},
    {driver: 'Images/drivers/paul.png',
        car: 'Images/thecars/paul.png'},
    {driver: 'Images/drivers/ricky.png',
        car: 'Images/thecars/ricky.png'},
    {driver: 'Images/drivers/ryannewman.png',
        car: 'Images/thecars/ryannewman.png'},
    {driver: 'Images/drivers/ryanblaney.png',
        car: 'Images/thecars/ryanblaney.png'},
    {driver: 'Images/drivers/trevor.png',
        car: 'Images/thecars/trevor.png'},
    {driver: 'Images/drivers/ty.png',
        car: 'Images/thecars/ty.png'}
];



//PICKS CARDS FROM ARRAY AND SHUFFLES CARDS

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

//CREAT GAMEBOARD

function buildDaytona () {

    for (var x = 0; x < cards.length; x++) {
        $('#' + x).html("<img src='"+cards[x].driver+"' class='img-responsive img-thumbnail'>");
    }
}//startTimer();

//TIMER

/*function startTimer() {
    //startTime = Date.now();
    setTimeout(function(){ alert("Hello"); }, 50000);
}*/

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
                    //alert("You win!");
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
            car: 'Images/thecars/aj.png'},
        {driver: 'Images/drivers/aric.png',
            car: 'Images/thecars/aric.png'},
        {driver: 'Images/drivers/austin.png',
            car: 'Images/thecars/austin.png'},
        {driver: 'Images/drivers/brad.png',
            car: 'Images/thecars/brad.png'},
        {driver: 'Images/drivers/chase.png',
            car: 'Images/thecars/chase.png'},
        {driver: 'Images/drivers/chris.png',
            car: 'Images/thecars/chris.png'},
        {driver: 'Images/drivers/clint.png',
            car: 'Images/thecars/clint.png'},
        {driver: 'Images/drivers/cole.png',
            car: 'Images/thecars/cole.png'},
        {driver: 'Images/drivers/dale.png',
            car: 'Images/thecars/dale.png'},
        {driver: 'Images/drivers/danica.png',
            car: 'Images/thecars/danica.png'},
        {driver: 'Images/drivers/daniel.png',
            car: 'Images/thecars/daniel.png'},
        {driver: 'Images/drivers/david.png',
            car: 'Images/thecars/david.png'},
        {driver: 'Images/drivers/denny.png',
            car: 'Images/thecars/denny.png'},
        {driver: 'Images/drivers/erik.png',
            car: 'Images/thecars/erik.png'},
        {driver: 'Images/drivers/jamie.png',
            car: 'Images/thecars/jamie.png'},
        {driver: 'Images/drivers/jimmie.png',
            car: 'Images/thecars/jimmie.png'},
        {driver: 'Images/drivers/kylebusch.png',
            car: 'Images/thecars/kylebusch.png'},
        {driver: 'Images/drivers/kylelarson.png',
            car: 'Images/thecars/kylelarson.png'},
        {driver: 'Images/drivers/landon.png',
            car: 'Images/thecars/landon.png'},
        {driver: 'Images/drivers/martin.png',
            car: 'Images/thecars/martin.png'},
        {driver: 'Images/drivers/matt.png',
            car: 'Images/thecars/matt.png'},
        {driver: 'Images/drivers/michael.png',
            car: 'Images/thecars/michael.png'},
        {driver: 'Images/drivers/paul.png',
            car: 'Images/thecars/paul.png'},
        {driver: 'Images/drivers/ricky.png',
            car: 'Images/thecars/ricky.png'},
        {driver: 'Images/drivers/ryannewman.png',
            car: 'Images/thecars/ryannewman.png'},
        {driver: 'Images/drivers/ryanblaney.png',
            car: 'Images/thecars/ryanblaney.png'},
        {driver: 'Images/drivers/trevor.png',
            car: 'Images/thecars/trevor.png'},
        {driver: 'Images/drivers/ty.png',
            car: 'Images/thecars/ty.png'}
    ];
    console.log('This is the reset card array ' + cardArray);
    //resetTimer();
    pickDriver();
}

//CALCULATES ACCURACY

function accuracyRating() {
    accuracy = Math.round((matchCount/attempts)*100) + '%';
    $('#accuracy').text(accuracy);
}

//SETS BOARD UP FOR SELECTED LEVEL OF PLAY

/*function settings() {

}*/

//PICKS PAIRS AND SHUFFLES CARDS