// ==========================================
// PROJECT: REPLACEMENT
// UI.JS
// ==========================================


// ==========================================
// UI SYSTEM
// ==========================================

const UI = {

    // ======================================
    // HEALTH
    // ======================================

    updateHealth() {

        if (!healthFill) {
            return;
        }


        const percent =
            (
                Player.health /
                Player.maxHealth
            ) * 100;


        healthFill.style.width =
            Math.max(
                0,
                percent
            ) + "%";

    },


    // ======================================
    // ROUND
    // ======================================

    updateRound(number) {

        if (!roundNumberElement) {
            return;
        }


        roundNumberElement.textContent =
            number;

    },


    // ======================================
    // BODY INFORMATION
    // ======================================

    showBodyPart(
        name,
        mutation
    ) {

        if (selectedPartText) {

            selectedPartText.textContent =
                name;

        }


        if (!mutation) {

            if (mutationNameText) {

                mutationNameText.textContent =
                    "NORMAL";

            }


            if (mutationDescriptionText) {

                mutationDescriptionText.textContent =
                    "No mutation is currently affecting this body part.";

            }


            return;

        }


        if (mutationNameText) {

            mutationNameText.textContent =
                mutation.name;

        }


        if (mutationDescriptionText) {

            mutationDescriptionText.textContent =
                mutation.description;

        }

    },


    // ======================================
    // MESSAGE
    // ======================================

    message(
        text,
        duration = 2000
    ) {

        let message =
            document.getElementById(
                "game-message"
            );


        if (!message) {

            message =
                document.createElement(
                    "div"
                );


            message.id =
                "game-message";


            message.style.position =
                "absolute";


            message.style.left =
                "50%";


            message.style.top =
                "20%";


            message.style.transform =
                "translateX(-50%)";


            message.style.padding =
                "12px 20px";


            message.style.background =
                "rgba(0,0,0,0.9)";


            message.style.border =
                "3px solid #444";


            message.style.color =
                "#ddd";


            message.style.fontFamily =
                "monospace";


            message.style.fontSize =
                "16px";


            message.style.letterSpacing =
                "2px";


            message.style.zIndex =
                "500";


            document
                .getElementById("game")
                .appendChild(
                    message
                );

        }


        message.textContent =
            text;


        message.style.display =
            "block";


        clearTimeout(
            message.hideTimer
        );


        message.hideTimer =
            setTimeout(
                function() {

                    message.style.display =
                        "none";

                },
                duration
            );

    },


    // ======================================
    // DAMAGE FLASH
    // ======================================

    damageFlash() {

        let flash =
            document.getElementById(
                "damage-flash"
            );


        if (!flash) {

            flash =
                document.createElement(
                    "div"
                );


            flash.id =
                "damage-flash";


            flash.style.position =
                "absolute";


            flash.style.inset =
                "0";


            flash.style.background =
                "rgba(255,255,255,0.12)";


            flash.style.pointerEvents =
                "none";


            flash.style.zIndex =
                "400";


            document
                .getElementById("game")
                .appendChild(
                    flash
                );

        }


        flash.style.display =
            "block";


        setTimeout(
            function() {

                flash.style.display =
                    "none";

            },
            70
        );

    },


    // ======================================
    // SCREEN SHAKE
    // ======================================

    shake(
        intensity = 5,
        duration = 200
    ) {

        const gameElement =
            document.getElementById(
                "game"
            );


        if (!gameElement) {
            return;
        }


        const start =
            Date.now();


        function shakeFrame() {

            const elapsed =
                Date.now() -
                start;


            if (
                elapsed >= duration
            ) {

                gameElement.style.transform =
                    "";

                return;

            }


            const x =
                (
                    Math.random() * 2 - 1
                ) * intensity;


            const y =
                (
                    Math.random() * 2 - 1
                ) * intensity;


            gameElement.style.transform =
                `translate(${x}px, ${y}px)`;


            requestAnimationFrame(
                shakeFrame
            );

        }


        shakeFrame();

    },


    // ======================================
    // MUTATION ACQUIRED
    // ======================================

    mutationAcquired(
        mutation
    ) {

        if (!mutation) {
            return;
        }


        this.message(
            "MUTATION ACQUIRED: " +
            mutation.name,
            2500
        );


        this.shake(
            3,
            250
        );

    },


    // ======================================
    // ENEMY DEFEATED
    // ======================================

    enemyDefeated(
        enemy
    ) {

        if (!enemy) {
            return;
        }


        this.message(
            enemy.name +
            " DEFEATED",
            1000
        );

    },


    // ======================================
    // ROUND START
    // ======================================

    roundStart(
        number
    ) {

        this.message(
            "ROUND " +
            number,
            1500
        );

    },


    // ======================================
    // ROUND COMPLETE
    // ======================================

    roundComplete(
        number
    ) {

        this.message(
            "ROUND " +
            number +
            " COMPLETE",
            2000
        );

    },


    // ======================================
    // HORROR EFFECT
    // ======================================

    glitch(
        duration = 300
    ) {

        const gameElement =
            document.getElementById(
                "game"
            );


        if (!gameElement) {
            return;
        }


        gameElement.style.filter =
            "contrast(1.5) brightness(1.3)";


        setTimeout(
            function() {

                gameElement.style.filter =
                    "";

            },
            duration
        );

    }

};


// ==========================================
// GLOBAL HEALTH FUNCTION
// ==========================================

function updatePlayerHealth() {

    UI.updateHealth();

}


// ==========================================
// GLOBAL ROUND ELEMENT
// ==========================================

const roundNumberElement =
    document.getElementById(
        "round-number"
    );


// ==========================================
// DAMAGE EVENT HELPER
// ==========================================

function playerDamageEffect() {

    UI.damageFlash();

    UI.shake(
        3,
        150
    );

}


// ==========================================
// MUTATION EVENT HELPER
// ==========================================

function mutationEffect(
    mutation
) {

    UI.mutationAcquired(
        mutation
    );

}
