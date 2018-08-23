/**
 * @fileOverview
 * @name controls.js
 * @author Nova Media LLc
 * @license TBD
 This is our user controls class for Bloomaway. It is how the user will control the camera. It currently uses a THREE.PointerLockControls instance binded to the camera to control it. Click the canvas to activate controls.
 Use arrow keys or A, S, D, W to move around and use the mouse to look around. They're basically FPS controls for now.
 This class provides a callback Controls.update() tho be called in the main render loop (Bloomaway.animate()) to update the camera
 TODO:
 - handle moving up and down with current controls
   + modify the direction vector in Controls.update to move in the axis of the camera.
 - Hook it up with VR inputs (match headset positioning and track controllers)
*/

import * as THREE from 'three'
import PointerLockControls from '../THREE/PointerLockControls.js'
import { getObj } from './helpers.js'

/**
 * Handles instantiating a THREE.PointerLockControls instance and hooking it up to the scene, camera, and DOM events
 * @param {THREE.Camera} camera - Camera to attach controls to
 * @param {THREE.Scene} scene - Scene to mount controls into
 */
class Controls {
    controls: PointerLockControls
    raycaster: THREE.Raycaster
    camera: THREE.Camera
    scene: THREE.Scene
    controlsEnabled: boolean
    moveForward: boolean
    moveBackward: boolean
    moveLeft: boolean
    moveRight: boolean
    moveUp: boolean
    moveDown: boolean
    canJump: boolean
    prevTime: number
    velocity: THREE.Vector3
    direction: THREE.Vector3
    constructor(camera, scene) {
        this.controls = null
        this.raycaster = null
        this.camera = camera
        this.scene = scene

        this.controlsEnabled = true

        this.moveForward = false
        this.moveBackward = false
        this.moveLeft = false
        this.moveRight = false
        this.moveUp = false
        this.moveDown = false
        this.canJump = false

        this.prevTime = performance.now()
        this.velocity = new THREE.Vector3()
        this.direction = new THREE.Vector3()

        this.init = this.init.bind(this)
        this.initDOM = this.initDOM.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.intersectObject = this.intersectObject.bind(this)
        this.onKeyUp = this.onKeyUp.bind(this)
        this.getDistanceFrom = this.getDistanceFrom.bind(this)

        this.init()
    }
    init() {
        this.controls = new PointerLockControls(this.camera)
        this.scene.add(this.controls.getObject())
        this.controls.getObject().position.y = 0
        this.raycaster = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, - 1, 0))
        this.initDOM()
    }
    /**
    * Handles DOM event listeners. It binds and unbinds events by clicking or pressing escape respectively.
    */
    initDOM() {
        const element = document.body

        /* Mouse Events */
        const pointerlockchange = () => {
            if (document.pointerLockElement === element) {
                this.controlsEnabled = true
                this.controls.enabled = true
            } else {
                this.controls.enabled = false
                this.controlsEnabled = false
            }
        }

        // Hook pointer lock state change events
        document.addEventListener('pointerlockchange', pointerlockchange, false)

        // element.addEventListener('click', () => {
        //     // Ask the browser to lock the pointer
        //     element.requestPointerLock = element.requestPointerLock
        //     element.requestPointerLock()
        // }, false)

        /* KeyboardEvents */
        document.addEventListener('keydown', this.onKeyDown, false)
        document.addEventListener('keyup', this.onKeyUp, false)
    }
    /**
    * onKeyDown DOM event callback
    * @param {KeyboardEvent} event - event.keyCode contains information relative to keyboard key that was pressed
    */
    onKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 38: // up
            case 87: // w
                this.moveForward = true
                break
            case 37: // left
            case 65: // a
                this.moveLeft = true
                break
            case 40: // down
            case 83: // s
                this.moveBackward = true
                break
            case 39: // right
            case 68: // d
                this.moveRight = true
                break
            case 82: // R
                this.moveUp = true
                //camera.translateY(1.0)
                break
            case 70: // F
                this.moveDown = true
                //camera.translateY(-1.0)
                break
            case 32: // space
                if (this.canJump === true)
                    this.velocity.y += 100

                this.canJump = false
                break
        }
    }
    /**
     * onKeyUp DOM event callback
     * @param {KeyboardEvent} event - event.keyCode contains information relative to keyboard key that was released
     */
    onKeyUp(event: KeyboardEvent) {
        switch( event.keyCode ) {
            case 38: // up
            case 87: // W
                this.moveForward = false
                break
            case 37: // left
            case 65: // A
                this.moveLeft = false
                break
            case 40: // down
            case 83: // S
                this.moveBackward = false
                break
            case 39: // right
            case 68: // D
                this.moveRight = false
                break
            case 82: // Q
                this.moveUp = false
                break
            case 70: // E
                this.moveDown = false
                break
        }
    }
    /**
        * Checks if camera view intersects a 3D object
        * @param {THREE.Object3D} object - Object to check for intersection against
        * @param {boolean} recursive - Should search be recursive
        * @returns {Array<TREE.Intersection>} Array of intersected objects
    */
    intersectObject(object: THREE.Object3D, recursive = false): Array<THREE.Intersection> {
        this.raycaster.ray.origin.copy(this.controls.getObject().position)
        this.raycaster.setFromCamera(new THREE.Vector2(0, 0), this.camera)
        return this.raycaster.intersectObjects([object], recursive)
    }
    getDistanceFrom(object: THREE.Object3D): number {
        const userPosition = this.controls.getObject().position
        return Math.sqrt(
            Math.pow(userPosition.x - object.position.x, 2) +
            Math.pow(userPosition.y - object.position.y, 2) +
            Math.pow(userPosition.z - object.position.z, 2)
        )
    }
    /**
     * Callback to be called in Bloomaway render loop
     */
    update() {
        if (this.controlsEnabled === true) {
            const time = performance.now()
            const delta = (time - this.prevTime) / 1000

            this.velocity.x -= this.velocity.x * 10.0 * delta
            this.velocity.z -= this.velocity.z * 10.0 * delta
            this.velocity.y -= this.velocity.y * 10.0 * delta // 100.0 = mass
            this.direction.z = Number(this.moveForward) - Number(this.moveBackward)
            this.direction.x = Number(this.moveLeft) - Number(this.moveRight)
            this.direction.y = Number(this.moveDown) - Number(this.moveUp)
            this.direction.normalize() // this ensures consistent movements in all directions

            if (this.moveForward || this.moveBackward) this.velocity.z -= this.direction.z * 100.0 * delta
            if (this.moveLeft || this.moveRight) this.velocity.x -= this.direction.x * 100.0 * delta
            if (this.moveDown || this.moveUp) this.velocity.y -= this.direction.y * 100.0 * delta

            this.controls.getObject().translateX(this.velocity.x * delta)
            this.controls.getObject().translateY(this.velocity.y * delta)
            this.controls.getObject().translateZ(this.velocity.z * delta)

            if (this.controls.getObject().position.y < 0) {
                this.velocity.y = 0
                this.controls.getObject().position.y = 0
                this.canJump = true
            }
            this.prevTime = time
        }
    }
}

