/**
 * @fileOverview
 * @name camera.js
 * @author Nova Media LLc
 * @license TBD

 This is our camera class for Bloomaway. It is what the user will see in VR. It uses a THREE.PerspectiveCamera.
 */

import * as THREE from 'three'

/**
 * Handles instantiating a THREE.js camera and hooking it up to the scene
 * @param {THREE.Scene} scene - Scene to mount camera into
 */
class Camera {
    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    constructor(scene: THREE.Scene) {
        this.scene = scene
        this.camera = null // private ; use this.getInstance() getter

        this.init = this.init.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        this.getInstance = this.getInstance.bind(this)

        this.init()
    }
    init() {
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 600)
        this.camera.position.set(0, 0, 0)
        this.camera.lookAt(new THREE.Vector3(-1, 0, 0))
        this.scene.add(this.camera)
    }
    /**
    * Method to call in onWindowResize DOM event to update camera on screen resizes.
    */
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
    }
    /**
    * this.camera getter
    * @returns {THREE.Camera} THREE.js camera instance
    */
    getInstance() {
        return this.camera
    }
}

export default Camera
