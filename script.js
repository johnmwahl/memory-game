document.addEventListener('DOMContentLoaded', () => {
    const cardArray = [
{ name: 'noah', img: 'images/noah.png' },
        { name: 'noah', img: 'images/noah.png' },
        { name: 'commandments', img: 'images/commandments.png' },
        { name: 'commandments', img: 'images/commandments.png' },
        { name: 'moseswater', img: 'images/moseswater.png' },
        { name: 'moseswater', img: 'images/moseswater.png' },
        { name: 'jesuscross', img: 'images/jesuscross.png' },
        { name: 'jesuscross', img: 'images/jesuscross.png' },
        { name: 'jesuswater', img: 'images/jesuswater.png' },
        { name: 'jesuswater', img: 'images/jesuswater.png' },
        { name: 'jesusbaby', img: 'images/jesusbaby.png' },
        { name: 'jesusbaby', img: 'images/jesusbaby.png' }    ];

    const grid = document.querySelector('.grid');
    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let tryCount = 0;

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        for (let i = 0; i < cardArray.length; i++) {
            let card = document.createElement('div');
            card.classList.add('card');

            let cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            let cardFront = document.createElement('div');
            cardFront.classList.add('card-front');

            let cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.style.backgroundImage = `url(${cardArray[i].img})`;

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            card.appendChild(cardInner);

            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }

        var backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = 0.02; // Set volume to 2%
        backgroundMusic.play();
    }

     function flipCard() {
        if (cardsChosen.length < 2) {
            let cardId = this.getAttribute('data-id');
            let cardToFlip = this.querySelector('.card-inner');

            if (!cardsChosenId.includes(cardId)) {
                cardsChosen.push(cardArray[cardId].name);
                cardsChosenId.push(cardId);
                cardToFlip.style.transform = 'rotateY(180deg)';
                playSound('cardFlipSound');

                if (cardsChosen.length === 2) {
                    setTimeout(checkForMatch, 500);
                    tryCount++;
                    document.getElementById('tries').innerText = tryCount;
            }
        }
    }
}
    function checkForMatch() {
        let cards = document.querySelectorAll('.card-inner');
        const optionOneId = cardsChosenId[0];
        const optionTwoId = cardsChosenId[1];

        if (optionOneId === optionTwoId) {
            cards[optionOneId].style.transform = 'rotateY(0deg)';
            cards[optionTwoId].style.transform = 'rotateY(0deg)';
        } else if (cardsChosen[0] === cardsChosen[1]) {
            playSound('matchSound');
            cardsWon.push(cardsChosen);
        } else {
            setTimeout(() => {
                cards[optionOneId].style.transform = 'rotateY(0deg)';
                cards[optionTwoId].style.transform = 'rotateY(0deg)';
                playSound('noMatchSound');
            }, 500);
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
            setTimeout(resetGame, 1000);
        }
    }

     function resetGame() {
        cardsWon = [];
        tryCount = 0;
        document.getElementById('tries').innerText = tryCount;
        createBoard(); // Recreate the board for a new game
    }

    function playSound(soundId) {
        const sound = document.getElementById(soundId);
        if (sound) {
            sound.play();
        }
    }

    document.getElementById('toggleMusic').addEventListener('click', function() {
        var backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = 0.02; // Set volume to 2%
        if (backgroundMusic.paused) {
            backgroundMusic.play();
        } else {
            backgroundMusic.pause();
        }
    });
    
    document.getElementById('restartGame').addEventListener('click', resetGame);
    document.getElementById('letsPlayButton').addEventListener('click', function() {
         this.style.display = 'none'; // Hide the button
        document.getElementById('overlay').style.display = 'none'; // Hide the overlay
        document.querySelector('.grid').style.pointerEvents = 'auto'; // Enable interactions
        startGame();
    });

    function startGame() {
        createBoard();
        var backgroundMusic = document.getElementById('backgroundMusic');
        backgroundMusic.volume = 0.02; // Set volume to 2%
        backgroundMusic.play();
    }


    createBoard();
});
