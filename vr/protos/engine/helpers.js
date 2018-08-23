/**
 * @fileOverview
 * @name helpers.js
 * @author Nova Media LLC
 * @license TBD

 This file groups general helpers useful to Bloomaway specific code. They abstract away some of the more complex aspects on THREE.js such as importing 3D models and their textures from various file formats.
 */

import * as THREE from "three";
import "../THREE/PointerLockControls.js";
import "../THREE/GLTFLoader.js";
import "../THREE/OBJLoader.js";
import "../THREE/MTLLoader.js";

// Defaults
const defaultCb = a => {};
const defaultOnProgress = defaultCb;
const defaultOnError = () => {};
/**
 * Default import options. It includes transformation options to apply to the imported model
 */
const defaultOptions = {
  onError: defaultOnError,
  onProgress: defaultOnProgress,
  position: {
    x: 0,
    y: 0,
    z: 0,
  },
  scale: {
    x: 1,
    y: 1,
    z: 1,
  },
  rotation: {
    axis: new THREE.Vector3(1, 0, 0),
    angle: 0,
  },
};

/**
 * Prepares options dictionary for importing 3D models. It allows for the import helpers to be called with partial options as parameters. Thanks to this function, it's easy to call getObj() with only scaling options and fallbacking to the defaultOptions dictionary for everything else.
 * @param {dict} options - options to override defaultOptions with
 */
const prepareOptions = options => {
  let _options;

  if (options)
    _options = {
      ...defaultOptions,
      ...options,
    };
  else _options = defaultOptions;

  return _options;
};

/**
 * Imports an OBJ and MTL defined model.
 * @param {string} name - name of obj/mtl pair to look up
 * @param {function} callback - called after loading and application of 3D transforms of the imported model. Passes loaded object as argument.
 * @param {dict} _options - other options. See defaultOptions
 */
const getObj = (path, name, callback = defaultCb, _options) => {
  const options = prepareOptions(_options);

  new THREE.MTLLoader().setPath(path + "/").load(name + ".mtl", materials => {
    materials.preload();
    new THREE.OBJLoader()
      .setMaterials(materials)
      .setPath(path + "/")
      .load(
        name + ".obj",
        object => {
          // Position model
          object.position.x = options.position.x;
          object.position.y = options.position.y;
          object.position.z = options.position.z;

          // Scale model
          object.scale.set(options.scale.x, options.scale.y, options.scale.z);

          // Pass object to user callback
          callback(object);
        },
        options.onProgress,
        options.onError,
      );
  });
};

/**
 * Imports a GLTF defined model.
 * @param {string} name - name of obj/mtl pair to look up
 * @param {function} callback - called after loading and application of 3D transforms of the imported model. Passes loaded object as argument.
 * @param {dict} _options - other options. See defaultOptions
 */
const getGltf = (path, name, cb = defaultCb, _options) => {
  const options = prepareOptions(_options);

  const loader = new THREE.GLTFLoader();
  loader.load(path + "/" + name + ".gltf", gltf => {
    // Position model
    gltf.scene.position.x = options.position.x;
    gltf.scene.position.y = options.position.y;
    gltf.scene.position.z = options.position.z;

    // Scale model
    gltf.scene.scale.set(options.scale.x, options.scale.y, options.scale.z);

    // Rotate model
    gltf.scene.rotateOnAxis(options.rotation.axis, options.rotation.angle);

    // Pass object to user callback
    cb(gltf);
  });
};

export {getGltf, getObj};
