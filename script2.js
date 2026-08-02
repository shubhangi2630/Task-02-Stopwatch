let startTime = 0;
let elapsedTime = 0;
let timerInterval = null;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");

function formatTime(time) {
    let hours = Math.floor(time / 3600000);
    let minutes = Math.floor((time % 3600000) / 60000);
    let seconds = Math.floor((time % 60000) / 1000);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    return `${hours}:${minutes}:${seconds}`;
}

function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

startBtn.addEventListener("click", function () {
    if (timerInterval !== null) {
        return;
    }

    startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(updateDisplay, 1000);
});

pauseBtn.addEventListener("click", function () {
    if (timerInterval !== null) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
});

lapBtn.addEventListener("click", function () {
    if (elapsedTime === 0) {
        return;
    }

    const lapItem = document.createElement("li");
    lapItem.textContent = `Lap ${laps.children.length + 1}: ${formatTime(elapsedTime)}`;

    laps.appendChild(lapItem);
});

resetBtn.addEventListener("click", function () {
    clearInterval(timerInterval);

    timerInterval = null;
    startTime = 0;
    elapsedTime = 0;

    display.textContent = "00:00:00";
    laps.innerHTML = "";
});