// ==========================================
// PROJECT: REPLACEMENT
// ROUNDS.JS
// ==========================================


// ==========================================
// ROUND STATE
// ==========================================

const RoundSystem = {

    current: 0,

    active: false,

    enemiesSpawned: false,

    waitingForMutation: false,

    started: false

};


// ==========================================
// START FIRST ROUND
// ==========================================

function startGame() {

    if (
        RoundSystem.started
    ) {

        return;

    }


    RoundSystem.started =
        true;


    if (
        typeof game !== "undefined"
    ) {

        game.running =
            true;

    }


    startGameRound(1);

}


// ==========================================
// START ROUND
// ==========================================

function startGameRound(
    roundNumber
) {

    RoundSystem.current =
        roundNumber;

    RoundSystem.active =
        true;

    RoundSystem.enemiesSpawned =
        false;

    RoundSystem.waitingForMutation =
        false;


    if (
        typeof game !== "undefined"
    ) {

        game.round =
            roundNumber;

    }


    // --------------------------------------
    // RESET PLAYER
    // --------------------------------------

    if (
        roundNumber === 1
    ) {

        Player.health =
            Player.maxHealth;

    }


    if (
        typeof updatePlayerHealth ===
        "function"
    ) {

        updatePlayerHealth();

    }


    // --------------------------------------
    // UPDATE ROUND DISPLAY
    // --------------------------------------

    if (
        typeof roundNumberElement !==
        "undefined" &&
        roundNumberElement
    ) {

        roundNumberElement.textContent =
            roundNumber;

    }


    console.log(
        "=============================="
    );

    console.log(
        "ROUND " +
        roundNumber +
        " START"
    );

    console.log(
        "=============================="
    );


    // --------------------------------------
    // CLEAR OLD ENEMIES
    // --------------------------------------

    if (
        typeof enemies !==
        "undefined"
    ) {

        enemies.length = 0;

    }


    // --------------------------------------
    // SPAWN ENEMIES
    // --------------------------------------

    if (
        typeof spawnRoundEnemies ===
        "function"
    ) {

        spawnRoundEnemies(
            roundNumber
        );

        RoundSystem.enemiesSpawned =
            true;

    }

    else {

        console.error(
            "spawnRoundEnemies() is missing."
        );

        RoundSystem.enemiesSpawned =
            false;

    }


    // --------------------------------------
    // ROUND SOUND
    // --------------------------------------

    if (
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.roundStart();

    }

}


// ==========================================
// UPDATE ROUND
// ==========================================

function updateRoundSystem() {

    if (
        !RoundSystem.active
    ) {

        return;

    }


    if (
        RoundSystem.waitingForMutation
    ) {

        return;

    }


    if (
        typeof enemies ===
        "undefined"
    ) {

        return;

    }


    // Don't complete a round if
    // enemies haven't spawned yet.

    if (
        !RoundSystem.enemiesSpawned
    ) {

        return;

    }


    const livingEnemies =
        enemies.filter(
            enemy =>
                enemy.alive
        );


    if (
        livingEnemies.length > 0
    ) {

        return;

    }


    completeCurrentRound();

}


// ==========================================
// COMPLETE ROUND
// ==========================================

function completeCurrentRound() {

    if (
        RoundSystem.waitingForMutation
    ) {

        return;

    }


    RoundSystem.active =
        false;

    RoundSystem.waitingForMutation =
        true;


    console.log(
        "ROUND " +
        RoundSystem.current +
        " COMPLETE"
    );


    // --------------------------------------
    // HEAL
    // --------------------------------------

    Player.heal(
        15
    );


    // --------------------------------------
    // SOUND
    // --------------------------------------

    if (
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.roundComplete();

    }


    // --------------------------------------
    // MUTATION MENU
    // --------------------------------------

    openMutationSelection();

}


// ==========================================
// OPEN MUTATION SELECTION
// ==========================================

function openMutationSelection() {

    if (
        typeof mutationMenu ===
        "undefined" ||
        !mutationMenu
    ) {

        console.error(
            "Mutation menu not found."
        );

        return;

    }


    if (
        typeof getRandomMutationChoices !==
        "function"
    ) {

        console.error(
            "Mutation database not loaded."
        );

        return;

    }


    const choices =
        getRandomMutationChoices(3);


    mutationMenu.classList.remove(
        "hidden"
    );


    if (
        typeof mutationButtons ===
        "undefined"
    ) {

        console.error(
            "Mutation buttons not found."
        );

        return;

    }


    mutationButtons.forEach(
        function(button, index) {

            const mutation =
                choices[index];


            if (!mutation) {

                button.textContent =
                    "ERROR";

                button.onclick =
                    null;

                return;

            }


            button.textContent =
                mutation.name;


            button.onclick =
                function() {

                    selectRoundMutation(
                        mutation
                    );

                };

        }
    );


    console.log(
        "MUTATION OPTIONS:",
        choices
    );

}


// ==========================================
// SELECT MUTATION
// ==========================================

function selectRoundMutation(
    mutation
) {

    if (!mutation) {

        return;

    }


    console.log(
        "SELECTED:",
        mutation.name
    );


    Player.addMutation(
        mutation
    );


    if (
        mutationMenu
    ) {

        mutationMenu.classList.add(
            "hidden"
        );

    }


    RoundSystem.waitingForMutation =
        false;


    const nextRound =
        RoundSystem.current + 1;


    setTimeout(
        function() {

            startGameRound(
                nextRound
            );

        },
        500
    );

}


// ==========================================
// FORCE COMPLETE ROUND
// ==========================================

function forceCompleteRound() {

    if (
        typeof enemies ===
        "undefined"
    ) {

        return;

    }


    enemies.forEach(
        function(enemy) {

            if (
                enemy.alive &&
                typeof killEnemy ===
                "function"
            ) {

                killEnemy(
                    enemy
                );

            }

        }
    );


    updateRoundSystem();

}


// ==========================================
// CURRENT ROUND
// ==========================================

function getCurrentRound() {

    return RoundSystem.current;

}


// ==========================================
// LIVING ENEMY COUNT
// ==========================================

function getLivingEnemyCount() {

    if (
        typeof enemies ===
        "undefined"
    ) {

        return 0;

    }


    return enemies.filter(
        enemy =>
            enemy.alive
    ).length;

      }
