// ==========================================
// PROJECT: REPLACEMENT
// GAME.JS
// MAIN GAME CONTROLLER
// ==========================================


// ==========================================
// DOM REFERENCES
// ==========================================

const gameElement =
    document.getElementById("game");

const roomElement =
    document.getElementById("room");

const playerElement =
    document.getElementById("player");

const healthFill =
    document.getElementById("health-fill");

const bodyButton =
    document.getElementById("body-button");

const bodyMenu =
    document.getElementById("body-menu");

const closeBodyButton =
    document.getElementById("close-body");

const mutationMenu =
    document.getElementById("mutation-menu");

const mutationButtons =
    document.querySelectorAll(
        ".mutation-option"
    );

const selectedPartText =
    document.getElementById(
        "selected-part"
    );

const mutationNameText =
    document.getElementById(
        "mutation-name"
    );

const mutationDescriptionText =
    document.getElementById(
        "mutation-description"
    );

const roundNumberElement =
    document.getElementById(
        "round-number"
    );


// ==========================================
// KEYBOARD
// ==========================================

const keys = {};


document.addEventListener(
    "keydown",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = true;

    }
);


document.addEventListener(
    "keyup",
    function(event) {

        keys[
            event.key.toLowerCase()
        ] = false;

    }
);


// ==========================================
// GAME STATE
// ==========================================

const game = {

    running: false,

    round: 0,

    initialized: false

};


// ==========================================
// INITIALIZE GAME
// ==========================================

function initializeGame() {

    if (
        game.initialized
    ) {

        return;

    }


    game.initialized =
        true;


    console.log(
        "PROJECT: REPLACEMENT"
    );


    console.log(
        "GAME READY"
    );


    // --------------------------------------
    // BODY SYSTEM
    // --------------------------------------

    if (
        typeof BodySystem !==
        "undefined"
    ) {

        BodySystem.initialize();

    }


    // --------------------------------------
    // STORY
    // --------------------------------------

    if (
        typeof Story !==
        "undefined"
    ) {

        Story.start();

    }


    // --------------------------------------
    // INITIAL PLAYER POSITION
    // --------------------------------------

    if (
        typeof Player !==
        "undefined"
    ) {

        Player.x = 50;

        Player.y = 50;

        Player.health =
            Player.maxHealth;

    }


    if (
        typeof updatePlayerVisual ===
        "function"
    ) {

        updatePlayerVisual();

    }


    if (
        typeof updatePlayerHealth ===
        "function"
    ) {

        updatePlayerHealth();

    }


    // --------------------------------------
    // GAME LOOP
    // --------------------------------------

    requestAnimationFrame(
        gameLoop
    );

}


// ==========================================
// ACTUALLY START GAME
// ==========================================

function beginGame() {

    if (
        game.running
    ) {

        return;

    }


    console.log(
        "GAME STARTED"
    );


    game.running =
        true;


    // Start round one.

    if (
        typeof startGameRound ===
        "function"
    ) {

        startGameRound(1);

    }

}


// ==========================================
// GAME LOOP
// ==========================================

function gameLoop() {

    if (
        game.running
    ) {

        updateGame();

    }


    requestAnimationFrame(
        gameLoop
    );

}


// ==========================================
// UPDATE GAME
// ==========================================

function updateGame() {

    // --------------------------------------
    // PLAYER
    // --------------------------------------

    if (
        typeof Player !==
        "undefined"
    ) {

        Player.move();

        updatePlayerVisual();

    }


    // --------------------------------------
    // ENEMIES
    // --------------------------------------

    if (
        typeof updateEnemies ===
        "function"
    ) {

        updateEnemies();

    }


    // --------------------------------------
    // ROUND SYSTEM
    // --------------------------------------

    if (
        typeof updateRoundSystem ===
        "function"
    ) {

        updateRoundSystem();

    }


    // --------------------------------------
    // STORY
    // --------------------------------------

    if (
        typeof Story !==
        "undefined" &&
        typeof Story.update ===
        "function"
    ) {

        Story.update();

    }

}


// ==========================================
// PLAYER VISUAL
// ==========================================

function updatePlayerVisual() {

    if (
        !playerElement ||
        typeof Player ===
        "undefined"
    ) {

        return;

    }


    playerElement.style.left =
        Player.x + "%";


    playerElement.style.top =
        Player.y + "%";

}


// ==========================================
// START BUTTON
// ==========================================

function setupStartButton() {

    const startButton =
        document.getElementById(
            "start-button"
        );


    if (!startButton) {

        console.warn(
            "No start button found."
        );

        return;

    }


    startButton.addEventListener(
        "click",
        function() {

            if (
                typeof AudioSystem !==
                "undefined"
            ) {

                AudioSystem.start();

            }


            const titleScreen =
                document.getElementById(
                    "title-screen"
                );


            if (
                titleScreen
            ) {

                titleScreen.classList.add(
                    "hidden"
                );

            }


            beginGame();

        }
    );

}


// ==========================================
// DOM READY
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeGame();

        setupStartButton();

    }
);
