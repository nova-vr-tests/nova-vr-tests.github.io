/**
 * @fileOverview
 * @name bloomaway.js
 * @author Nova Media LLC
 * @license TBD

 This is the main Bloomaway class.

 It handles instantiating a camera and its controls, a scene, the Torus, and mounts everything into the DOM with a render loop.

 TODO:
 - Take scenes as class parameter
 - Make a sky for outside scene. It's currently all black
 */

import * as THREE from 'three'

import * as scenes from './sceneData.js'
import {
    getGltf,
    getObj,
} from '../../engine/helpers.js'
import Torus from '../../torus/js/torus'
import Super from '../../engine/super'

class Bloomaway extends Super {
    torus: Torus
    constructor() {
        // Calling super constructor
        super()

        // Initialize attributes
        this.torus = null

        // Bind functions
        this.initTorus = this.initTorus.bind(this)
        this.updateScene = this.updateScene.bind(this)

        // Run
        this.init()
        super.animate()
    }
    init() {
        // Calling super init method
        super.init()

        this.initTorus()
    }
    initScene() {
        super.initScene()

        this.updateScene('stadium')
    }
    /**
    * Instantiates a Torus and creates buttons allowing for changing scenes
    */
    initTorus() {
        this.torus = new Torus(this.scene, this.controls)

        this.torus.createButton(() => this.updateScene('bedroom1'), {
            position: new THREE.Vector3(-1.5, 0, 0),
            scale: 0.5,
            shape: 'box',
        })

        this.torus.createButton(() => this.updateScene('king'), {
            position: new THREE.Vector3(-1.5, 1, 0),
            scale: 0.5,
            color: 0xff0000,
            shape: 'sphere',
        })

        this.torus.createButton(() => this.updateScene('mall'), {
            position: new THREE.Vector3(-1, 1, 1),
            scale: 0.5,
            color: 0x0000ff,
        })
    }
    /**
    * Handles importing scenes defined in sceneData.js, it takes care of importing both GLTF and OBJ scene formats
    * TODO: optimize this function
    * @param {string} sceneName - Name of scene to import
    */
    updateScene(sceneName: string) {
        var selectedObject = this.scene.getObjectByName('scene')
        this.scene.remove(selectedObject)

        const cbGltf = gltf => {
            gltf.scene.name = 'scene'
            this.scene.add(gltf.scene)
        }

        const cbObj = object => {
            object.name = 'scene'
            this.scene.add(object)
        }

        const scene = scenes[sceneName]
        if(scene.format === 'gltf')
            getGltf('bloomaway/gltf', scene.name, cbGltf, scene.options)
        else
            getObj('bloomaway/obj', scene.name, cbObj, scene.options)
    }
}

new Bloomaway()
