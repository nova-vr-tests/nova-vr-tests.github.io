import * as THREE from 'three'

import Camera from './camera'
import Controls, {VRControls} from './controls'
import WebVR from './WebVR.js'

class Super {
    container: HTMLElement
    camera: Camera
    controls: Controls
    scene: THREE.Scene
    renderer: THREE.WebGLRenderer
    light: THREE.HemisphereLight
    constructor() {
        // Initialize attributes
        this.container = null
        this.camera = null
        this.controls = null
        this.scene = null
        this.renderer = null
        this.light = null

        // bindings
        this.init = this.init.bind(this)
        //this.updateScene = this.updateScene.bind(this)
        this.animate = this.animate.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        this.initLight = this.initLight.bind(this)
        this.initScene = this.initScene.bind(this)
        this.initDOM = this.initDOM.bind(this)
        this.initRenderer = this.initRenderer.bind(this)
    }
    init() {
        this.initDOM()
        this.initScene()
        this.initRenderer()
        this.initLight()

        //innitializing camera of bloomaway class
        this.camera = new Camera(this.scene)
        this.controls = new VRControls(this.camera.getInstance(), this.scene, this.renderer)
    }
    initDOM() {
        this.container = document.createElement('div')
        document.body.appendChild(this.container)
        window.addEventListener('resize', this.onWindowResize, false)
    }
    initRenderer() {
        this.renderer = new THREE.WebGLRenderer({ antialias: true })
        console.log(THREE, WebVR)
        document.body.appendChild( WebVR.createButton( this.renderer ) )
        this.renderer.setSize(window.innerWidth, window.innerHeight)

        this.container.appendChild(this.renderer.domElement)
    }
    initScene() {
        this.scene = new THREE.Scene()
    }
    initLight() {
        this.light = new THREE.HemisphereLight(0xbbbbff, 0x444422)
        this.light.position.set(0, 1, 0)
        this.scene.add(this.light)
    }
    onWindowResize() {
        this.camera.onWindowResize()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }
    animate() {
        // requestAnimationFrame(this.animate)
        this.renderer.setAnimationLoop(this.animate)
        this.renderer.render(this.scene, this.camera.getInstance())
        this.controls.update()
    }
}

export default Super
