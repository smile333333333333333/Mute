// ==========================================
// PROJECT: REPLACEMENT
// GAME.JS
// ==========================================


// ==========================================
// GAME STATE
// ==========================================

const game = {
    round: 1,

    player: {
        x: 50,
        y: 50,
        speed: 3,
        health: 100,
        maxHealth: 100
    },

    selectedBodyPart: null,

    mutations: {
        head: null,
        torso: null,
        leftArm: null,
        rightArm: null,
        leftLeg: null,
        rightLeg: null
    }
};


// ==========================================
// GET GAME ELEMENTS
// ==========================================

const playerElement = document.getElementById("player");

const bodyButton = document.getElementById("body-button");
const bodyMenu = document.getElementById("body-menu");
const closeBodyButton = document.getElementById("close-body");

const selectedPartText = document.getElementById("selected-part");
const mutationNameText = document.getElementById("mutation-name");
const mutationDescriptionText =
    document.getElementById("mutation-description");

const roundNumber = document.getElementById("round-number");

const healthFill = document.getElementById("health-fill");

const mutationMenu = document.getElementById("mutation-menu");

const mutationButtons =
    document.querySelectorAll(".mutation-option");


// ==========================================
// PLAYER MOVEMENT
// ==========================================

const keys = {};

document.addEventListener("keydown", function(event) {

    keys[event.key.toLowerCase()] = true;

});

document.addEventListener("keyup", function(event) {

    keys[event.key.toLowerCase()] = false;

});


function updatePlayerMovement() {

    let moveX = 0;
    let moveY = 0;


    // WASD

    if (keys["w"]) {
        moveY -= 1;
    }

    if (keys["s"]) {
        moveY += 1;
    }

    if (keys["a"]) {
        moveX -= 1;
    }

    if (keys["d"]) {
        moveX += 1;
    }


    // Arrow keys

    if (keys["arrowup"]) {
        moveY -= 1;
    }

    if (keys["arrowdown"]) {
        moveY += 1;
    }

    if (keys["arrowleft"]) {
        moveX -= 1;
    }

    if (keys["arrowright"]) {
        moveX += 1;
    }


    // Prevent diagonal movement from being faster

    if (moveX !== 0 && moveY !== 0) {

        moveX *= 0.707;

        moveY *= 0.707;

    }


    game.player.x += moveX * game.player.speed;
    game.player.y += moveY * game.player.speed;


    // Keep player inside the room

    game.player.x =
        Math.max(2, Math.min(98, game.player.x));

    game.player.y =
        Math.max(2, Math.min(90, game.player.y));


    updatePlayerVisual();

}


// ==========================================
// UPDATE PLAYER POSITION
// ==========================================

function updatePlayerVisual() {

    playerElement.style.left =
        game.player.x + "%";

    playerElement.style.top =
        game.player.y + "%";

}


// ==========================================
// BODY MENU
// ==========================================

bodyButton.addEventListener("click", function() {

    openBodyMenu();

});


closeBodyButton.addEventListener("click", function() {

    closeBodyMenu();

});


function openBodyMenu() {

    bodyMenu.classList.remove("hidden");

}


function closeBodyMenu() {

    bodyMenu.classList.add("hidden");

}


// ==========================================
// BODY PART SELECTION
// ==========================================

const bodyParts = {

    "body-head": {
        name: "HEAD",
        mutationSlot: "head"
    },

    "body-torso": {
        name: "TORSO",
        mutationSlot: "torso"
    },

    "body-left-arm": {
        name: "LEFT ARM",
        mutationSlot: "leftArm"
    },

    "body-right-arm": {
        name: "RIGHT ARM",
        mutationSlot: "rightArm"
    },

    "body-left-leg": {
        name: "LEFT LEG",
        mutationSlot: "leftLeg"
    },

    "body-right-leg": {
        name: "RIGHT LEG",
        mutationSlot: "rightLeg"
    }

};


Object.keys(bodyParts).forEach(function(id) {

    const element = document.getElementById(id);

    element.addEventListener("click", function() {

        selectBodyPart(id);

    });

});


