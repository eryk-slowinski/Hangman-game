const manParts = document.querySelectorAll('.man');
const wordElement = document.querySelector('.word');
const wrap = document.querySelector('.wrap');
const popup = document.querySelector('.popup');
const wrongLettersElement = document.querySelector('.wrong-letters span');
const playButton = document.querySelector('.play');
const notification = document.querySelector('.notification');
const message = document.querySelector('.final-message');

const selectedWord = 'witcher';
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

function checkWin() {
    const innerWord = wordElement.innerText.replace(/\n/g, '');
    if (innerWord === selectedWord) {
        popup.style.display = 'block';
        wrap.style.filter = 'blur(10px)';
        message.textContent = 'You have win :)'
    }
}

function updateData(e) {
    const lowerLetter = e.key.toLocaleLowerCase();
    // splitting a word to an array so it is possible now to loop over each letter
    const lettersArr = selectedWord.split('');
    lettersArr.forEach(letter => {
        if (lowerLetter === letter) {
            if (!correctLetters.includes(lowerLetter)) correctLetters.push(lowerLetter);
            else {
                notification.style.transform = 'translate(0)';
                setTimeout(() => {
                    notification.style.transform = 'translateY(100%)';
                }, 1000);
            }
        } else if (lowerLetter !== letter) {
            if (!wrongLetters.includes(lowerLetter) && (!selectedWord.includes(lowerLetter))) wrongLetters.push(lowerLetter);
            wrongLettersElement.textContent = wrongLetters;
        }
    })
}

window.addEventListener('keyup', e => {
    // keycodes between 65-90 are only letters
    if (e.keyCode >= 65 && e.keyCode <= 90) {
        updateData(e);
        displayWord();
    }
});


displayWord();