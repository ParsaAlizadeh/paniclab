function shuffleCards() {
    var main = document.querySelector("main");
    for (var i = main.children.length; i >= 0; i--) {
        main.appendChild(main.children[Math.random() * i | 0]);
    }
}