const cardSymbols = ['🍎', '🍌', '🍇', '🍉', '🍒', '🍓', '🍑', '🍍'];
let cards = [...cardSymbols, ...cardSymbols]; // Duplicating the array for pairs
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function createCard(symbol) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
        <div class="card-inner">
            <div class="card-front">${symbol}</div>
            <div class="card-back"></div>
        </div>
    `;

    card.addEventListener('click', () => {
        if (lockBoard || card.classList.contains('flipped')) return;

        card.classList.add('flipped');

        if (!firstCard) {
            firstCard = card;
        } else if (!secondCard) {
            secondCard = card;
            checkForMatch();
        } else {
            // When a third card is clicked
            lockBoard = true;
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                if (firstCard.classList.contains('matched')) {
                    firstCard.classList.add('flipped');
                }
                if (secondCard.classList.contains('matched')) {
                    secondCard.classList.add('flipped');
                }
                firstCard = card;
                secondCard = null;
                lockBoard = false;
            }, 100);
        }
    });

    return card;
}

function checkForMatch() {
    const isMatch = firstCard.querySelector('.card-front').textContent ===
                    secondCard.querySelector('.card-front').textContent;

    if (isMatch) {
        score+=10;
        document.getElementById('score').textContent = `Score: ${score}`;
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        [firstCard, secondCard] = [null, null];
    }
}

function startGame() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.innerHTML = '';
    shuffle(cards);
    cards.forEach(symbol => {
        const card = createCard(symbol);
        gameBoard.appendChild(card);
    });
    score = 0;
    document.getElementById('score').textContent = `Score: ${score}`;
}

startGame();
