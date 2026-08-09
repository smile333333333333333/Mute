// ==========================================
// PROJECT: REPLACEMENT
// COMBAT.JS
// ==========================================


// ==========================================
// COMBAT STATE
// ==========================================

const Combat = {

    attacking: false,

    lastAttack: 0,

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

    const dx =
        x2 - x1;

    const dy =
        y2 - y1;


    return Math.sqrt(
        dx * dx +
        dy * dy
    );

}


// ==========================================
// GET WEAPONS
// ==========================================

function getActiveWeapons() {

    const weapons = [];


    // Normal body parts.

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


    // Extra limbs.

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
// ATTACK
// ==========================================

function playerAttack() {

    const now =
        Date.now();


    if (
        Combat.attacking
    ) {

        return;

    }


    if (
        now -
        Combat.lastAttack <
        Combat.defaultCooldown
    ) {

        return;

    }


    const weapons =
        getActiveWeapons();


    // No mutations yet.

    if (
        weapons.length === 0
    ) {

        basicPunch();

        return;

    }


    // Use the first weapon.

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


    setTimeout(
        function() {

            Combat.attacking =
                false;

        },
        150
    );

}


// ==========================================
// BASIC PUNCH
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


    const damage =
        5;


    const range =
        6;


    hitEnemiesInRange(
        range,
        damage
    );


    showAttackEffect({

        name: "PUNCH"

    });

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


    console.log(
        "USING:",
        mutation.name
    );


    // Special attacks.

    switch (
        mutation.id
    ) {

        case "gunHand":

            gunAttack(
                mutation
            );

            return;


        case "boneCannon":

            cannonAttack(
                mutation
            );

            return;


        case "toothLauncher":

            toothAttack(
                mutation
            );

            return;


        case "tongueTendril":

            tongueAttack(
                mutation
            );

            return;


        case "hookTongue":

            hookTongueAttack(
                mutation
            );

            return;


        case "vineArm":

            vineAttack(
                mutation
            );

            return;


        case "seedLauncher":

            seedAttack(
                mutation
            );

            return;

    }


    // Normal mutation weapon.

    hitEnemiesInRange(
        mutation.range || 6,
        mutation.damage || 5
    );

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


            console.log(
                "HIT:",
                enemy.name,
                damage
            );

        }

    }


    if (
        !hitSomething
    ) {

        console.log(
            "MISS"
        );

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
                "NO AMMUNITION"
            );

            return;

        }


        mutation.ammunition--;

    }


    console.log(
        "GUN HAND FIRED"
    );


    hitEnemiesInRange(
        mutation.range || 20,
        mutation.damage || 25
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
                "BONE CANNON EMPTY"
            );

            return;

        }


        mutation.ammunition--;

    }


    console.log(
        "BONE CANNON FIRED"
    );


    hitEnemiesInRange(
        mutation.range || 20,
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
                "NO TEETH LEFT"
            );

            return;

        }


        mutation.ammunition--;

    }


    console.log(
        "TOOTH PROJECTILE"
    );


    hitEnemiesInRange(
        mutation.range || 20,
        mutation.damage || 18
    );

}


// ==========================================
// TONGUE
// ==========================================

function tongueAttack(
    mutation
) {

    console.log(
        "TONGUE TENDRIL"
    );


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

    console.log(
        "HOOK TONGUE"
    );


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

    console.log(
        "VINE ARM"
    );


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

    console.log(
        "SEED LAUNCHER"
    );


    hitEnemiesInRange(
        mutation.range || 20,
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
// SPECIAL ABILITIES
// ==========================================

function useMutationAbility(
    mutation
) {

    if (!mutation) {

        return;

    }


    switch (
        mutation.id
    ) {

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

            playerAttack();

            break;

    }

}


// ==========================================
// ATTACK KEY
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
