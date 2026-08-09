// ==========================================
// PROJECT: REPLACEMENT
// AUDIO.JS
// ==========================================


// ==========================================
// AUDIO SYSTEM
// ==========================================

const AudioSystem = {

    context: null,

    enabled: true,

    masterVolume: 0.18,


    // ======================================
    // INITIALIZE
    // ======================================

    initialize() {

        if (this.context) {
            return;
        }


        try {

            this.context =
                new (
                    window.AudioContext ||
                    window.webkitAudioContext
                )();

        }

        catch (error) {

            console.log(
                "Audio unavailable."
            );

            this.enabled =
                false;

        }

    },


    // ======================================
    // START AUDIO AFTER USER INPUT
    // ======================================

    start() {

        this.initialize();


        if (
            !this.context
        ) {

            return;

        }


        if (
            this.context.state ===
            "suspended"
        ) {

            this.context.resume();

        }

    },


    // ======================================
    // SIMPLE TONE
    // ======================================

    tone(
        frequency,
        duration = 0.1,
        type = "sine",
        volume = 0.1
    ) {

        if (
            !this.enabled
        ) {

            return;

        }


        this.start();


        if (
            !this.context
        ) {

            return;

        }


        const oscillator =
            this.context.createOscillator();


        const gain =
            this.context.createGain();


        oscillator.type =
            type;


        oscillator.frequency.value =
            frequency;


        gain.gain.value =
            volume *
            this.masterVolume;


        oscillator.connect(
            gain
        );


        gain.connect(
            this.context.destination
        );


        oscillator.start();


        gain.gain.exponentialRampToValueAtTime(
            0.001,
            this.context.currentTime +
            duration
        );


        oscillator.stop(
            this.context.currentTime +
            duration
        );

    },


    // ======================================
    // PLAYER ATTACK
    // ======================================

    playerAttack() {

        this.tone(
            110,
            0.08,
            "square",
            0.4
        );

    },


    // ======================================
    // PLAYER HIT
    // ======================================

    playerHit() {

        this.tone(
            65,
            0.15,
            "sawtooth",
            0.5
        );

    },


    // ======================================
    // ENEMY HIT
    // ======================================

    enemyHit() {

        this.tone(
            80,
            0.08,
            "square",
            0.25
        );

    },


    // ======================================
    // ENEMY DEATH
    // ======================================

    enemyDeath() {

        this.tone(
            45,
            0.25,
            "sawtooth",
            0.35
        );

    },


    // ======================================
    // MUTATION
    // ======================================

    mutation() {

        this.tone(
            55,
            0.15,
            "sawtooth",
            0.25
        );


        setTimeout(
            () => {

                this.tone(
                    75,
                    0.2,
                    "sawtooth",
                    0.25
                );

            },
            120
        );


        setTimeout(
            () => {

                this.tone(
                    100,
                    0.3,
                    "sawtooth",
                    0.2
                );

            },
            250
        );

    },


    // ======================================
    // ROUND START
    // ======================================

    roundStart() {

        this.tone(
            70,
            0.3,
            "square",
            0.15
        );

    },


    // ======================================
    // ROUND COMPLETE
    // ======================================

    roundComplete() {

        this.tone(
            180,
            0.12,
            "sine",
            0.15
        );


        setTimeout(
            () => {

                this.tone(
                    240,
                    0.2,
                    "sine",
                    0.12
                );

            },
            150
        );

    },


    // ======================================
    // WARNING
    // ======================================

    warning() {

        this.tone(
            90,
            0.12,
            "square",
            0.25
        );


        setTimeout(
            () => {

                this.tone(
                    90,
                    0.12,
                    "square",
                    0.25
                );

            },
            180
        );

    },


    // ======================================
    // HORROR STING
    // ======================================

    horrorSting() {

        this.tone(
            180,
            0.05,
            "sawtooth",
            0.2
        );


        setTimeout(
            () => {

                this.tone(
                    47,
                    0.5,
                    "sawtooth",
                    0.3
                );

            },
            60
        );

    },


    // ======================================
    // HEARTBEAT
    // ======================================

    heartbeat() {

        this.tone(
            55,
            0.08,
            "sine",
            0.18
        );


        setTimeout(
            () => {

                this.tone(
                    48,
                    0.08,
                    "sine",
                    0.15
                );

            },
            120
        );

    },


    // ======================================
    // GLITCH
    // ======================================

    glitch() {

        const frequencies = [

            120,

            240,

            60,

            360,

            90

        ];


        const frequency =
            frequencies[
                Math.floor(
                    Math.random() *
                    frequencies.length
                )
            ];


        this.tone(
            frequency,
            0.04,
            "square",
            0.08
        );

    }

};


// ==========================================
// ENABLE AUDIO AFTER FIRST INPUT
// ==========================================

document.addEventListener(
    "keydown",
    function() {

        AudioSystem.start();

    },
    {
        once: true
    }
);


document.addEventListener(
    "click",
    function() {

        AudioSystem.start();

    },
    {
        once: true
    }
);
