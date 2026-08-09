// ==========================================
// PROJECT: REPLACEMENT
// BODY.JS
// ==========================================


const BodySystem = {

    selectedPart: null,


    parts: {

        head: {
            element: "body-head",
            name: "HEAD"
        },

        torso: {
            element: "body-torso",
            name: "TORSO"
        },

        leftArm: {
            element: "body-left-arm",
            name: "LEFT ARM"
        },

        rightArm: {
            element: "body-right-arm",
            name: "RIGHT ARM"
        },

        leftLeg: {
            element: "body-left-leg",
            name: "LEFT LEG"
        },

        rightLeg: {
            element: "body-right-leg",
            name: "RIGHT LEG"
        }

    },


    // ======================================
    // INITIALIZE
    // ======================================

    initialize() {

        Object.keys(
            this.parts
        ).forEach(
            partName => {

                const part =
                    this.parts[partName];


                const element =
                    document.getElementById(
                        part.element
                    );


                if (!element) {
                    return;
                }


                element.addEventListener(
                    "click",
                    () => {

                        this.selectPart(
                            partName
                        );

                    }
                );

            }
        );


        this.updateAllParts();

    },


    // ======================================
    // SELECT PART
    // ======================================

    selectPart(partName) {

        if (
            !this.parts[partName]
        ) {

            return;

        }


        this.selectedPart =
            partName;


        const part =
            this.parts[partName];


        const selectedText =
            document.getElementById(
                "selected-part"
            );


        if (selectedText) {

            selectedText.textContent =
                part.name;

        }


        this.updateInformation(
            partName
        );


        this.highlightPart(
            partName
        );

    },


    // ======================================
    // INFORMATION
    // ======================================

    updateInformation(partName) {

        const bodyPart =
            Player.body[partName];


        if (!bodyPart) {
            return;
        }


        const mutation =
            bodyPart.mutation;


        const nameElement =
            document.getElementById(
                "mutation-name"
            );


        const descriptionElement =
            document.getElementById(
                "mutation-description"
            );


        if (!mutation) {

            if (nameElement) {

                nameElement.textContent =
                    "NORMAL";

            }


            if (descriptionElement) {

                descriptionElement.textContent =
                    "No mutation is currently affecting this body part.";

            }


            return;

        }


        if (nameElement) {

            nameElement.textContent =
                mutation.name;

        }


        if (descriptionElement) {

            descriptionElement.textContent =
                mutation.description ||
                "No information available.";

        }

    },


    // ======================================
    // HIGHLIGHT
    // ======================================

    highlightPart(partName) {

        Object.keys(
            this.parts
        ).forEach(
            name => {

                const element =
                    document.getElementById(
                        this.parts[name].element
                    );


                if (element) {

                    element.classList.remove(
                        "selected"
                    );

                }

            }
        );


        const selected =
            document.getElementById(
                this.parts[partName].element
            );


        if (selected) {

            selected.classList.add(
                "selected"
            );

        }

    },


    // ======================================
    // UPDATE ALL
    // ======================================

    updateAllParts() {

        Object.keys(
            this.parts
        ).forEach(
            partName => {

                this.updatePartVisual(
                    partName
                );

            }
        );

    },


    // ======================================
    // UPDATE VISUAL
    // ======================================

    updatePartVisual(partName) {

        const part =
            this.parts[partName];


        if (!part) {
            return;
        }


        const element =
            document.getElementById(
                part.element
            );


        if (!element) {
            return;
        }


        const bodyPart =
            Player.body[partName];


        if (
            !bodyPart ||
            !bodyPart.mutation
        ) {

            element.dataset.mutation =
                "none";

            element.title =
                part.name;

            return;

        }


        const mutation =
            bodyPart.mutation;


        element.dataset.mutation =
            mutation.id;


        element.title =
            mutation.name;

    },


    // ======================================
    // MUTATION ADDED
    // ======================================

    onMutationAdded(mutation) {

        if (!mutation) {
            return;
        }


        this.updateAllParts();

    }

};


// ==========================================
// BODY BUTTONS
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        const bodyButton =
            document.getElementById(
                "body-button"
            );


        const closeBodyButton =
            document.getElementById(
                "close-body"
            );


        const bodyMenu =
            document.getElementById(
                "body-menu"
            );


        if (bodyButton) {

            bodyButton.addEventListener(
                "click",
                function() {

                    bodyMenu.classList.remove(
                        "hidden"
                    );

                    BodySystem.updateAllParts();

                }
            );

        }


        if (closeBodyButton) {

            closeBodyButton.addEventListener(
                "click",
                function() {

                    bodyMenu.classList.add(
                        "hidden"
                    );

                }
            );

        }


        BodySystem.initialize();

    }
);
