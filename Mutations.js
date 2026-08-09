// ==========================================
// PROJECT: REPLACEMENT
// MUTATIONS.JS
// ==========================================


// ==========================================
// MUTATION DATABASE
// ==========================================

const MUTATIONS = {

    // ======================================
    // ARMS
    // ======================================

    boneBlade: {
        id: "boneBlade",
        name: "BONE BLADE",
        bodyPart: "leftArm",
        description: "The arm has hardened into a sharp biological blade.",
        type: "weapon",
        damage: 20,
        range: 45,
        cooldown: 350
    },

    clawArm: {
        id: "clawArm",
        name: "CLAW ARM",
        bodyPart: "leftArm",
        description: "The fingers have fused into a powerful set of claws.",
        type: "weapon",
        damage: 12,
        range: 35,
        cooldown: 180
    },

    tendrilArm: {
        id: "tendrilArm",
        name: "TENDRIL ARM",
        bodyPart: "leftArm",
        description: "The arm has become a flexible tendril capable of reaching distant targets.",
        type: "weapon",
        damage: 8,
        range: 120,
        cooldown: 600
    },

    gunHand: {
        id: "gunHand",
        name: "GUN HAND",
        bodyPart: "rightArm",
        description: "The hand has transformed into an organic firearm.",
        type: "weapon",
        damage: 25,
        range: 300,
        cooldown: 500,
        ammunition: 12,
        maxAmmunition: 12
    },

    shotgunArm: {
        id: "shotgunArm",
        name: "SHOTGUN ARM",
        bodyPart: "rightArm",
        description: "The arm has transformed into a biological close-range weapon.",
        type: "weapon",
        damage: 45,
        range: 140,
        cooldown: 900,
        ammunition: 6,
        maxAmmunition: 6
    },

    boneCannon: {
        id: "boneCannon",
        name: "BONE CANNON",
        bodyPart: "rightArm",
        description: "A dense biological structure has formed around the arm, creating a powerful cannon.",
        type: "weapon",
        damage: 70,
        range: 400,
        cooldown: 1400,
        ammunition: 3,
        maxAmmunition: 3
    },


    // ======================================
    // HEAD
    // ======================================

    headPlant: {
        id: "headPlant",
        name: "HEAD PLANT",
        bodyPart: "head",
        description: "A strange plant has begun growing directly from the head.",
        type: "growth",
        evolutionLevel: 1,
        maxEvolution: 4
    },

    extraEye: {
        id: "extraEye",
        name: "EXTRA EYE",
        bodyPart: "head",
        description: "A new eye has developed on the body. It can detect things the normal eyes cannot.",
        type: "utility"
    },

    backEye: {
        id: "backEye",
        name: "BACK EYE",
        bodyPart: "head",
        description: "An eye has developed on the back of the head.",
        type: "utility"
    },

    secondMouth: {
        id: "secondMouth",
        name: "SECOND MOUTH",
        bodyPart: "head",
        description: "A second mouth has appeared where no mouth should exist.",
        type: "utility"
    },

    needleTeeth: {
        id: "needleTeeth",
        name: "NEEDLE TEETH",
        bodyPart: "head",
        description: "The teeth have become long and unnaturally sharp.",
        type: "weapon",
        damage: 15,
        range: 30,
        cooldown: 250
    },

    secondRowTeeth: {
        id: "secondRowTeeth",
        name: "SECOND ROW",
        bodyPart: "head",
        description: "A second row of teeth has grown behind the first.",
        type: "weapon",
        damage: 25,
        range: 35,
        cooldown: 350
    },

    jawExtension: {
        id: "jawExtension",
        name: "JAW EXTENSION",
        bodyPart: "head",
        description: "The jaw has developed an unnatural range of motion.",
        type: "weapon",
        damage: 40,
        range: 50,
        cooldown: 700
    },

    tongueTendril: {
        id: "tongueTendril",
        name: "TONGUE TENDRIL",
        bodyPart: "head",
        description: "The tongue has transformed into a long, controllable tendril.",
        type: "utility",
        range: 150
    },

    hookTongue: {
        id: "hookTongue",
        name: "HOOK TONGUE",
        bodyPart: "head",
        description: "The tongue has developed a hooked tip capable of grabbing distant targets.",
        type: "utility",
        range: 180
    },

    toothLauncher: {
        id: "toothLauncher",
        name: "TOOTH LAUNCHER",
        bodyPart: "head",
        description: "Some teeth can detach and launch themselves as projectiles.",
        type: "weapon",
        damage: 18,
        range: 350,
        cooldown: 450,
        ammunition: 8,
        maxAmmunition: 8
    },


    // ======================================
    // FINGERS / HANDS
    // ======================================

    fingerClaws: {
        id: "fingerClaws",
        name: "FINGER CLAWS",
        bodyPart: "rightArm",
        description: "The fingers have developed long biological claws.",
        type: "weapon",
        damage: 10,
        range: 35,
        cooldown: 150
    },

    extraFingers: {
        id: "extraFingers",
        name: "EXTRA FINGERS",
        bodyPart: "rightArm",
        description: "Additional fingers have developed across the hand.",
        type: "utility"
    },

    fingerTendrils: {
        id: "fingerTendrils",
        name: "FINGER TENDRILS",
        bodyPart: "rightArm",
        description: "The fingers have become thin, flexible tendrils.",
        type: "utility",
        range: 90
    },

    fingerEyes: {
        id: "fingerEyes",
        name: "FINGER EYES",
        bodyPart: "rightArm",
        description: "Tiny eyes have developed across the fingertips.",
        type: "utility"
    },

    fingerMouths: {
        id: "fingerMouths",
        name: "FINGER MOUTHS",
        bodyPart: "rightArm",
        description: "Each fingertip has developed a tiny mouth.",
        type: "weapon",
        damage: 4,
        range: 30,
        cooldown: 80
    },


    // ======================================
    // TORSO
    // ======================================

    organicArmor: {
        id: "organicArmor",
        name: "ORGANIC ARMOR",
        bodyPart: "torso",
        description: "Dense biological material has grown over the torso.",
        type: "defense",
        defense: 20
    },

    extraHeart: {
        id: "extraHeart",
        name: "EXTRA HEART",
        bodyPart: "torso",
        description: "A second heart has developed inside the body.",
        type: "health",
        maxHealthBonus: 25
    },

    parasiteCore: {
        id: "parasiteCore",
        name: "PARASITE CORE",
        bodyPart: "torso",
        description: "Something living has attached itself inside the torso.",
        type: "mutation",
        mutationEnergyBonus: 20
    },


    // ======================================
    // LEGS
    // ======================================

    mutatedLeg: {
        id: "mutatedLeg",
        name: "MUTATED LEG",
        bodyPart: "leftLeg",
        description: "One leg has developed significantly stronger muscles.",
        type: "movement",
        speedBonus: 0.8
    },

    tendrilLeg: {
        id: "tendrilLeg",
        name: "TENDRIL LEG",
        bodyPart: "leftLeg",
        description: "The leg has transformed into a flexible biological limb.",
        type: "movement",
        speedBonus: 0.4
    },

    burrowingLeg: {
        id: "burrowingLeg",
        name: "BURROWING LEG",
        bodyPart: "rightLeg",
        description: "The leg has developed structures capable of digging through organic material.",
        type: "utility"
    },


    // ======================================
    // BACK / EXTRA LIMBS
    // ======================================

    backTendril: {
        id: "backTendril",
        name: "BACK TENDRIL",
        bodyPart: "torso",
        description: "A long tendril has grown from the back.",
        type: "weapon",
        damage: 8,
        range: 100,
        cooldown: 600,
        automatic: true
    },

    extraArm: {
        id: "extraArm",
        name: "EXTRA ARM",
        bodyPart: "torso",
        description: "A third arm has grown from the torso.",
        type: "limb"
    },

    spiderLimbs: {
        id: "spiderLimbs",
        name: "SPIDER LIMBS",
        bodyPart: "torso",
        description: "Several thin limbs have emerged from the back.",
        type: "movement",
        speedBonus: 1
    },

    spineTail: {
        id: "spineTail",
        name: "SPINE TAIL",
        bodyPart: "torso",
        description: "The spine has extended outside the body and formed a controllable tail.",
        type: "weapon",
        damage: 15,
        range: 80,
        cooldown: 500
    },

    crawlingHand: {
        id: "crawlingHand",
        name: "CRAWLING HAND",
        bodyPart: "torso",
        description: "A strange hand has developed on a biological stalk.",
        type: "utility"
    },


    // ======================================
    // PLANT / FUNGAL
    // ======================================

    vineArm: {
        id: "vineArm",
        name: "VINE ARM",
        bodyPart: "leftArm",
        description: "Vines have grown around the arm and can extend outward.",
        type: "weapon",
        damage: 7,
        range: 130,
        cooldown: 500
    },

    thornSkin: {
        id: "thornSkin",
        name: "THORN SKIN",
        bodyPart: "torso",
        description: "Small thorns have begun growing across the body.",
        type: "defense",
        contactDamage: 8
    },

    mushroomGrowth: {
        id: "mushroomGrowth",
        name: "MUSHROOM GROWTH",
        bodyPart: "torso",
        description: "Fungal growths have begun spreading across the body.",
        type: "mutation",
        mutationEnergyBonus: 10,
        evolutionLevel: 1,
        maxEvolution: 4
    },

    seedLauncher: {
        id: "seedLauncher",
        name: "SEED LAUNCHER",
        bodyPart: "rightArm",
        description: "A plant-like structure launches seeds that grow into temporary organisms.",
        type: "weapon",
        damage: 12,
        range: 250,
        cooldown: 800
    }

};


// ==========================================
// GET ALL MUTATIONS
// ==========================================

function getAllMutations() {

    return Object.values(
        MUTATIONS
    );

}


// ==========================================
// GET MUTATION BY ID
// ==========================================

function getMutationByID(
    id
) {

    return MUTATIONS[id] || null;

}


// ==========================================
// RANDOM MUTATION CHOICES
// ==========================================

function getRandomMutationChoices(
    amount = 3
) {

    const mutations =
        getAllMutations();


    const choices = [];


    while (
        choices.length < amount &&
        mutations.length > 0
    ) {

        const randomIndex =
            Math.floor(
                Math.random() *
                mutations.length
            );


        const mutation =
            mutations.splice(
                randomIndex,
                1
            )[0];


        choices.push(
            mutation
        );

    }


    return choices;

}


// ==========================================
// CHECK IF MUTATION EXISTS
// ==========================================

function mutationExists(
    id
) {

    return Boolean(
        MUTATIONS[id]
    );

      }
