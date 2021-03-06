const manParts = document.querySelectorAll('.man');
const wordElement = document.querySelector('.word');
const wrap = document.querySelector('.wrap');
const popup = document.querySelector('.popup');
const wrongLettersElement = document.querySelector('.wrong-letters span');
const playButton = document.querySelector('.play');
const notification = document.querySelector('.notification');
const message = document.querySelector('.final-message');

let selectedWord;
const correctLetters = [];
const wrongLetters = [];
getRandomWord();

async function getRandomWord() {
    const response = await fetch('https://raw.githubusercontent.com/RazorSh4rk/random-word-api/master/words.json');
    const data = await response.json();
    selectedWord = data[Math.floor(Math.random() * data.length)];
    displayWord();
}

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
    checkWin();
}

function checkWin() {
    const hiddenMsg = document.querySelector('.hidden-message');
    const hiddenWord = document.querySelector('.hidden-word');
    const innerWord = wordElement.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        popup.style.display = 'block';
        wrap.style.filter = 'blur(10px)';
        message.textContent = 'You have win :)';
        hiddenMsg.textContent = '';
        hiddenWord.textContent = '';
    } else if (wrongLetters.length >= 6) {
        popup.style.display = 'block';
        wrap.style.filter = 'blur(10px)';
        message.textContent = 'You have lost...';
        hiddenMsg.textContent = 'The word was:';
        hiddenWord.textContent = `${selectedWord}`;
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
    getRandomWord();
}

window.addEventListener('keyup', e => {
    // keycodes between 65-90 are only letters
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        updateData(e);
        displayWord();
    }
});
playButton.addEventListener('click', playAgain);