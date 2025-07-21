let btnDraw = document.querySelector('#btnDraw');
let btnSort = document.querySelector('#btnSort');

let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
let suits = ['♦', '♥', '♠', '♣'];

let orderCards = [];

// Función para mostrar A, J, Q, K
function changeValue(value) {
    switch (value) {
        case 1: return 'A';
        case 11: return 'J';
        case 12: return 'Q';
        case 13: return 'K';
        default: return value;
    }
}

// Función que genera una carta HTML
function renderCard(number, suit) {
    const card = document.createElement('div');
    card.classList.add('card');

    const topSuit = document.createElement('div');
    topSuit.classList.add('topSuit');
    topSuit.innerHTML = suit;

    const middleNumber = document.createElement('div');
    middleNumber.classList.add('middleNumber');
    middleNumber.innerHTML = changeValue(number);

    const bottonSuit = document.createElement('div');
    bottonSuit.classList.add('bottonSuit');
    bottonSuit.innerHTML = suit;

    const color = (suit === '♥' || suit === '♦') ? 'red' : 'black';
    topSuit.style.color = middleNumber.style.color = bottonSuit.style.color = color;

    card.appendChild(topSuit);
    card.appendChild(middleNumber);
    card.appendChild(bottonSuit);

    return card;
}

// Botón Draw
btnDraw.addEventListener('click', () => {
    const cardDeck = document.getElementById('cardDeck');
    cardDeck.innerHTML = "";
    orderCards = [];

    let input = document.getElementById('amountOfCards');
    let amountOfCards = parseInt(input.value);

    for (let i = 0; i < amountOfCards; i++) {
        let number = numbers[Math.floor(Math.random() * numbers.length)];
        let suit = suits[Math.floor(Math.random() * suits.length)];

        orderCards.push({ number, suit });
        const cardElement = renderCard(number, suit);
        cardDeck.appendChild(cardElement);
    }

    document.getElementById('sortDeck').innerHTML = "";
});

// Botón Sort con bubble sort y log visual
btnSort.addEventListener('click', () => {
    const sortDeck = document.getElementById("sortDeck");
    sortDeck.innerHTML = "";

    for (let j = orderCards.length - 1; j > 0; j--) {
        for (let k = 0; k < j; k++) {
            if (orderCards[k].number > orderCards[k + 1].number) {
                let temp = orderCards[k];
                orderCards[k] = orderCards[k + 1];
                orderCards[k + 1] = temp;

                const stepLine = document.createElement('div');
                stepLine.classList.add('lines');
                stepLine.innerHTML = `Paso ${sortDeck.childElementCount + 1}:`;

                orderCards.forEach(cardData => {
                    const card = renderCard(cardData.number, cardData.suit);
                    card.classList.remove('card');
                    card.classList.add('newCard');
                    stepLine.appendChild(card);
                });

                sortDeck.appendChild(stepLine);
            }
        }
    }
});
