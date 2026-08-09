// ==========================================
// PROJECT: REPLACEMENT
// PLAYER.JS
// ==========================================


// ==========================================
// PLAYER
// ==========================================

const Player = {

    // ======================================
    // POSITION
    // ======================================

    x: 50,

    y: 50,

    speed: 3,

    width: 32,

    height: 48,


    // ======================================
    // HEALTH
    // ======================================

    health: 100,

    maxHealth: 100,


    // ======================================
    // BODY
    // ======================================

    body: {

        head: {
            mutation: null
        },

        torso: {
            mutation: null
        },

        leftArm: {
            mutation: null
        },

        rightArm: {
            mutation: null
        },

        leftLeg: {
            mutation: null
        },

        rightLeg: {
            mutation: null
        }

    },


    // ======================================
    // EXTRA LIMBS
    // ======================================

    extraLimbs: [],


    // ======================================
    // MUTATION ENERGY
    // ======================================

    mutationEnergy: 0,


    // ======================================
    // MOVEMENT
    // ======================================

    move() {

        let moveX = 0;

        let moveY = 0;


        // ----------------------------------
        // WASD
        // ----------------------------------

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


        // ----------------------------------
        // ARROW KEYS
        // ----------------------------------

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


        // ----------------------------------
        // DIAGONAL MOVEMENT
        // ----------------------------------

        if (
            moveX !== 0 &&
            moveY !== 0
        ) {

            moveX *= 0.707;

            moveY *= 0.707;

        }


        // ----------------------------------
        // MOVE
        // ----------------------------------

        this.x +=
            moveX * this.speed;

        this.y +=
            moveY * this.speed;


        // ----------------------------------
        // ROOM BOUNDARIES
        // ----------------------------------

        this.x =
            Math.max(
                3,
                Math.min(
                    97,
                    this.x
                )
            );


        this.y =
            Math.max(
                3,
                Math.min(
                    88,
                    this.y
                )
            );

    },


    // ======================================
    // DAMAGE
    // ======================================

    takeDamage(amount) {

        if (
            amount <= 0
        ) {

            return;

        }


        let finalDamage =
            amount;


        // ----------------------------------
        // ORGANIC ARMOR
        // ----------------------------------

        const armor =
            this.getMutation(
                "torso"
            );


        if (
            armor &&
            armor.id ===
            "organicArmor"
        ) {

            finalDamage *=
                0.8;

        }


        // ----------------------------------
        // ROUND DAMAGE
        // ----------------------------------

        finalDamage =
            Math.max(
                1,
                finalDamage
            );


        this.health -=
            finalDamage;


        this.health =
            Math.max(
                0,
                this.health
            );


        // ----------------------------------
        // UI EFFECT
        // ----------------------------------

        if (
            typeof UI !==
            "undefined"
        ) {

            UI.updateHealth();

            UI.damageFlash();

        }


        // ----------------------------------
        // AUDIO
        // ----------------------------------

        if (
            typeof AudioSystem !==
            "undefined"
        ) {

            AudioSystem.playerHit();

        }


        // ----------------------------------
        // DEATH
        // ----------------------------------

        if (
            this.health <= 0
        ) {

            this.die();

        }

    },


    // ======================================
    // HEAL
    // ======================================

    heal(amount) {

        if (
            amount <= 0
        ) {

            return;

        }


        this.health +=
            amount;


        this.health =
            Math.min(
                this.maxHealth,
                this.health
            );


        if (
            typeof UI !==
            "undefined"
        ) {

            UI.updateHealth();

        }

    },


    // ======================================
    // ADD MUTATION
    // ======================================

    addMutation(mutation) {

        if (!mutation) {

            return;

        }


        console.log(
            "PLAYER MUTATED:",
            mutation.name
        );


        // ----------------------------------
        // EXTRA LIMB
        // ----------------------------------

        const extraLimbTypes = [

            "extraArm",

            "spiderLimbs",

            "backTendril",

            "spineTail",

            "crawlingHand"

        ];


        if (
            extraLimbTypes.includes(
                mutation.id
            )
        ) {

            this.extraLimbs.push(
                mutation
            );

        }


        // ----------------------------------
        // NORMAL BODY PART
        // ----------------------------------

        const validParts = [

            "head",

            "torso",

            "leftArm",

            "rightArm",

            "leftLeg",

            "rightLeg"

        ];


        if (
            validParts.includes(
                mutation.bodyPart
            )
        ) {

            this.body[
                mutation.bodyPart
            ].mutation =
                mutation;

        }


        // ----------------------------------
        // HEALTH BONUS
        // ----------------------------------

        if (
            mutation.maxHealthBonus
        ) {

            this.maxHealth +=
                mutation.maxHealthBonus;


            this.health =
                this.maxHealth;

        }


        // ----------------------------------
        // SPEED BONUS
        // ----------------------------------

        if (
            mutation.speedBonus
        ) {

            this.speed +=
                mutation.speedBonus;

        }


        // ----------------------------------
        // MUTATION ENERGY
        // ----------------------------------

        if (
            mutation.mutationEnergyBonus
        ) {

            this.mutationEnergy +=
                mutation.mutationEnergyBonus;

        }


        // ----------------------------------
        // UPDATE UI
        // ----------------------------------

        if (
            typeof UI !==
            "undefined"
        ) {

            UI.updateHealth();

            UI.mutationAcquired(
                mutation
            );

        }


        // ----------------------------------
        // UPDATE BODY
        // ----------------------------------

        if (
            typeof BodySystem !==
            "undefined"
        ) {

            BodySystem.onMutationAdded(
                mutation
            );

        }


        // ----------------------------------
        // AUDIO
        // ----------------------------------

        if (
            typeof AudioSystem !==
            "undefined"
        ) {

            AudioSystem.mutation();

        }


        // ----------------------------------
        // STORY
        // ----------------------------------

        if (
            typeof Story !==
            "undefined"
        ) {

            Story.firstMutation();

        }

    },


    // ======================================
    // GET BODY MUTATION
    // ======================================

    getMutation(part) {

        if (
            !this.body[part]
        ) {

            return null;

        }


        return this.body[
            part
        ].mutation;

    },


    // ======================================
    // CHECK MUTATION
    // ======================================

    hasMutation(id) {

        const bodyParts =
            Object.values(
                this.body
            );


        for (
            const bodyPart
            of bodyParts
        ) {

            if (
                bodyPart.mutation &&
                bodyPart.mutation.id === id
            ) {

                return true;

            }

        }


        return this.extraLimbs.some(
            limb =>
                limb.id === id
        );

    },


    // ======================================
    // GET ALL MUTATIONS
    // ======================================

    getAllMutations() {

        const mutations = [];


        Object.values(
            this.body
        ).forEach(
            bodyPart => {

                if (
                    bodyPart.mutation
                ) {

                    mutations.push(
                        bodyPart.mutation
                    );

                }

            }
        );


        this.extraLimbs.forEach(
            limb => {

                mutations.push(
                    limb
                );

            }
        );


        return mutations;

    },


    // ======================================
    // CHECK DEFENSE
    // ======================================

    getDefense() {

        let defense = 0;


        Object.values(
            this.body
        ).forEach(
            bodyPart => {

                if (
                    bodyPart.mutation &&
                    bodyPart.mutation.defense
                ) {

                    defense +=
                        bodyPart.mutation.defense;

                }

            }
        );


        return defense;

    },


    // ======================================
    // CONTACT DAMAGE
    // ======================================

    getContactDamage() {

        let damage = 0;


        Object.values(
            this.body
        ).forEach(
            bodyPart => {

                if (
                    bodyPart.mutation &&
                    bodyPart.mutation.contactDamage
                ) {

                    damage +=
                        bodyPart.mutation.contactDamage;

                }

            }
        );


        return damage;

    },


    // ======================================
    // ATTACK
    // ======================================

    attack() {

        if (
            typeof playerAttack ===
            "function"
        ) {

            playerAttack();

        }

    },


    // ======================================
    // DEATH
    // ======================================

    die() {

        if (
            !game.running
        ) {

            return;

        }


        game.running =
            false;


        console.log(
            "PLAYER DIED"
        );


        if (
            typeof Story !==
            "undefined"
        ) {

            Story.playerDeath();

        }


        if (
            typeof AudioSystem !==
            "undefined"
        ) {

            AudioSystem.horrorSting();

        }


        if (
            typeof UI !==
            "undefined"
        ) {

            UI.message(
                "YOU DIED",
                3000
            );

            UI.shake(
                8,
                500
            );

        }


        setTimeout(
            function() {

                location.reload();

            },
            3000
        );

    }

};
