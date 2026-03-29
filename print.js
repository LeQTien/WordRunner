// ====== ELEMENTS ======
var inputParagraph = document.getElementById("inputParagraph");
var controlButton = document.getElementById("controlButton");
var pauseButton = document.getElementById("pauseButton");
var outputDiv = document.getElementById("output");

var intervalInput = document.getElementById("intervalInput");
var setIntervalButton = document.getElementById("setIntervalButton");

var wordsInput = document.getElementById("DisplayingTextInput");
var setWordsButton = document.getElementById("setDisplayingofTextNumberButton");

// ====== STATE ======
var words = [];
var index = 0;
var timer = null;

var intervalTime = 200;
var wordsToShow = 3;

var isPlaying = false;
var hasStarted = false;

// ====== EVENTS ======

// set số từ
setWordsButton.onclick = function () {
    var val = parseInt(wordsInput.value);
    if (val > 0) {
        wordsToShow = val;
    }
};

// set interval
setIntervalButton.onclick = function () {
    var val = parseInt(intervalInput.value);
    if (val > 0) {
        intervalTime = val;

        if (isPlaying) {
            restartTimer();
        }
    }
};

// ENTER để set nhanh
wordsInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        setWordsButton.click();
    }
});

intervalInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        setIntervalButton.click();
    }
});

// play / reset
controlButton.onclick = function () {
    if (hasStarted) {
        reset();
    } else {
        start();
    }
};

// pause / continue
pauseButton.onclick = function () {
    if (isPlaying) {
        pause();
    } else {
        resume();
    }
};

// ====== CORE ======

function start() {
    var text = inputParagraph.value.trim();
    if (text === "") return;

    words = text.split(/\s+/);
    index = 0;

    isPlaying = true;
    hasStarted = true;

    controlButton.textContent = "Reset";
    pauseButton.disabled = false;

    startTimer();
}

function reset() {
    stopTimer();

    isPlaying = false;
    hasStarted = false;
    index = 0;
    words = [];

    outputDiv.textContent = "";

    controlButton.textContent = "Play";
    pauseButton.textContent = "Pause";
    pauseButton.disabled = true;
}

function pause() {
    stopTimer();
    isPlaying = false;
    pauseButton.textContent = "Continue";
}

function resume() {
    isPlaying = true;
    pauseButton.textContent = "Pause";
    startTimer();
}

// ====== TIMER ======

function startTimer() {
    if (timer !== null) return;

    timer = setInterval(nextWord, intervalTime);
}

function stopTimer() {
    if (timer !== null) {
        clearInterval(timer);
        timer = null;
    }
}

function restartTimer() {
    stopTimer();
    startTimer();
}

// ====== DISPLAY ======

function nextWord() {
    if (!isPlaying) return;

    if (index >= words.length) {
        reset();
        return;
    }

    var start = index;
    var end = start + wordsToShow;

    var text = words.slice(start, end).join(" ");
    outputDiv.textContent = text;

    index++;
}