const memoryGame = document.getElementById('memory-game');
const movesCountElement = document.getElementById('moves-count');
const restartButton = document.getElementById('restart-button');

let cardArray = [];
const numPairs = 12;

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchesFound = 0;
let moves = 0;

const cardImages = [
    './img/img/1bouguereu.png', './assets/img/2diogines.png', './assets/img/3van.png', 
    './assets/img/4japao.png', './assets/img/5tarot.png', './assets/img/-6carmen.png',
    './assets/img/7Bouguereu.png', './assets/img/8waterhouse.png', './assets/img/9gogh.png', 
    './assets/img/10nippon.png', './assets/img/11castelli.png', './assets/img/-12winterhalter.png',
];

function initializeGame() {
    cardArray = [];
    matchesFound = 0;
    moves = 0;
    movesCountElement.textContent = moves;
    memoryGame.innerHTML = '';

    for
    (let i = 0; i < numPairs; i++) {
        cardArray.push({ id: i, image: cardImages[i] });
        cardArray.push({ id: i, image: cardImages[i] });
    }
    shuffleCards(cardArray);

    cardArray.forEach(card => {
        const memoryGame = document.createElement('div');
        memorycard.classList.add('memory-card');
        memorycard.dataset.id = card.id;

        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = card.image;
        frontFace.alt = 'card front';

        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = './assets/img/card-back.jpg';
        backFace.alt = 'card Back';

        memoryCard.appendChild(frontFace);
        memorycard.appendChild(backFace);

        memoryCard.classList.remove('flip', 'match');

        memoryCard.addEventListener('click', flipCard);

        memoryGame.appendChild(memoryCard);
    });
}
function shuffleCards(array) {

    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
        }   
    }

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        moves++;
        movesCountElement.textContent = moves;

        checkForMatch();
     
    }
    function checkForMatch() {

        let isMatch = firstCard.dataset.id === secondCard.dataset.id;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }
    }
    function disableCards() {

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        firstCard.classList.add('match');
        secondCard.classList.add('match');

            matchesFound++;

            if (matchesFound === numPairs) {
                
                setTimeout(() => {
                    alert ('Parabéns! Você encontrou todos os pares em ${moves} movimentos!');
                }, 500);
            }
            resetBoard();
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() =>{
                firstCard.classList.remove('flip');
                secondCard.classList.remove('flip');
                resetBoard();
            }, 1000);
        }
        function resetBoard() {
            [hasFlippedCard, lockBoard] = [false, false];
            [firstCard, secondCard] = [null, null];
        }

        restartButton.addEventListener('click', initializeGame);
        initializeGame();