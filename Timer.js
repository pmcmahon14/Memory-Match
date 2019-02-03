let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    //set values to 1 instead of 1000 to count milliseconds

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 10);
        // check if we should stop it!
        if(secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        // display it
        displayTimeLeft(secondsLeft);
    }, 10);
}

//set values to 60000 to compensate for above execution every millisecond

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 6000);
    const remainderSeconds = seconds % 6000;
    const display = `${minutes}:${remainderSeconds < 1000 ? '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back At ${adjustedHour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    console.log(mins);
    timer(mins * 60);
    this.reset();
});