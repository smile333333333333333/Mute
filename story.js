// ==========================================
// PROJECT: REPLACEMENT
// STORY.JS
// ==========================================


// ==========================================
// STORY STATE
// ==========================================

const Story = {

    // How far the player has progressed.

    progression: 0,


    // Things the player has discovered.

    discoveries: [],


    // Story flags.

    flags: {

        gameStarted: false,

        firstMutation: false,

        firstDeath: false,

        firstBrute: false,

        deepMutation: false,

        discoveredFacility: false,

        discoveredTruth: false

    },


    // ======================================
    // START
    // ======================================

    start() {

        if (
            this.flags.gameStarted
        ) {

            return;

        }


        this.flags.gameStarted =
            true;


        this.showMessage(
            "YOU ARE NOT SUPPOSED TO BE HERE."
        );


        this.progression = 1;

    },


    // ======================================
    // STORY MESSAGE
    // ======================================

    showMessage(
        text,
        duration = 3500
    ) {

        if (
            typeof UI !== "undefined"
        ) {

            UI.message(
                text,
                duration
            );

        }

        else {

            console.log(
                text
            );

        }

    },


    // ======================================
    // DISCOVERY
    // ======================================

    discover(
        id,
        text
    ) {

        if (
            this.discoveries.includes(
                id
            )
        ) {

            return;

        }


        this.discoveries.push(
            id
        );


        console.log(
            "DISCOVERY:",
            id
        );


        if (text) {

            this.showMessage(
                text,
                4000
            );

        }

    },


    // ======================================
    // FIRST MUTATION
    // ======================================

    firstMutation() {

        if (
            this.flags.firstMutation
        ) {

            return;

        }


        this.flags.firstMutation =
            true;


        this.progression =
            Math.max(
                this.progression,
                2
            );


        this.showMessage(
            "SOMETHING INSIDE YOU MOVED.",
            3500
        );


        setTimeout(
            () => {

                this.showMessage(
                    "IT IS STILL MOVING.",
                    3000
                );

            },
            3800
        );

    },


    // ======================================
    // FIRST BRUTE
    // ======================================

    firstBrute() {

        if (
            this.flags.firstBrute
        ) {

            return;

        }


        this.flags.firstBrute =
            true;


        this.progression =
            Math.max(
                this.progression,
                3
            );


        this.showMessage(
            "THAT THING USED TO BE HUMAN.",
            4000
        );

    },


    // ======================================
    // DEATH
    // ======================================

    playerDeath() {

        if (
            this.flags.firstDeath
        ) {

            return;

        }


        this.flags.firstDeath =
            true;


        this.discover(
            "death",
            "DEATH WAS NOT THE END."
        );

    },


    // ======================================
    // DEEP MUTATION
    // ======================================

    deepMutation() {

        if (
            this.flags.deepMutation
        ) {

            return;

        }


        this.flags.deepMutation =
            true;


        this.progression =
            Math.max(
                this.progression,
                4
            );


        this.showMessage(
            "YOUR BODY IS LEARNING.",
            4000
        );


        setTimeout(
            () => {

                this.showMessage(
                    "YOU ARE LEARNING TOO.",
                    3500
                );

            },
            4500
        );

    },


    // ======================================
    // FACILITY DISCOVERY
    // ======================================

    facilityDiscovery() {

        if (
            this.flags.discoveredFacility
        ) {

            return;

        }


        this.flags.discoveredFacility =
            true;


        this.discover(
            "facility",
            "THIS PLACE WAS BUILT FOR SOMETHING."
        );

    },


    // ======================================
    // TRUTH
    // ======================================

    revealTruth() {

        if (
            this.flags.discoveredTruth
        ) {

            return;

        }


        this.flags.discoveredTruth =
            true;


        this.progression = 10;


        this.showMessage(
            "THEY DIDN'T CREATE THE MUTATIONS.",
            4500
        );


        setTimeout(
            () => {

                this.showMessage(
                    "THEY ONLY FOUND THEM.",
                    4500
                );

            },
            5000
        );

    },


    // ======================================
    // ROUND EVENTS
    // ======================================

    roundEvent(
        round
    ) {

        switch (round) {

            case 1:

                this.showMessage(
                    "FIND A WAY OUT.",
                    3000
                );

                break;


            case 2:

                this.showMessage(
                    "THE DOORS ARE LOCKED.",
                    3000
                );

                break;


            case 3:

                this.showMessage(
                    "SOMETHING IS WATCHING YOU.",
                    3000
                );

                break;


            case 5:

                this.showMessage(
                    "YOU HEAR SOMETHING BEHIND THE WALL.",
                    4000
                );

                break;


            case 7:

                this.showMessage(
                    "THE BUILDING IS CHANGING.",
                    4000
                );

                break;


            case 10:

                this.showMessage(
                    "YOU HAVE BEEN HERE BEFORE.",
                    4000
                );

                break;


            case 15:

                this.deepMutation();

                break;

        }

    },


    // ======================================
    // RANDOM HORROR EVENT
    // ======================================

    randomEvent() {

        const events = [

            "DID YOU HEAR THAT?",

            "SOMETHING MOVED.",

            "THE LIGHTS FLICKERED.",

            "YOU FEEL SOMETHING WATCHING YOU.",

            "THAT WASN'T THERE BEFORE.",

            "DON'T LOOK BEHIND YOU.",

            "THE ROOM FEELS SMALLER.",

            "YOU HEAR BREATHING.",

            "SOMETHING SCRATCHED THE WALL.",

            "THE BUILDING IS QUIET."

        ];


        const randomIndex =
            Math.floor(
                Math.random() *
                events.length
            );


        this.showMessage(
            events[randomIndex],
            2500
        );


        if (
            typeof UI !== "undefined"
        ) {

            UI.glitch(
                150
            );

        }

    },


    // ======================================
    // CHECK PROGRESSION
    // ======================================

    update() {

        const round =
            typeof RoundSystem !== "undefined"
                ? RoundSystem.current
                : 1;


        // Round-based events.

        if (
            round === 1 &&
            !this.flags.gameStarted
        ) {

            this.start();

        }


        // Every few rounds there is
        // a chance for a strange event.

        if (
            round > 3 &&
            Math.random() < 0.002
        ) {

            this.randomEvent();

        }


        // Deeper mutation threshold.

        if (
            Player.mutationEnergy >= 50
        ) {

            this.deepMutation();

        }

    }

};


// ==========================================
// STORY INITIALIZATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        Story.start();

    }
);
