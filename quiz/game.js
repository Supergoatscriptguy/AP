
let timerInterval;
let seconds = 0;
const timerDisplay = document.getElementById('timer');

function startTimer() {
    seconds = 0;
    clearInterval(timerInterval);
    updateTimerDisplay();
    timerDisplay.classList.remove('urgent');
    
    timerInterval = setInterval(() => {
        seconds++;
        updateTimerDisplay();
        
        if (seconds >= 50 && !timerDisplay.classList.contains('urgent')) {
            timerDisplay.classList.add('urgent');
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval);
}

function updateTimerDisplay() {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


function loadQuestion() {

    
    if (currentQuestion < currentQuestions.length) {

        

        startTimer();
    }
}


function selectOption(selectedOption) {
    if (answered) return;
    

    stopTimer();
}