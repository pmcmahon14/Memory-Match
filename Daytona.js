
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
var timer = 50;
var timeleft = $('#timeleft');
var startOne = new Audio('Sounds/McConaugheyCommand.mp3');
//var cardArray = firebase.database();

//LOAD SCREEN

$(document).ready(function(){
    $('.card').click(pickCard);
    pickDriver();
});

var cardArray = [
    {driver: 'Images/drivers/aj.png',
        car: 'Images/cars/aj.png'},
    {driver: 'Images/drivers/aric.png',
        car: 'Images/cars/aric.png'},
    {driver: 'Images/drivers/austin.png',
        car: 'Images/cars/austin.png'},
    {driver: 'Images/drivers/brad.png',
        car: 'Images/cars/brad.png'},
    {driver: 'Images/drivers/chase.png',
        car: 'Images/cars/chase.png'},
    {driver: 'Images/drivers/chris.png',
        car: 'Images/cars/chris.png'},
    {driver: 'Images/drivers/clint.png',
        car: 'Images/cars/clint.png'},
    {driver: 'Images/drivers/cole.png',
        car: 'Images/cars/cole.png'},
    {driver: 'Images/drivers/dale.png',
        car: 'Images/cars/dale.png'},
    {driver: 'Images/drivers/danica.png',
        car: 'Images/cars/danica.png'},
    {driver: 'Images/drivers/daniel.png',
        car: 'Images/cars/daniel.png'},
    {driver: 'Images/drivers/david.png',
        car: 'Images/cars/david.png'},
    {driver: 'Images/drivers/denny.png',
        car: 'Images/cars/denny.png'},
    {driver: 'Images/drivers/erik.png',
        car: 'Images/cars/erik.png'},
    {driver: 'Images/drivers/jamie.png',
        car: 'Images/cars/jamie.png'},
    {driver: 'Images/drivers/jimmie.png',
        car: 'Images/cars/jimmie.png'},
    {driver: 'Images/drivers/joey.png',
        car: 'Images/cars/joey.png'},
    {driver: 'Images/drivers/kasey.png',
        car: 'Images/cars/kasey.png'},
    {driver: 'Images/drivers/kevin.png',
        car: 'Images/cars/kevin.png'},
    {driver: 'Images/drivers/kurt.png',
        car: 'Images/cars/kurt.png'},
    {driver: 'Images/drivers/kylebusch.png',
        car: 'Images/cars/kylebusch.png'},
    {driver: 'Images/drivers/kylelarson.png',
        car: 'Images/cars/kylelarson.png'},
    {driver: 'Images/drivers/landon.png',
        car: 'Images/cars/landon.png'},
    {driver: 'Images/drivers/martin.png',
        car: 'Images/cars/martin.png'},
    {driver: 'Images/drivers/matt.png',
        car: 'Images/cars/matt.png'},
    {driver: 'Images/drivers/michael.png',
        car: 'Images/cars/michael.png'},
    {driver: 'Images/drivers/paul.png',
        car: 'Images/cars/paul.png'},
    {driver: 'Images/drivers/ricky.png',
        car: 'Images/cars/ricky.png'},
    {driver: 'Images/drivers/ryannewman.png',
        car: 'Images/cars/ryannewman.png'},
    {driver: 'Images/drivers/ryanblaney.png',
        car: 'Images/cars/ryanblaney.png'},
    {driver: 'Images/drivers/trevor.png',
        car: 'Images/cars/trevor.png'},
    {driver: 'Images/drivers/ty.png',
        car: 'Images/cars/ty.png'}
];

function pickDriver() {
    startOne.play();
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

/*function move() {
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

this.startGame = function () {
    if (self.clearBoard) {
        //setPlayer(0);
        //self.clearBoard = false;
        //self.inPlay = true;
        timer();
        //var audio = {};
        //audio["walk"] = new Audio();
        //audio["walk"].src = "mp3/11408^LASER1.mp3";  //audio file source
        //audio["walk"].play(); //audio file play
    }
};

function timer() {
    startTime = Date.now();
    timer = setTimeout(updateProgress,100);
}

function updateProgress() {
    if (timer == 0) {
        alert("Red Flag!");
        resetTimer();
    } else {
        timer--;
        var percent = Math.floor(((Date.now() - startTime) / 50000) * 100);
        timeleft.css("width",percent+"%");
    }

    timer = setTimeout(updateProgress,100);
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
            car: 'Images/cars/aj.png'},
        {driver: 'Images/drivers/aric.png',
            car: 'Images/cars/aric.png'},
        {driver: 'Images/drivers/austin.png',
            car: 'Images/cars/austin.png'},
        {driver: 'Images/drivers/brad.png',
            car: 'Images/cars/brad.png'},
        {driver: 'Images/drivers/chase.png',
            car: 'Images/cars/chase.png'},
        {driver: 'Images/drivers/chris.png',
            car: 'Images/cars/chris.png'},
        {driver: 'Images/drivers/clint.png',
            car: 'Images/cars/clint.png'},
        {driver: 'Images/drivers/cole.png',
            car: 'Images/cars/cole.png'},
        {driver: 'Images/drivers/dale.png',
            car: 'Images/cars/dale.png'},
        {driver: 'Images/drivers/danica.png',
            car: 'Images/cars/danica.png'},
        {driver: 'Images/drivers/daniel.png',
            car: 'Images/cars/daniel.png'},
        {driver: 'Images/drivers/david.png',
            car: 'Images/cars/david.png'},
        {driver: 'Images/drivers/denny.png',
            car: 'Images/cars/denny.png'},
        {driver: 'Images/drivers/erik.png',
            car: 'Images/cars/erik.png'},
        {driver: 'Images/drivers/jamie.png',
            car: 'Images/cars/jamie.png'},
        {driver: 'Images/drivers/jimmie.png',
            car: 'Images/cars/jimmie.png'},
        {driver: 'Images/drivers/joey.png',
            car: 'Images/cars/joey.png'},
        {driver: 'Images/drivers/kasey.png',
            car: 'Images/cars/kasey.png'},
        {driver: 'Images/drivers/kevin.png',
            car: 'Images/cars/kevin.png'},
        {driver: 'Images/drivers/kurt.png',
            car: 'Images/cars/kurt.png'},
        {driver: 'Images/drivers/kylebusch.png',
            car: 'Images/cars/kylebusch.png'},
        {driver: 'Images/drivers/kylelarson.png',
            car: 'Images/cars/kylelarson.png'},
        {driver: 'Images/drivers/landon.png',
            car: 'Images/cars/landon.png'},
        {driver: 'Images/drivers/martin.png',
            car: 'Images/cars/martin.png'},
        {driver: 'Images/drivers/matt.png',
            car: 'Images/cars/matt.png'},
        {driver: 'Images/drivers/michael.png',
            car: 'Images/cars/michael.png'},
        {driver: 'Images/drivers/paul.png',
            car: 'Images/cars/paul.png'},
        {driver: 'Images/drivers/ricky.png',
            car: 'Images/cars/ricky.png'},
        {driver: 'Images/drivers/ryannewman.png',
            car: 'Images/cars/ryannewman.png'},
        {driver: 'Images/drivers/ryanblaney.png',
            car: 'Images/cars/ryanblaney.png'},
        {driver: 'Images/drivers/trevor.png',
            car: 'Images/cars/trevor.png'},
        {driver: 'Images/drivers/ty.png',
            car: 'Images/cars/ty.png'}
    ];
    console.log('This is the reset card array ' + cardArray);
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