function selectBodyPart(id) {

    const part = bodyParts[id];

    game.selectedBodyPart = part.mutationSlot;

    selectedPartText.textContent =
        part.name;


    const currentMutation =
        game.mutations[part.mutationSlot];


    if (currentMutation === null) {

        mutationNameText.textContent =
            "NORMAL";

        mutationDescriptionText.textContent =
            "No mutation is currently affecting this body part.";

    } else {

        mutationNameText.textContent =
            currentMutation.name;

        mutationDescriptionText.textContent =
            currentMutation.description;

    }

}


// ==========================================
// HEALTH
// ==========================================

function updateHealth() {

    const healthPercent =
        (game.player.health / game.player.maxHealth) * 100;

    healthFill.style.width =
        healthPercent + "%";

}


function damagePlayer(amount) {

    game.player.health -= amount;

    if (game.player.health < 0) {
        game.player.health = 0;
    }

    updateHealth();


    if (game.player.health <= 0) {

        playerDeath();

    }

}


function healPlayer(amount) {

    game.player.health += amount;

    if (game.player.health > game.player.maxHealth) {
        game.player.health =
            game.player.maxHealth;
    }

    updateHealth();

}


// ==========================================
// ROUND SYSTEM
// ==========================================

function startRound(number) {

    game.round = number;

    roundNumber.textContent =
        game.round;

    console.log(
        "ROUND " + game.round + " STARTED"
    );

}


function completeRound() {

    console.log(
        "ROUND " + game.round + " COMPLETE"
    );

    showMutationMenu();

}


// ==========================================
// MUTATION PLACEHOLDERS
// ==========================================

const testMutations = [

    {
        name: "BONE BLADE",

        bodyPart: "leftArm",

        description:
            "The arm has developed a hardened biological blade."
    },

    {
        name: "HEAD PLANT",

        bodyPart: "head",

        description:
            "A strange plant has begun growing from the head."
    },

    {
        name: "TONGUE TENDRIL",

        bodyPart: "head",

        description:
            "The tongue has developed unusual length and flexibility."
    },

    {
        name: "GUN HAND",

        bodyPart: "rightArm",

        description:
            "The hand has transformed into a biological firearm."
    },

    {
        name: "EXTRA EYE",

        bodyPart: "head",

        description:
            "A new eye has developed on the body."
    },

    {
        name: "FINGER CLAWS",

        bodyPart: "rightArm",

        description:
            "The fingers have developed sharp biological claws."
    }

];


// ==========================================
// RANDOM MUTATION SELECTION
// ==========================================

function getRandomMutations(amount) {

    const available =
        [...testMutations];

    const selected = [];


    while (
        selected.length < amount &&
        available.length > 0
    ) {

        const randomIndex =
            Math.floor(
                Math.random() * available.length
            );

        selected.push(
            available[randomIndex]
        );

        available.splice(
            randomIndex,
            1
        );

    }


    return selected;

}


// ==========================================
// MUTATION MENU
// ==========================================

function showMutationMenu() {

    const choices =
        getRandomMutations(3);


    mutationMenu.classList.remove("hidden");


    mutationButtons.forEach(
        function(button, index) {

            const mutation =
                choices[index];


            button.textContent =
                mutation.name;


            button.onclick = function() {

                chooseMutation(mutation);

            };

        }
    );

}


function chooseMutation(mutation) {

    const slot =
        mutation.bodyPart;


    // Put the mutation into the appropriate
    // body slot.

    if (slot === "leftArm") {

        game.mutations.leftArm =
            mutation;

    }

    else if (slot === "rightArm") {

        game.mutations.rightArm =
            mutation;

    }

    else if (slot === "head") {

        game.mutations.head =
            mutation;

    }


    mutationMenu.classList.add("hidden");


    console.log(
        "MUTATION ACQUIRED:",
        mutation.name
    );


    // Start the next round

    startRound(game.round + 1);

}


// ==========================================
// PLAYER DEATH
// ==========================================

function playerDeath() {

    console.log(
        "PLAYER DIED"
    );

    alert(
        "YOU DIED"
    );

    location.reload();

}


// ==========================================
// GAME LOOP
// ==========================================

function gameLoop() {

    updatePlayerMovement();

    requestAnimationFrame(
        gameLoop
    );

}


// ==========================================
// START GAME
// ==========================================

updatePlayerVisual();

updateHealth();

startRound(1);

gameLoop();
