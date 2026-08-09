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
// DISTANCE HELPER
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


    // Check normal body parts.

    const bodyParts =
        Object.values(Player.body);


    for (
        const part
        of bodyParts
    ) {

        if (
            part.mutation &&
            part.mutation.type === "weapon"
        ) {

            weapons.push(
                part.mutation
            );

        }

    }


    // Check extra limbs.

    for (
        const limb
        of Player.extraLimbs
    ) {

        if (
            limb.type === "weapon"
        ) {

            weapons.push(limb);

        }

    }


    return weapons;

}


// ==========================================
// BASIC ATTACK
// ==========================================

function playerAttack() {

    const now =
        Date.now();


    if (
        Combat.attacking
    ) {

        return;

    }


    const weapons =
        getActiveWeapons();


    // Player has no mutation weapon.

    if (
        weapons.length === 0
    ) {

        basicPunch();

        return;

    }


    // Use the first available
    // weapon for now.

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
        40;


    hitEnemiesInRange(
        range,
        damage
    );


    console.log(
        "PLAYER PUNCH"
    );

}


// ==========================================
// MUTATION ATTACK
// ==========================================

function performMutationAttack(
    mutation
) {

    const damage =
        mutation.damage ||
        5;


    const range =
        mutation.range ||
        40;


    console.log(
        "USING MUTATION:",
        mutation.name
    );


    hitEnemiesInRange(
        range,
        damage
    );


    // Special attacks can be
    // added here later.

    if (
        mutation.id ===
        "boneCannon"
    ) {

        cannonAttack(
            mutation
        );

    }


    if (
        mutation.id ===
        "gunHand"
    ) {

        gunAttack(
            mutation
        );

    }


    if (
        mutation.id ===
        "toothLauncher"
    ) {

        toothAttack(
            mutation
        );

    }

}


// ==========================================
// HIT ENEMIES IN RANGE
// ==========================================

function hitEnemiesInRange(
    range,
    damage
) {

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
            distance <= range
        ) {

            damageEnemy(
                enemy,
                damage
            );

            console.log(
                "HIT:",
                enemy.name,
                damage
            );

        }

    }

}


// ==========================================
// GUN HAND
// ==========================================

function gunAttack(
    mutation
) {

    console.log(
        "GUN HAND FIRED"
    );


    // Ammunition system will be
    // expanded later.

}


// ==========================================
// BONE CANNON
// ==========================================

function cannonAttack(
    mutation
) {

    console.log(
        "BONE CANNON FIRED"
    );


    // Powerful projectile system
    // will be added later.

}


// ==========================================
// TOOTH ATTACK
// ==========================================

function toothAttack(
    mutation
) {

    console.log(
        "TOOTH PROJECTILE FIRED"
    );


    // Projectile visuals will
    // be added later.

}


// ==========================================
// SPECIAL MUTATION ABILITIES
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
// TONGUE
// ==========================================

function tongueAttack(
    mutation
) {

    console.log(
        "TONGUE TENDRIL ATTACK"
    );


    hitEnemiesInRange(
        mutation.range || 150,
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
        "HOOK TONGUE ATTACK"
    );


    hitEnemiesInRange(
        mutation.range || 180,
        10
    );

}


// ==========================================
// VINE ARM
// ==========================================

function vineAttack(
    mutation
) {

    console.log(
        "VINE ATTACK"
    );


    hitEnemiesInRange(
        mutation.range || 130,
        mutation.damage || 7
    );

}


// ==========================================
// SEED LAUNCHER
// ==========================================

function seedAttack(
    mutation
) {

    console.log(
        "SEED PROJECTILE"
    );


    hitEnemiesInRange(
        mutation.range || 250,
        mutation.damage || 12
    );

}


// ==========================================
// KEYBOARD ATTACK
// ==========================================

document.addEventListener(
    "keydown",
    function(event) {

        // SPACE = attack

        if (
            event.code === "Space"
        ) {

            event.preventDefault();

            playerAttack();

        }

    }
);
