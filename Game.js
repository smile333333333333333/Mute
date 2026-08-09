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

    round: 1,

    initialized: false

};


// ==========================================
// GAME INITIALIZATION
// ==========================================

function initializeGame() {

    if (
        game.initialized
    ) {

        return;

    }


    game.initialized =
        true;


    game.running =
        true;


    console.log(
        "PROJECT: REPLACEMENT"
    );


    console.log(
        "GAME INITIALIZED"
    );


    // Initialize body system.

    if (
        typeof BodySystem !==
        "undefined"
    ) {

        BodySystem.initialize();

    }


    // Start story.

    if (
        typeof Story !==
        "undefined"
    ) {

        Story.start();

    }


    // Start first round.

    if (
        typeof startGameRound ===
        "function"
    ) {

        startGameRound(1);

    }


    // Begin game loop.

    requestAnimationFrame(
        gameLoop
    );

}


// ==========================================
// GAME LOOP
// ==========================================

function gameLoop() {

    if (
        !game.running
    ) {

        return;

    }


    updateGame();


    requestAnimationFrame(
        gameLoop
    );

}


// ==========================================
// UPDATE GAME
// ==========================================

function updateGame() {

    // Player

    if (
        typeof Player !==
        "undefined"
    ) {

        Player.move();

        updatePlayerVisual();

    }


    // Enemies

    if (
        typeof updateEnemies ===
        "function"
    ) {

        updateEnemies();

    }


    // Rounds

    if (
        typeof updateRoundSystem ===
        "function"
    ) {

        updateRoundSystem();

    }


    // Story

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

    if (!playerElement) {

        return;

    }


    playerElement.style.left =
        Player.x + "%";


    playerElement.style.top =
        Player.y + "%";

}


// ==========================================
// START GAME
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        initializeGame();

    }
);
