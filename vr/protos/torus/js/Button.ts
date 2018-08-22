/**
 * @fileOverview
 * @name Button.js
 * @author Nova Media LLC
 * @license TBD

 TODO:
 - allow for positioning button in spherical coords to they all lay on Torus
 - provide for more options
 - allow for other geometries (allow for both THREE.BoxGeometry and THREE.SphereGeometry)
   + don't forget to provide a default value !

 */

import * as THREE from 'three'
import Controls from '../../engine/controls.js'

interface ButtonOptions {
    scale?: number,
    color?: number,
    position?: THREE.Vector3,
    shape?: string,
}

type OnClickCallback = (o: THREE.Mesh) => void

/**
 * Class defining a Torus button
 * @param {THREE.Control} controls - THREE controls objects used for onClick callback
 * @param {function} onClick - Callback to execute on user click
 * @param {dict} _options - Button geometry options
 */
class Button {
    controls: Controls
    button: THREE.Mesh
    options: ButtonOptions
    onClick: OnClickCallback
    constructor(controls: Controls, onClick: OnClickCallback, _options = {}) {
        this.onClick = onClick
        this.controls = controls

        this.init = this.init.bind(this)
        this.initEvents = this.initEvents.bind(this)
        this.initGeometry = this.initGeometry.bind(this)
        this.initOptions = this.initOptions.bind(this)
        this.clickEvent = this.clickEvent.bind(this)
        this.mouseMoveEvent = this.mouseMoveEvent.bind(this)
        this.getInstance = this.getInstance.bind(this)

        this.init(_options)
    }
    init(_options: ButtonOptions) {
        this.initOptions(_options)
        this.initGeometry()
        this.initEvents()
    }
    initOptions(_options: ButtonOptions) {
        // Provide default options
        this.options = {
            scale: _options.scale || 1,
            color: _options.color || 0x00ff00,
            position: _options.position || new THREE.Vector3(0, 0, 0),
            shape: _options.shape || 'box',
        }
    }
    initGeometry() {
        let geometry: THREE.Geometry
        if(this.options.shape === 'sphere' || this.options.shape === 'Sphere'){
        // Apply transformations
            geometry = new THREE.SphereGeometry(
                this.options.scale,
                this.options.scale,
                this.options.scale
            )
        }

        else{
        // Apply transformations
            geometry = new THREE.BoxGeometry(
                this.options.scale,
                this.options.scale,
                this.options.scale
            )
        }
        const material = new THREE.MeshBasicMaterial({ color: this.options.color })
        this.button = new THREE.Mesh(geometry, material)
        this.button.position.x = this.options.position.x
        this.button.position.y = this.options.position.y
        this.button.position.z = this.options.position.z
    }
    initEvents() {
        document.addEventListener('click', this.clickEvent)
        document.addEventListener('mousemove', this.mouseMoveEvent)
    }
    clickEvent() {
        // Check for camera view / button intersection on user click
        if(this.controls.intersectObject(this.button).length) {
            this.onClick(this.button)
        }
    }
    mouseMoveEvent() {
        const { scale } = this.options

        if(this.controls.intersectObject(this.button).length) {
            this.button.scale.x = scale * 2
            this.button.scale.y = scale * 2
            this.button.scale.z = scale * 2
        } else {
            this.button.scale.x = scale
            this.button.scale.y = scale
            this.button.scale.z = scale
        }
    }
    getInstance() {
        return this.button // returns a THREE.mesh object
    }
}

export default Button
export {
    ButtonOptions,
    OnClickCallback,
}
