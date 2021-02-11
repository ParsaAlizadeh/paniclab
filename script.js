var main = document.querySelector("#main");
var cards = document.querySelectorAll("#main > .card");
var logbox = document.querySelector("#status");

var answer = {
    amib: 0,
    start: 0,
    dir: +1,
    final: NaN,
    found: false
};

function shuffleCards() {
    for (var i = cards.length; i >= 1; i--) {
        var ind = Math.random() * i | 0;
        main.appendChild(cards[ind]);
    }
    cards = document.querySelectorAll("#main > .card");
}

function positionInCircle(r = 360) {
    for (var i = 0; i < cards.length; i++) {
        var ang = 2 * Math.PI * i / cards.length;
        cards[i].style.left = main.clientWidth / 2 + r * Math.cos(ang) - cards[i].clientWidth / 2 + 'px';
        cards[i].style.top = main.clientHeight / 2 + r * Math.sin(ang) - cards[i].clientHeight / 2 + 'px';
    }
}

function hasclass(elem, cls) {
    return elem.classList.contains(cls);
}

function findAmib(start, amib, dir) {
    dir = (dir + cards.length) % cards.length;
    var ignore = 0, upgrades = 0;
    for (var now = start; ; now = (now + dir) % cards.length) {
        if (hasclass(cards[now], "vent"))
            ignore ^= 1;
        if (ignore || hasclass(cards[now], "lab"))
            continue;
        if (hasclass(cards[now], "mutation")) {
            if (upgrades++ === 3) 
                return now;
            amib ^= parseInt(cards[now].dataset.index);
        }
        if (hasclass(cards[now], "amib") && amib === parseInt(cards[now].dataset.index))
            return now;
    }
}

function indexOf(seq, elem) {
    return Array.prototype.indexOf.call(seq, elem);
}

function resetGame() {
    answer.amib = Math.random() * 8 | 0;
    answer.dir = (Math.random() > 0.5 ? +1 : -1);
    var color = Math.random() * 3 | 0;
    answer.start = indexOf(cards, document.querySelector(`#main > .lab[data-index="${color}"]`));
    answer.final = findAmib(answer.start, answer.amib, answer.dir);
    answer.found = false;

    document.querySelector("#status .card").dataset.index = answer.amib;

    var dirElem = document.querySelector("#direction");
    dirElem.style.backgroundColor = ["#276f71", "#d62b3b", "#e4e700"][color];
    dirElem.style.color = ["black", "white"][(answer.dir + 1) / 2]
    dirElem.innerHTML = ["⭯", "⭮"][(answer.dir + 1) / 2];

    main.classList.add("running");
    for (card of cards) {
        card.classList.remove("wrong");
        card.classList.remove("right");
    }
}

function processAnswer(elem) {
    if (hasclass(elem, "wrong") || answer.found)
        return;
    var ind = indexOf(cards, elem);
    if (ind === answer.final) {
        elem.classList.add("right");
        main.classList.remove("running");
        answer.found = true;
    }
    else {
        elem.classList.add("wrong");
    }
}   

window.onload = function() {
    shuffleCards();
    positionInCircle();
    resetGame();

    document.querySelectorAll(".amib, .mutation").forEach(elem => {
        elem.onclick = function() {
            return processAnswer(elem);
        };
    });

    document.querySelector("#newgame").onclick = function() {
        resetGame();
    };

    document.querySelector("#newshuffle").onclick = function() {
        shuffleCards();
        positionInCircle();
        resetGame();
    }
}