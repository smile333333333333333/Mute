// ==========================================
// PROJECT: REPLACEMENT
// ENEMIES.JS
// ==========================================


// ==========================================
// ENEMY TYPES
// ==========================================

const ENEMY_TYPES = {

    crawler: {

        id: "crawler",

        name: "CRAWLER",

        health: 30,

        speed: 1.2,

        damage: 8,

        width: 30,

        height: 24,

        attackRange: 5,

        attackCooldown: 900

    },


    infected: {

        id: "infected",

        name: "INFECTED",

        health: 60,

        speed: 0.8,

        damage: 12,

        width: 34,

        height: 50,

        attackRange: 5,

        attackCooldown: 1200

    },


    stalker: {

        id: "stalker",

        name: "STALKER",

        health: 45,

        speed: 1.7,

        damage: 10,

        width: 28,

        height: 42,

        attackRange: 5,

        attackCooldown: 700

    },


    brute: {

        id: "brute",

        name: "BRUTE",

        health: 150,

        speed: 0.45,

        damage: 25,

        width: 55,

        height: 70,

        attackRange: 7,

        attackCooldown: 1600

    }

};


// ==========================================
// ENEMY STORAGE
// ==========================================

const enemies = [];

let nextEnemyID = 0;


// ==========================================
// DISTANCE
// ==========================================

