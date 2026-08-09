// ==========================================
// PROJECT: REPLACEMENT
// COMBAT.JS
// ==========================================


// ==========================================
// COMBAT STATE
// ==========================================

const Combat = {

    lastAttack: 0,

    attacking: false,

    defaultCooldown: 400

};


// ==========================================
// DISTANCE
// ==========================================

function combatDistance(
    x1,
    y1,
    x2,
    y2
) {

    const dx = x2 - x1;
    const dy = y2 - y1;

    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


// ==========================================
// GET ACTIVE WEAPONS
// ==========================================

function getActiveWeapons() {

    const weapons = [];


    Object.values(
        Player.body
    ).forEach(
        part => {

            if (
                part.mutation &&
                part.mutation.type ===
                "weapon"
            ) {

                weapons.push(
                    part.mutation
                );

            }

        }
    );


    Player.extraLimbs.forEach(
        limb => {

            if (
                limb.type ===
                "weapon"
            ) {

                weapons.push(
                    limb
                );

            }

        }
    );


    return weapons;

}


// ==========================================
// PLAYER ATTACK
// ==========================================

function playerAttack() {

    const now =
        Date.now();


    if (
        now -
        Combat.lastAttack <
        Combat.defaultCooldown
    ) {

        return;

    }


    const weapons =
        getActiveWeapons();


    // --------------------------------------
    // NO MUTATION = BASIC ATTACK
    // --------------------------------------

    if (
        weapons.length === 0
    ) {

        basicPunch();

        return;

    }


    // --------------------------------------
    // USE FIRST WEAPON
    // --------------------------------------

    const weapon =
        weapons[0];


    const cooldown =
        weapon.cooldown ||
        Combat.defaultCooldown;


    if (
        now -
        Combat.lastAttack <
        cooldown
    ) {

        return;

    }


    Combat.lastAttack =
        now;


    Combat.attacking =
        true;


    performMutationAttack(
        weapon
    );


    showAttackEffect(
        weapon
    );


    if (
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.playerAttack();

    }


    setTimeout(
        function() {

            Combat.attacking =
                false;

        },
        150
    );

}


// ==========================================
// BASIC ATTACK
// ==========================================

function basicPunch() {

    const now =
        Date.now();


    if (
        now -
        Combat.lastAttack <
        Combat.defaultCooldown
    ) {

        return;

    }


    Combat.lastAttack =
        now;


    hitEnemiesInRange(
        7,
        5
    );


    showAttackEffect({

        name: "PUNCH"

    });


    if (
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.playerAttack();

    }

}


// ==========================================
// MUTATION ATTACK
// ==========================================

function performMutationAttack(
    mutation
) {

    if (!mutation) {

        return;

    }


    switch (
        mutation.id
    ) {

        case "gunHand":

            gunAttack(
                mutation
            );

            break;


        case "shotgunArm":

            shotgunAttack(
                mutation
            );

            break;


        case "boneCannon":

            cannonAttack(
                mutation
            );

            break;


        case "toothLauncher":

            toothAttack(
                mutation
            );

            break;


        case "tongueTendril":

            tongueAttack(
                mutation
            );

            break;


        case "hookTongue":

            hookTongueAttack(
                mutation
            );

            break;


        case "vineArm":

            vineAttack(
                mutation
            );

            break;


        case "seedLauncher":

            seedAttack(
                mutation
            );

            break;


        default:

            hitEnemiesInRange(
                mutation.range || 7,
                mutation.damage || 5
            );

            break;

    }

}


// ==========================================
// HIT ENEMIES
// ==========================================

function hitEnemiesInRange(
    range,
    damage
) {

    let hitSomething =
        false;


    if (
        typeof enemies ===
        "undefined"
    ) {

        return;

    }


    for (
        const enemy
        of enemies
    ) {

        if (
            !enemy.alive
        ) {

            continue;

        }


        const distance =
            combatDistance(
                Player.x,
                Player.y,
                enemy.x,
                enemy.y
            );


        if (
            distance <=
            range
        ) {

            damageEnemy(
                enemy,
                damage
            );


            hitSomething =
                true;

        }

    }


    if (
        hitSomething &&
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.enemyHit();

    }

}


// ==========================================
// GUN HAND
// ==========================================

function gunAttack(
    mutation
) {

    if (
        mutation.ammunition !==
        undefined
    ) {

        if (
            mutation.ammunition <= 0
        ) {

            console.log(
                "GUN HAND: EMPTY"
            );

            return;

        }


        mutation.ammunition--;

    }


    hitEnemiesInRange(
        mutation.range || 30,
        mutation.damage || 25
    );

}


// ==========================================
// SHOTGUN ARM
// ==========================================

function shotgunAttack(
    mutation
) {

    if (
        mutation.ammunition !==
        undefined
    ) {

        if (
            mutation.ammunition <= 0
        ) {

            console.log(
                "SHOTGUN ARM: EMPTY"
            );

            return;

        }


        mutation.ammunition--;

    }


    // Close-range attack.

    hitEnemiesInRange(
        mutation.range || 15,
        mutation.damage || 45
    );

}


// ==========================================
// BONE CANNON
// ==========================================

function cannonAttack(
    mutation
) {

    if (
        mutation.ammunition !==
        undefined
    ) {

        if (
            mutation.ammunition <= 0
        ) {

            console.log(
                "BONE CANNON: EMPTY"
            );

            return;

        }


        mutation.ammunition--;

    }


    hitEnemiesInRange(
        mutation.range || 40,
        mutation.damage || 70
    );

}


// ==========================================
// TOOTH LAUNCHER
// ==========================================

function toothAttack(
    mutation
) {

    if (
        mutation.ammunition !==
        undefined
    ) {

        if (
            mutation.ammunition <= 0
        ) {

            console.log(
                "TOOTH LAUNCHER: EMPTY"
            );

            return;

        }


        mutation.ammunition--;

    }


    hitEnemiesInRange(
        mutation.range || 35,
        mutation.damage || 18
    );

}


// ==========================================
// TONGUE
// ==========================================

function tongueAttack(
    mutation
) {

    hitEnemiesInRange(
        mutation.range || 20,
        8
    );

}


// ==========================================
// HOOK TONGUE
// ==========================================

function hookTongueAttack(
    mutation
) {

    hitEnemiesInRange(
        mutation.range || 20,
        10
    );

}


// ==========================================
// VINE
// ==========================================

function vineAttack(
    mutation
) {

    hitEnemiesInRange(
        mutation.range || 20,
        mutation.damage || 7
    );

}


// ==========================================
// SEED
// ==========================================

function seedAttack(
    mutation
) {

    hitEnemiesInRange(
        mutation.range || 30,
        mutation.damage || 12
    );

}


// ==========================================
// ATTACK VISUAL
// ==========================================

function showAttackEffect(
    weapon
) {

    if (
        !playerElement
    ) {

        return;

    }


    playerElement.classList.add(
        "attacking"
    );


    setTimeout(
        function() {

            playerElement.classList.remove(
                "attacking"
            );

        },
        120
    );

}


// ==========================================
// MUTATION ABILITY
// ==========================================

function useMutationAbility(
    mutation
) {

    if (!mutation) {

        return;

    }


    performMutationAttack(
        mutation
    );

}


// ==========================================
// SPACEBAR ATTACK
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            playerAttack();

        }

    }
);
