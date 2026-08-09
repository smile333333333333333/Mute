// ==========================================
// PROJECT: REPLACEMENT
// ROUNDS.JS
// ==========================================


// ==========================================
// ROUND STATE
// ==========================================

const RoundSystem = {

    current: 1,

    active: false,

    enemiesSpawned: false,

    waitingForMutation: false

};


// ==========================================
// START ROUND
// ==========================================

function startGameRound(roundNumber) {

    RoundSystem.current =
        roundNumber;

    RoundSystem.active =
        true;

    RoundSystem.enemiesSpawned =
        true;

    RoundSystem.waitingForMutation =
        false;


    game.round =
        roundNumber;


    if (roundNumber <= 1) {

        Player.health =
            Player.maxHealth;

        updatePlayerHealth();

    }


    if (roundNumberElement) {

        roundNumberElement.textContent =
            roundNumber;

    }


    console.log(
        "ROUND " +
        roundNumber +
        " START"
    );


    spawnRoundEnemies(
        roundNumber
    );

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


    const livingEnemies =
        enemies.filter(
            enemy =>
                enemy.alive
        );


    // If enemies remain,
    // the round continues.

    if (
        livingEnemies.length > 0
    ) {

        return;

    }


    // No enemies remain.

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


    // Give the player a small
    // amount of health back.

    Player.heal(
        15
    );


    openMutationSelection();

}


// ==========================================
// OPEN MUTATION SELECTION
// ==========================================

function openMutationSelection() {

    if (!mutationMenu) {

        return;

    }


    const choices =
        getRandomMutationChoices(
            3
        );


    mutationMenu.classList.remove(
        "hidden"
    );


    mutationButtons.forEach(
        function(button, index) {

            const mutation =
                choices[index];


            if (!mutation) {

                button.textContent =
                    "ERROR";

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
        "MUTATION SELECTED:",
        mutation.name
    );


    Player.addMutation(
        mutation
    );


    mutationMenu.classList.add(
        "hidden"
    );


    RoundSystem.waitingForMutation =
        false;


    // Start next round.

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
// FORCE END ROUND
// ==========================================

function forceCompleteRound() {

    enemies.forEach(
        function(enemy) {

            if (
                enemy.alive
            ) {

                killEnemy(
                    enemy
                );

            }

        }
    );


    completeCurrentRound();

}


// ==========================================
// GET CURRENT ROUND
// ==========================================

function getCurrentRound() {

    return RoundSystem.current;

}


// ==========================================
// GET ENEMY COUNT
// ==========================================

function getLivingEnemyCount() {

    return enemies.filter(
        enemy =>
            enemy.alive
    ).length;

}
