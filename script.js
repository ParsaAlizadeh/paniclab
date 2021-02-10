var main = document.querySelector("#main");

var seed = 8563;

function rand(){
    var result = (seed * seed).toString().slice(1, 3); // extracting the middle value.
    seed = parseInt(result) * 12;
    return seed % 100 / 100;
}

function shuffleCards() {
    var cards = document.querySelectorAll(".card");
    for (var i = cards.length; i >= 0; i--) {
        main.appendChild(cards[rand() * i | 0]);
    }
}

function positionInCircle(r = 350) {
    var cards = document.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
        var ang = 2 * Math.PI * i / cards.length;
        cards[i].style.left = main.clientWidth / 2 + r * Math.cos(ang) - cards[i].clientWidth / 2 + 'px';
        cards[i].style.top = main.clientHeight / 2 + r * Math.sin(ang) - cards[i].clientHeight / 2 + 'px';
    }
}

window.onload = function() {
    shuffleCards();
    positionInCircle();
}