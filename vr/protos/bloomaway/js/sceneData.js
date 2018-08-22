/**
 * @fileOverview
 * @name sceneData.js
 * @author Nova Media LLC
 * @license TBD

 This file contains a description of Bloomaway scenes so they are easily importable from a Bloomaway object
 */
let s

// King
s = 2
const king = {
    name: 'king/scene',
    format: 'gltf',
    options: {
        scale: {
            x: s,
            y: s,
            z: s,
        },
        position: {
            x: 4,
            y: 0,
            z: -15
        },
    },
}

// Archi
s = 0.1
const archi = {
    name: 'archi/scene',
    format: 'gltf',
    options: {
        scale: {
            x: s,
            y: s,
            z: s,
        },
        position: {
            x: -100,
            y: -10,
            z: 10
        },
    },
}

// Museum photogrammetry
s = 2
const museum = {
    name: 'museum/scene',
    format: 'gltf',
    options: {
        scale: {
            x: s,
            y: s,
            z: s,
        },
        position: {
            x: 0,
            y: 1,
            z: 9
        },
    },
}

// bedroom1
s = 0.2
const bedroom1 = {
    name: 'bedroom1/scene',
    format: 'gltf',
    options: {
        scale: {
            x: s,
            y: s,
            z: s,
        },
        position: {
            x: -4,
            y: 1,
            z: -7
        },
    },
}

// university
s = 0.2
const nye = {
    name: 'uni/scene',
    format: 'gltf',
    options: {
        scale: {
            x: s,
            y: s,
            z: s,
        },
        position: {
            x: 0,
            y: -10,
            z: 0
        },
    },
}

// mall
s = 2
const mall = {
    name: 'mall/mall',
    format: 'obj',
    options: {
        scale: {
            x: s,
            y: s,
            z: s,
        },
        position: {
            x: 47,
            y: 28.4,
            z: 2
        },
    },
}

// mall
s = 0.1
const stadium = {
    name: 'stadium/scene',
    format: 'gltf',
    options: {
        scale: {
            x: s,
            y: s,
            z: s,
        },
        position: {
            x: 0,
            y: -23,
            z: 0
        },
    },
}

export {
    stadium,
    king,
    archi,
    museum,
    bedroom1,
    nye,
    mall,
}
