let letters = document.querySelectorAll(".letterButton"),
    lettersHTML = document.querySelector(".letters");
(guessLetters = document.querySelector(".guess")), // Make Span
    (wordFrom = document.querySelector(".wordfrom")),
    (draw = document.querySelector(".draw .content")),
    (lettersSpan = document.querySelectorAll(".letters span"));

// Object Of Words + Categories
const words = {
    programming: [
        "php",
        "javascript",
        "go",
        "scala",
        "fortran",
        "r",
        "mysql",
        "python",
    ],
    movies: [
        "Prestige",
        "Inception",
        "Parasite",
        "Interstellar",
        "Whiplash",
        "Memento",
        "Coco",
        "Up",
    ],
    people: [
        "Albert Einstein",
        "Hitchcock",
        "Alexander",
        "Cleopatra",
        "Mahatma Ghandi",
    ],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// Array of Words
let arrayofWords = Object.keys(words);

// Choose Random Number of Words
let chooseWord = Math.floor(Math.random() * arrayofWords.length);

// Word At Random Number
let wordFromText = arrayofWords[chooseWord];

// Put The Choosen Word in wordFrom span
wordFrom.innerText = `${wordFromText}`;

// The Array of Choosen Word
let arrayofChoosenWord = words[wordFromText];

// Choose Random Number of Choosen Word
let selectedNumber = Math.floor(Math.random() * arrayofChoosenWord.length);

// The Guessed Word
let guessedWord = arrayofChoosenWord[selectedNumber];

// Captalize Word
guessedWord = guessedWord.toUpperCase();

for (let i = 0; i < guessedWord.length; i++) {
    // span of Guessed Characters from Word
    let sp = document.createElement("span");

    if (guessedWord[i].innerText == " ") {
        sp.classList.add("with-space");
    }
    // Append Span To Guess
    guessLetters.appendChild(sp);
}

var classArray = [
    "base",
    "stand",
    "gallows",
    "rope",
    "head",
    "body",
    "hands",
    "legs",
];

let numberOfFaults = 0;

function drawFault() {
    let drawDiv = document.createElement("div");

    drawDiv.classList.add(classArray[numberOfFaults]);

    draw.appendChild(drawDiv);

    numberOfFaults++;

    if (numberOfFaults == classArray.length) {
        lettersHTML.classList.add("finished");

        // Creat Popup Element
        let div = document.createElement("div");

        let divText = document.createTextNode(
            `Game Over, The Word Is ${guessedWord}`,
        );

        div.appendChild(divText);

        div.classList.add("popup");

        document.body.appendChild(div);
    }
}

function getLevel() {
    if (numberOfFaults <= 2) {
        return "Expert";
    } else if (2 < numberOfFaults <= 4) {
        return "Professional";
    } else if (4 < numberOfFaults <= 6) {
        return "Medium";
    } else {
        return "Begginer";
    }
}

function endGame() {
    let y = Array.from(document.querySelectorAll(".guess span"));

    if (document.body.contains(document.querySelector(".guess span"))) {
        let u = y.filter((block) => block.innerText == "");
        if (u.length == 0) {
            lettersHTML.classList.add("finished");

            // Creat Popup Element
            let div = document.createElement("div");

            let level = getLevel();

            let divText = document.createTextNode(
                `Good Job, The Wrong Attempts: ${numberOfFaults} Your Level: ${level}`,
            );

            div.appendChild(divText);

            // div.innerHTML += `<br> Your Level: ${level}`;

            div.classList.add("popup");

            document.body.appendChild(div);
        }
    }
}

lettersSpan.forEach((element) => {
    element.addEventListener("click", (e) => {
        let z = guessedWord.indexOf(`${e.target.innerText}`);

        if (z == -1) {
            drawFault();
        } else {
            for (let j = 0; j < guessedWord.length; j++) {
                if (e.target.innerText == guessedWord[j]) {
                    // Check For Character Repeated More Than One
                    document.querySelector(
                        `.guess span:nth-of-type(${j + 1}`,
                    ).innerText = e.target.innerText;
                }
            }
            endGame();
        }
        e.target.classList.add("clicked");
    });
});
