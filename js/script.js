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
    'assets/img/card1.png', 'assets/img/card2.png', 'assets/img/card3.png', 
    'assets/img/card4.png', 'assets/img/card5.png', 'assets/img/card6.png',
    'assets/img/card7.png', 'assets/img/card8.png', 'assets/img/card9.png', 
    'assets/img/card10.png', 'assets/img/card11.png', 'assets/img/card12.png'
];

function initializeGame() {
    cardArray = [];
    matchesFound = 0;
    moves = 0;
    movesCountElement.textContent = moves;
    memoryGame.innerHTML = '';
    for (let i = 0; i < numPairs; i++) {
        cardArray.push({ id: i, image: cardImages[i] });
        cardArray.push({ id: i, image: cardImages[i] });
    }

    shuffleCards(cardArray);
    cardArray.forEach(card => {
        const memoryGame = document.createElement('div');
        memoryCard.classList.add('memory-card');
        memoryCard.dataset.id = card.id;
        const frontFace = document.createElement('img');
        frontFace.classList.add('front-face');
        frontFace.src = card.image;
        frontFace.alt = 'Card Front';
        const backFace = document.createElement('img');
        backFace.classList.add('back-face');
        backFace.src = '.assets/img/back_card.png';
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