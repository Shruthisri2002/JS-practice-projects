let timeInSeconds = 0; // Initial time in seconds (start from 00:00:00)
let id = null; // Interval ID
const countdownDisplay = document.getElementById("countdown");

// Get buttons and input
const start = document.getElementById("start");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const targetTimeInput = document.getElementById("target-time");

// Set target time from input field
targetTimeInput.addEventListener('input', (e) => {
    timeInSeconds = convertToSeconds(e.target.value);
    countdownDisplay.innerText = formatTime(timeInSeconds);
});

// Start/Pause button functionality
start.addEventListener('click', () => {
    if (!id) { // Start the countdown if not running
        id = setInterval(countdown, 1000);
        start.innerText = 'Pause'; // Change button to 'Pause'
    } else { // Pause the countdown if it's running
        clearInterval(id);
        id = null;
        start.innerText = 'Start'; // Change button back to 'Start'
    }
});

// Reset button functionality
reset.addEventListener('click', () => {
    clearInterval(id);
    id = null;
    timeInSeconds = 0; // Reset time to 00:00:00
    countdownDisplay.innerText = formatTime(timeInSeconds);
    start.innerText = 'Start'; // Reset the button to 'Start'
});

// Countdown logic
function countdown() {
    if (timeInSeconds <= 0) {
        alert("Oops! Time's up!");
        clearInterval(id);
        id = null;
        start.innerText = 'Start'; // Reset the button text when time's up
    } else {
        timeInSeconds--;
        countdownDisplay.innerText = formatTime(timeInSeconds); // Update the countdown display
    }
}

// Convert time (HH:MM:SS) to seconds
function convertToSeconds(timeStr) {
    const [hours, minutes, seconds] = timeStr.split(":").map(num => parseInt(num, 10));
    return (hours * 3600) + (minutes * 60) + seconds;
}

// Format time in HH:MM:SS format
function formatTime(seconds) {
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = seconds % 60;
    return `${padTime(hours)}:${padTime(minutes)}:${padTime(secs)}`;
}

// Pad single digits with leading zeros
function padTime(unit) {
    if (unit < 10) {
        return '0' + unit;
    } else {
        return unit;
    }
}

// Initialize the countdown display to 00:00:00 initially
countdownDisplay.innerText = formatTime(timeInSeconds);