/**
 * @fileOverview
 * @name torus.js
 * @author Nova Media LLC
 * @license TBD

 This class defines the Torus, our UI for VR applications. So far, it handles mounting the Torus interface (map, ground, and shell) and provides an API for creating basic buttons that respond to clicks

 */

import * as THREE from 'three'
import Button, {
    ButtonOptions,
    OnClickCallback,
} from './Button'
import {
    getObj,
} from '../../engine/helpers.js'
import Controls from '../../engine/controls'

interface TorusModels {
    buttons: Array<Button>,
}

/**
 * Handles instantiating a Torus UI
 * @param {THREE.scene} scene - Scene to mount Torus into
 * @param {Controls} controls - Controls to bind button clicks to
 */
class Torus {
    scene: THREE.Scene
    controls: Controls
    torus: TorusModels
    constructor(scene, controls) {
        this.scene = scene
        this.controls = controls
        this.torus = {
            buttons: [],
        }

        this.init = this.init.bind(this)
        this.createButton = this.createButton.bind(this)

        this.init()
    }
    /**
    * Initialized the Torus by importing its geometry and mounting it into the scene
    */
    init() {
        const cb = (attrName: string) => (object: THREE.Object3D) => {
            this.scene.add(object)
            const d = {
                geometry: object
            }
            this.torus[attrName] = d
        }
        const getOptions = s => ({
            scale: {x: s, y: s, z: s},
        })

        const s = 20
        const A: Array<[string, string, (a: any) => any, any]> = [
            ['torus/obj', 'map/map', cb('map'), getOptions(s)],
            ['torus/obj', 'ground/ground', cb('ground'), getOptions(s)],
            ['torus/obj', 'shell/shell', cb('shell'), getOptions(0)],
        ]

        A.map(e => getObj(e[0], e[1], e[2], e[3]))

        getObj('torus/obj', 'shell/shell', cb('shell'), getOptions(0))
    }
    /**
    * Creates a button on the Torus
    * @param {funciton} onClick - Callback to be called when button is clicked
    * @param {dict} _options - Button options
    */
    createButton(
        onClick: OnClickCallback,
        _options: ButtonOptions
    ) {
        const button = new Button(this.controls, onClick, _options)

        // Add to scene and keep reference
        this.scene.add(button.getInstance())
        this.torus.buttons.push(button)
    }
}

export default Torus
