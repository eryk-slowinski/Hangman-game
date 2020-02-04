const manParts = document.querySelectorAll('.man');
const wordElement = document.querySelector('.word');
const wrap = document.querySelector('.wrap');
const popup = document.querySelector('.popup');
const wrongLettersElement = document.querySelector('.wrong-letters span');
const playButton = document.querySelector('.play');
const notification = document.querySelector('.notification');
const message = document.querySelector('.final-message');

const randomWords = ['witcher', 'transform', 'javascript', 'hangman'];

let selectedWord = randomWords[Math.floor(Math.random() * randomWords.length)];
const correctLetters = [];
const wrongLetters = [];

function displayWord() {
    // splitting a word to an array of letters
    wordElement.innerHTML = `${selectedWord.split('')
    // mapping through array of letters and comparing it with letters inserted by user, returning letter if it fits
    .map(letter => `<span class="letter">${correctLetters.includes(letter) ? letter : ''}</span>`)
    // turning array for a word again
    .join('')}`;
    checkWin();
}

function hangMan() {
    const numberOfMistakes = wrongLetters.length - 1;
    manParts[numberOfMistakes].style.display = 'block';
    if (wrongLetters.length >= 6) loss();
}

function loss() {
    popup.style.display = 'block';
    wrap.style.filter = 'blur(10px)';
    message.textContent = 'You have lost...';
}

function checkWin() {
    const innerWord = wordElement.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        popup.style.display = 'block';
        wrap.style.filter = 'blur(10px)';
        message.textContent = 'You have win :)';
    }
}

function updateData(e) {
    const lowerLetter = e.key.toLocaleLowerCase();
    if (selectedWord.includes(lowerLetter)) {
        if (!correctLetters.includes(lowerLetter)) {
            correctLetters.push(lowerLetter);
            displayWord();
        } else showNotification();
    } else {
        if (!wrongLetters.includes(lowerLetter)) {
            wrongLetters.push(lowerLetter);
            wrongLettersElement.textContent = wrongLetters;
            hangMan()
        } else showNotification();
    }
}

function showNotification() {
    notification.style.transform = 'translate(0)';
    setTimeout(() => {
        notification.style.transform = 'translateY(100%)';
    }, 1000);
}

function playAgain() {
    popup.style.display = 'none';
    wrap.style.filter = '';
    correctLetters.splice(0, correctLetters.length);
    wrongLetters.splice(0, wrongLetters.length);
    wrongLettersElement.textContent = wrongLetters;
    displayWord();
    manParts.forEach(part => part.style.display = 'none');
}

window.addEventListener('keyup', e => {
    // keycodes between 65-90 are only letters
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        updateData(e);
        displayWord();
    }
});
playButton.addEventListener('click', playAgain);

displayWord();