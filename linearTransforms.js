/**
 * Rotates a shape about its CG around Z
 * @param {number} alpha Rotation angle in degrees
 * @param {number[]} CG CG coordinated relative to global coords
 * @return {object[]} resulting transformations
 */
const localRotateZ = (alpha, CG) => {
    const alphaRad = alpha * Math.PI / 180;

    // Rotated CG coords
    const coordRotatedCG = [0,0,0]; // initialization
    coordRotatedCG[0] = CG[0] * Math.cos(alphaRad) - CG[1] * Math.sin(alphaRad);
    coordRotatedCG[1] = CG[1] * Math.cos(alphaRad) + CG[0] * Math.sin(alphaRad);

    // Vector from rotated CG to initial CG
    return [
        {translate: coordRotatedCG.map((e,i) => CG[i] - e)}, // Rotated CG to origin
        {rotateZ: alpha},
        {scale: 1},
    ];
};

/**
 * Scales a shape about its CG
 * @param {number} scaleFactor Scale factor
 * @param {number[]} CG CG coordinated relative to global coords
 * @return {object[]} resulting transformations
 */
const localScale = (scaleFactor, CG) => [
    {translate: CG.map(e => e*(1-scaleFactor))},
    {rotateZ: 0},
    {scale: scaleFactor},
];

/**
 * Translates an to a point on a paramterized line
 * @param {number} point Point line goes through
 * @param {number[]} vect Line direction vector
 * @param {number} t parameter value
 * @return {object[]} resulting transformations
 */
const translateThruLine = (point, vect, t) => [
    {translate: vect.map((e,i) => point[i] + e * t)},
    {rotateZ: 0},
    {scale: 1},
];

/**
 * Adds transforms together
 * @param {Array.<object[]>} transforms Transforms to add
 * @return {object[]} Added transforms
 */
const addTransforms = (transforms) => {
    // Initializing final transform structure
    let final = [
        {translate: [0,0,0]},
        {rotateZ: 0},
        {scale: 1},
    ];


    for (const i in transforms) {
        const transform = transforms[i];
        final[0].translate = final[0].translate.map((e, j) => e + transform[0].translate[j]);
        final[1].rotateZ += transform[1].rotateZ;
        final[2].scale *= transform[2].scale;
    }


    return final;
}

export {
    addTransforms,
    localRotateZ,
    localScale,
    translateThruLine,
};