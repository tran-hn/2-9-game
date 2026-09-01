const ROWS = 3;
const COLS = 4;
const TOTAL = 12;

let pieces = [];
let selectedPiece = null;

function createPuzzle() {

    const container = document.getElementById("puzzle");
    container.innerHTML = "";

    selectedPiece = null;

    pieces = [];

    for (let i = 0; i < TOTAL; i++) {
        pieces.push(i);
    }

    shuffle(pieces);

    renderPuzzle();
}


function renderPuzzle() {

    const container = document.getElementById("puzzle");
    const data = puzzles[currentPuzzle];

    container.innerHTML = "";

    for (let position = 0; position < TOTAL; position++) {

        const originalPiece = pieces[position];

        const piece = document.createElement("div");

        piece.className = "piece";

        const row = Math.floor(originalPiece / COLS);
        const col = originalPiece % COLS;

        piece.style.backgroundImage =
            `url("${data.image}")`;

        piece.style.backgroundSize =
            `${COLS * 100}% ${ROWS * 100}%`;

        const x = (col / (COLS - 1)) * 100;
        const y = (row / (ROWS - 1)) * 100;

        piece.style.backgroundPosition =
            `${x}% ${y}%`;

        piece.onclick = () => selectPiece(piece);

        container.appendChild(piece);
    }

    updateCorrect();
}


function selectPiece(piece) {

    if (selectedPiece === null) {

        selectedPiece = piece;
        piece.classList.add("selected");

        return;
    }

    if (selectedPiece === piece) {

        piece.classList.remove("selected");
        selectedPiece = null;

        return;
    }

    swapPieces(selectedPiece, piece);
}


function swapPieces(a, b) {

    const container = document.getElementById("puzzle");

    const aIndex =
        Array.from(container.children).indexOf(a);

    const bIndex =
        Array.from(container.children).indexOf(b);


    // Đổi vị trí hai mảnh
    [pieces[aIndex], pieces[bIndex]] =
        [pieces[bIndex], pieces[aIndex]];


    // Phát tiếng giấy
    const paperSound =
        document.getElementById("paperSound");

    paperSound.currentTime = 0;
    paperSound.play().catch(() => {});


    selectedPiece = null;

    renderPuzzle();
}


function updateCorrect() {

    let correct = 0;

    for (let i = 0; i < TOTAL; i++) {

        if (pieces[i] === i) {
            correct++;
        }
    }

    document.getElementById("correct").textContent = correct;

    if (correct === TOTAL) {

        setTimeout(() => {
            showInfo();
        }, 500);
    }
}


function shuffle(array) {

    for (let i = array.length - 1; i > 0; i--) {

        const j =
            Math.floor(Math.random() * (i + 1));

        [array[i], array[j]] =
            [array[j], array[i]];
    }
}