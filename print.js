var inputParagraph = document.getElementById("inputParagraph");
var controlButton = document.getElementById("controlButton");
var pauseButton = document.getElementById("pauseButton");
var outputDiv = document.getElementById("output");
var intervalInput = document.getElementById("intervalInput");
var setIntervalButton = document.getElementById("setIntervalButton");
var displayingTextInput = document.getElementById("DisplayingTextInput");
var setDisplayingTextNumberButton = document.getElementById("setDisplayingofTextNumberButton");


var wordsToShow = 3; // Số từ mặc định hiển thị mỗi lần

setDisplayingTextNumberButton.addEventListener("click", function () {
    var newWordsToShow = parseInt(displayingTextInput.value);
    if (!isNaN(newWordsToShow) && newWordsToShow > 0) {
        wordsToShow = newWordsToShow;
    } else {
        alert("Please enter a valid positive number!");
    }
});

var interval;
var words = [];
var index = 0;
var isPlaying = false;
var currentIntervalTime = 200; // Default interval time in ms

setIntervalButton.addEventListener("click", function() {
    var newIntervalTime = parseInt(intervalInput.value);
    if (!isNaN(newIntervalTime) && newIntervalTime > 0) {
        currentIntervalTime = newIntervalTime;
    }
});

controlButton.addEventListener("click", function() {
    if (!isPlaying) {
        startDisplay();
    } else {
        resetDisplay();
    }
});

pauseButton.addEventListener("click", function() {
    if (isPlaying) {
        pauseDisplay();
    } else {
        continueDisplay();
    }
});

function startDisplay() {
    if (interval) {
        clearInterval(interval);
    }

    var paragraph = inputParagraph.value.trim();
    words = paragraph.split(/\s+/);
    index = 0;

    if (words.length === 0) {
        return;
    }

    isPlaying = true;
    controlButton.textContent = "Reset";
    pauseButton.disabled = false;

    interval = setInterval(displayNextWord, currentIntervalTime);
}

function resetDisplay() {
    clearInterval(interval);
    isPlaying = false;
    controlButton.textContent = "Play";
    pauseButton.textContent = "Pause"; // Reset the pause button text
    pauseButton.disabled = true;
    outputDiv.textContent = "";
}

function pauseDisplay() {
    clearInterval(interval);
    isPlaying = false;
    pauseButton.textContent = "Continue";
}

function continueDisplay() {
    if (!isPlaying) {
        isPlaying = true;
        pauseButton.textContent = "Pause";
        interval = setInterval(displayNextWord, currentIntervalTime);
    }
}

function displayNextWord() {
    if (index < words.length) {
        // Lấy 3 từ tiếp theo
        var nextWords = words.slice(index, index + wordsToShow).join(" ");
        outputDiv.textContent = nextWords;

        // Tăng chỉ số thêm 3
        // index += 3;

        // Chỉ tăng chỉ số thêm 1
        index++;
    } else {
        clearInterval(interval);
        isPlaying = false;
        controlButton.textContent = "Play";
        pauseButton.disabled = true;
    }
}

