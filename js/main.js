let currentPuzzle = 0;


/* =========================
   SCREEN
========================= */


function showScreen(id) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    document
        .getElementById(id)
        .classList.add("active");

}


/* =========================
   START
========================= */


function startGame() {

    currentPuzzle = 0;

    showScreen("puzzleScreen");

    updatePuzzleHeader();

    createPuzzle();

}


/* =========================
   PUZZLE HEADER
========================= */


function updatePuzzleHeader() {

    const data =
        puzzles[currentPuzzle];


    document
        .getElementById("puzzleNumber")
        .textContent =
        data.number;


    document
        .getElementById("puzzleDate")
        .textContent =
        data.date;


    document
        .getElementById("puzzleTitle")
        .textContent =
        data.title;

}


/* =========================
   INFO
========================= */


function showInfo() {

    const data =
        puzzles[currentPuzzle];


    document
        .getElementById("infoNumber")
        .textContent =
        data.number;


    document
        .getElementById("infoDate")
        .textContent =
        data.date;


    document
        .getElementById("infoTitle")
        .textContent =
        data.title;


    document
        .getElementById("infoImage")
        .src =
        data.image;


    document
        .getElementById("infoText")
        .textContent =
        data.text;


    const sourceButton =
        document
            .getElementById("sourceButton");


    /*
        Nếu đã có link nguồn
        thì mở link.

        Nếu chưa có link
        thì tạm thời vô hiệu hóa.
    */

    if (data.source) {

        sourceButton.disabled = false;

        sourceButton.textContent =
            "NGUỒN ẢNH";

        sourceButton.onclick = () => {

            window.open(
                data.source,
                "_blank"
            );

        };

    } else {

        sourceButton.disabled = true;

        sourceButton.textContent =
            "CHƯA CÓ NGUỒN";

    }


    showScreen("infoScreen");

}


/* =========================
   NEXT
========================= */


function nextPuzzle() {

    currentPuzzle++;


    /*
        Hết 4 puzzle
        → summary
    */

    if (
        currentPuzzle >=
        puzzles.length
    ) {

        showSummary();

        return;

    }


    updatePuzzleHeader();

    showScreen("puzzleScreen");

    createPuzzle();

}


/* =========================
   SUMMARY
========================= */


function showSummary() {

    const container =
        document
            .getElementById("summaryImages");


    container.innerHTML = "";


    puzzles.forEach((data, index) => {

        const img =
            document.createElement("img");


        img.src =
            data.image;


        img.className =
            "summaryImage";


        img.style.animationDelay =
            `${index * 0.25}s`;


        container.appendChild(img);

    });


    showScreen("summaryScreen");

}


/* =========================
   NEWSPAPER
========================= */


function showNewspaper() {

    showScreen("newspaperScreen");


    const moreText =
        document
            .getElementById("moreText");


    moreText.style.opacity = "0";


    setTimeout(() => {

        moreText.style.transition =
            "opacity 2s";

        moreText.style.opacity = "1";

    }, 2500);


    /*
        Sau khi "CÒN NỮA..."
        hiện → fade out.
    */

    setTimeout(() => {

        document
            .getElementById("newspaperScreen")
            .classList.add("fadeOut");


    }, 5200);


    /*
        Sau fade → menu
    */

    setTimeout(() => {

        document
            .getElementById("newspaperScreen")
            .classList.remove("fadeOut");

        showScreen("endScreen");

    }, 6500);

}