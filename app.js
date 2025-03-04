function startGame() {
    fetch('data/words.json')
        .then(response => response.json())
        .then(data => {
            const words = data.words;
            const randomWord = words[Math.floor(Math.random() * words.length)];
            initializeGame(randomWord);
        });
}

function initializeGame(word) {
    // Initialize game variables
    let guessedLetters = [];
    let attemptsLeft = 6;
    const wordDisplay = document.getElementById('word-display');
    const attemptsDisplay = document.getElementById('attempts-left');
    
    updateDisplay(word, guessedLetters, attemptsLeft);

    document.getElementById('guess-button').addEventListener('click', function() {
        const guessInput = document.getElementById('guess-input').value;
        checkGuess(guessInput, word, guessedLetters, attemptsDisplay, wordDisplay);
        document.getElementById('guess-input').value = '';
    });
}

function checkGuess(guess, word, guessedLetters, attemptsDisplay, wordDisplay) {
    if (guessedLetters.includes(guess) || guess.length !== 1) {
        alert('Invalid guess. Try again.');
        return;
    }

    guessedLetters.push(guess);

    if (!word.includes(guess)) {
        attemptsLeft--;
    }

    updateDisplay(word, guessedLetters, attemptsLeft);

    if (attemptsLeft === 0) {
        alert(`Game over! The word was: ${word}`);
        resetGame();
    } else if (word.split('').every(letter => guessedLetters.includes(letter))) {
        alert('Congratulations! You guessed the word!');
        resetGame();
    }
}

function updateDisplay(word, guessedLetters, attemptsLeft) {
    const wordDisplay = document.getElementById('word-display');
    const attemptsDisplay = document.getElementById('attempts-left');

    wordDisplay.innerHTML = word.split('').map(letter => (guessedLetters.includes(letter) ? letter : '_')).join(' ');
    attemptsDisplay.innerHTML = `Attempts left: ${attemptsLeft}`;
}

function resetGame() {
    // Logic to reset the game can be added here
}

document.addEventListener('DOMContentLoaded', startGame);