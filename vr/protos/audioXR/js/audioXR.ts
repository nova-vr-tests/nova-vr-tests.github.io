/*
  TODO: Currently, in the initTorus method, we initialize both the torus and the spherical visualier. We want to isolate the visalier in a new method initVisualier.

  TODO: isulate visualier in new class to be called form audioXR after initTorus.
*/

import * as THREE from 'three'

import Torus from '../../torus/js/torus'
import Super from '../../engine/super'
import ShaderObject, { Us } from '../../engine/shaderObject'

import './audio.js'
import { visualizerData } from './audio.js'

interface Uniforms {
    'amplitude': {
        value: number,
    },
    'scaleFactor': {
        value: number,
    },
    'texture': {
        value: THREE.Texture,
    }
}

class audioXR extends Super {
    uniforms: Uniforms
    displacement: Float32Array
    geometry: THREE.BufferGeometry
    torus: Torus
    visualizer: ShaderObject

    constructor() {
        //calling Super constructor
        super()

        //initializing attributes
        this.uniforms = null
        this.displacement = null
        this.geometry = null
        this.torus = null

        //bindings
        this.applyDisplacements = this.applyDisplacements.bind(this)
        this.render = this.render.bind(this)
        this.initTorus = this.initTorus.bind(this)
        this.initVisualizer = this.initVisualizer.bind(this)

        this.init()
        super.animate()
    }
    init() {
        super.init()
        this.initTorus()
        this.initVisualizer()
    }
    initVisualizer() {
        const texture = new THREE.TextureLoader().load('audioXR/textures/about-us.png')
        texture.wrapS = texture.wrapT = THREE.MirroredRepeatWrapping
        const uniforms: Us = [
            ['amplitude', 10],
            ['scaleFactor', 1.0],
            ['texture', texture],
        ]

        // setting up the geometry
        this.geometry = new THREE.SphereBufferGeometry(0.1, 32, 32)

        // Deforming plane with displacements
        this.displacement = new Float32Array(this.geometry.attributes.position.count)
        this.applyDisplacements(this.displacement)

        // Creating the mesh
        this.visualizer = new ShaderObject(this.geometry, uniforms, 'vertexshader', 'fragmentshader')
        this.visualizer.addAttribute('displacement', new THREE.BufferAttribute(this.displacement, 1))
        this.visualizer.mesh.position.y = 3
        this.visualizer.mesh.position.x = 3

        // Adding the mesh to our scene
        this.scene.add(this.visualizer.mesh)
    }
    initTorus() {
        // Setup Torus
        this.torus = new Torus(this.scene, this.controls)


        this.torus.createButton(() => {}, {
            position: new THREE.Vector3(-1.5, 0, 0),
            scale: 0.5,
            shape: 'box',
        })
    }
    applyDisplacements(displacement: Float32Array) {
        for (let i = 0; i < displacement.length; i++) {
            if(visualizerData && i % 2 === 0) {
                const x = visualizerData[i % visualizerData.length] / 128
                displacement[i] = 0.2 * Math.pow(x, 2)
            }
        }
    }
    animate() {
        super.animate()
        this.render()
    }
    render() {
        const time = Date.now() * 0.001

        // Rotating and scaling plane wrt time
        this.visualizer.mesh.rotation.z = 0.5 * time
        this.visualizer.mesh.rotation.y = 0.5 * time

        this.applyDisplacements(this.displacement)
        if(this.visualizer.geometry.attributes.displacement instanceof THREE.BufferAttribute) {
            this.visualizer.geometry.attributes.displacement.needsUpdate = true
        }
    }
}

new audioXR()