function distanceBetween(
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
// SPAWN ENEMY
// ==========================================

function spawnEnemy(
    typeID,
    x = null,
    y = null
) {

    const type =
        ENEMY_TYPES[typeID];


    if (!type) {

        console.error(
            "UNKNOWN ENEMY:",
            typeID
        );

        return null;

    }


    // Random spawn position.

    if (x === null) {

        x =
            10 +
            Math.random() * 80;

    }


    if (y === null) {

        y =
            10 +
            Math.random() * 70;

    }


    const enemy = {

        id: nextEnemyID++,

        type: type.id,

        name: type.name,

        x: x,

        y: y,

        health: type.health,

        maxHealth: type.health,

        speed: type.speed,

        damage: type.damage,

        width: type.width,

        height: type.height,

        attackRange:
            type.attackRange,

        attackCooldown:
            type.attackCooldown,

        lastAttack: 0,

        alive: true,

        element: null

    };


    enemies.push(
        enemy
    );


    createEnemyElement(
        enemy
    );


    // Story event.

    if (
        enemy.type === "brute" &&
        typeof Story !== "undefined"
    ) {

        Story.firstBrute();

    }


    return enemy;

}


// ==========================================
// CREATE ENEMY ELEMENT
// ==========================================

function createEnemyElement(
    enemy
) {

    const element =
        document.createElement(
            "div"
        );


    element.className =
        "enemy";


    element.dataset.enemyID =
        enemy.id;


    element.dataset.enemyType =
        enemy.type;


    element.style.position =
        "absolute";


    element.style.width =
        enemy.width + "px";


    element.style.height =
        enemy.height + "px";


    element.style.left =
        enemy.x + "%";


    element.style.top =
        enemy.y + "%";


    element.style.zIndex =
        "5";


    // Temporary placeholder.

    element.style.background =
        "#333";


    element.style.border =
        "3px solid #111";


    element.style.boxSizing =
        "border-box";


    // Add to room.

    if (roomElement) {

        roomElement.appendChild(
            element
        );

    }


    enemy.element =
        element;

}


// ==========================================
// UPDATE ALL ENEMIES
// ==========================================

function updateEnemies() {

    for (
        const enemy
        of enemies
    ) {

        if (
            !enemy.alive
        ) {

            continue;

        }


        moveEnemy(
            enemy
        );


        enemyAttack(
            enemy
        );


        updateEnemyVisual(
            enemy
        );

    }

}


// ==========================================
// MOVE ENEMY
// ==========================================

function moveEnemy(
    enemy
) {

    if (
        typeof Player ===
        "undefined"
    ) {

        return;

    }


    const dx =
        Player.x -
        enemy.x;


    const dy =
        Player.y -
        enemy.y;


    const distance =
        Math.sqrt(
            dx * dx +
            dy * dy
        );


    // Already close enough
    // to attack.

    if (
        distance <=
        enemy.attackRange
    ) {

        return;

    }


    if (
        distance > 0
    ) {

        enemy.x +=
            (
                dx /
                distance
            ) *
            enemy.speed;


        enemy.y +=
            (
                dy /
                distance
            ) *
            enemy.speed;

    }


    // Keep inside room.

    enemy.x =
        Math.max(
            3,
            Math.min(
                97,
                enemy.x
            )
        );


    enemy.y =
        Math.max(
            3,
            Math.min(
                88,
                enemy.y
            )
        );

}


// ==========================================
// ENEMY ATTACK
// ==========================================

function enemyAttack(
    enemy
) {

    if (
        typeof Player ===
        "undefined"
    ) {

        return;

    }


    const distance =
        distanceBetween(
            enemy.x,
            enemy.y,
            Player.x,
            Player.y
        );


    if (
        distance >
        enemy.attackRange
    ) {

        return;

    }


    const now =
        Date.now();


    if (
        now -
        enemy.lastAttack <
        enemy.attackCooldown
    ) {

        return;

    }


    enemy.lastAttack =
        now;


    Player.takeDamage(
        enemy.damage
    );


    // Sound.

    if (
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.playerHit();

    }


    // Screen effect.

    if (
        typeof playerDamageEffect ===
        "function"
    ) {

        playerDamageEffect();

    }

}


// ==========================================
// UPDATE ENEMY VISUAL
// ==========================================

function updateEnemyVisual(
    enemy
) {

    if (
        !enemy.element
    ) {

        return;

    }


    enemy.element.style.left =
        enemy.x + "%";


    enemy.element.style.top =
        enemy.y + "%";


    const healthPercent =
        enemy.health /
        enemy.maxHealth;


    enemy.element.style.opacity =
        Math.max(
            0.4,
            healthPercent
        );

}


// ==========================================
// DAMAGE ENEMY
// ==========================================

function damageEnemy(
    enemy,
    amount
) {

    if (
        !enemy ||
        !enemy.alive
    ) {

        return;

    }


    enemy.health -=
        amount;


    // Enemy hit sound.

    if (
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.enemyHit();

    }


    if (
        enemy.health <= 0
    ) {

        enemy.health =
            0;


        killEnemy(
            enemy
        );

    }

}


// ==========================================
// KILL ENEMY
// ==========================================

function killEnemy(
    enemy
) {

    if (
        !enemy.alive
    ) {

        return;

    }


    enemy.alive =
        false;


    if (
        enemy.element
    ) {

        enemy.element.remove();

    }


    if (
        typeof AudioSystem !==
        "undefined"
    ) {

        AudioSystem.enemyDeath();

    }


    if (
        typeof UI !==
        "undefined"
    ) {

        UI.enemyDefeated(
            enemy
        );

    }


    console.log(
        enemy.name +
        " defeated."
    );


    // Check whether the round
    // has been cleared.

    checkRoundComplete();

}


// ==========================================
// CLEAN DEAD ENEMIES
// ==========================================

function cleanupEnemies() {

    for (
        let i =
        enemies.length - 1;

        i >= 0;

        i--
    ) {

        if (
            !enemies[i].alive
        ) {

            enemies.splice(
                i,
                1
            );

        }

    }

}


// ==========================================
// CHECK ROUND
// ==========================================

function checkRoundComplete() {

    const livingEnemies =
        enemies.filter(
            enemy =>
                enemy.alive
        );


    if (
        livingEnemies.length === 0 &&
        typeof completeCurrentRound ===
        "function"
    ) {

        completeCurrentRound();

    }

}


// ==========================================
// SPAWN ROUND
// ==========================================

function spawnRoundEnemies(
    round
) {

    cleanupEnemies();


    // Number of enemies.

    const amount =
        Math.min(
            2 + round,
            12
        );


    for (
        let i = 0;

        i < amount;

        i++
    ) {

        let type;


        // ----------------------------------
        // Later rounds
        // ----------------------------------

        if (
            round >= 5 &&
            Math.random() < 0.20
        ) {

            type =
                "brute";

        }


        else if (
            round >= 3 &&
            Math.random() < 0.30
        ) {

            type =
                "stalker";

        }


        else if (
            Math.random() < 0.50
        ) {

            type =
                "infected";

        }


        else {

            type =
                "crawler";

        }


        spawnEnemy(
            type
        );

    }


    console.log(
        amount +
        " enemies spawned."
    );

}


// ==========================================
// GET LIVING ENEMIES
// ==========================================

function getLivingEnemies() {

    return enemies.filter(
        enemy =>
            enemy.alive
    );

}


// ==========================================
// GET ENEMY BY ID
// ==========================================

function getEnemyByID(
    id
) {

    return enemies.find(
        enemy =>
            enemy.id === id
    );

}