class VRControls extends Controls {
    renderer: THREE.WebGLRenderer
    controller1: THREE.Group
    constructor(camera, scene, renderer) {
        super(camera, scene)

        this.renderer = renderer
        this.renderer.vr.enabled = true

        this.onPointerRestricted = this.onPointerRestricted.bind(this)
        this.onPointerUnrestricted = this.onPointerUnrestricted.bind(this)

				window.addEventListener(
            'vrdisplaypointerrestricted',
            this.onPointerRestricted,
            false,
        )
				window.addEventListener(
            'vrdisplaypointerunrestricted',
            this.onPointerUnrestricted,
            false,
        )

        // controllers
        this.controller1 = this.renderer.vr.getController(0)
        this.controller1.addEventListener('selectstart', () => console.log('start'))
				this.controller1.addEventListener('selectend', () => console.log('end'))
        this.scene.add(this.controller1)

        getObj('./engine/obj', 'handle', obj => {
					  this.controller1.add(obj);
        }, {})
    }
    onPointerRestricted() {
        console.log(this, this.renderer)
				var pointerLockElement = this.renderer.domElement
				if (pointerLockElement && typeof(pointerLockElement.requestPointerLock) === 'function') {
					  pointerLockElement.requestPointerLock()
				}
		}
		onPointerUnrestricted() {
				var currentPointerLockElement = document.pointerLockElement
				var expectedPointerLockElement = this.renderer.domElement
				if (currentPointerLockElement
            && currentPointerLockElement === expectedPointerLockElement
            && typeof(document.exitPointerLock) === 'function')
        {
					  document.exitPointerLock()
				}
		}
    update() {
    }
}

export default Controls

export {
    VRControls,
}
