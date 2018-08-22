
/**
 * @fileOverview
 * @name camera.js
 * @author Nova Media LLc
 * @license TBD

 TODO:
 - refactor NFL.initSky to ../../engine/super.ts
*/

import * as THREE from 'three'

import Super from '../../engine/super'
import { getObj } from '../../engine/helpers.js'

class InfiniteGallery extends Super {
    walkPath: THREE.CurvePath<THREE.Vector3>
    userPosition: number // in [0, 1]
    isWalkingForward: boolean
    constructor() {
        // Calling Super constructor
        super()

        // Initializing attributes
        this.walkPath = null
        this.userPosition = 0
        this.isWalkingForward = false

        // Function bindings
        this.loadGalleryModels = this.loadGalleryModels.bind(this)
        this.initSky = this.initSky.bind(this)
        this.initMoveControls = this.initMoveControls.bind(this)

        // Init
        this.init()
        super.animate()
    }
    init() {
        super.init()

        this.loadGalleryModels()
        this.initSky()
        this.initMoveControls()
    }
    initMoveControls() {
        type Curve = Array<[number, number, number]>
        const createCurve = (c: Curve) => new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(c[0][0], c[0][1], c[0][2]),
            new THREE.Vector3(c[1][0], c[1][1], c[1][2]),
            new THREE.Vector3(c[2][0], c[2][1], c[2][2])
        )

        const curvePath: Array<Curve> = [
            [
                [-1, 0.176006, 0.017777],
                [-2, 0, 0.033176],
                [20, 20.176008, 0.048574]
            ],
        ]

        this.walkPath = new THREE.CurvePath()
        curvePath.map(c => this.walkPath.add(createCurve(c)))

        document.addEventListener('click', () => {
            this.isWalkingForward = !this.isWalkingForward
        })

        const points = this.walkPath.getPoints(50)
        const geometry = new THREE.BufferGeometry().setFromPoints(points)

        const material = new THREE.LineBasicMaterial({ color: 0xff0000 })

        // Create the final object to add to the scene
        const curveObject = new THREE.Line(geometry, material)
        this.scene.add(curveObject)
    }
    initSky() {
        const scale = 100
        const skyGeometry = new THREE.SphereGeometry(
            scale,
            scale,
            scale
        )

        const loader = new THREE.TextureLoader()
        const onTextureLoad = texture => {
            // in this example we create the material when the texture is loaded
            const material = new THREE.MeshBasicMaterial({
                map: texture
            })

            material.side = THREE.DoubleSide
            const skyMesh = new THREE.Mesh(skyGeometry, material)
            this.scene.add(skyMesh)
        }
        const onError = () => {}
        const onProgress = () => {}

        // load a resource
        loader.load(
            'infinite-gallery/textures/sky.jpg',
            onTextureLoad,
            onProgress,
            onError,
        )


    }
    loadGalleryModels() {
        const cbObj = object => {
            object.name = 'gallery'
            this.scene.add(object)
        }

        const options = {
            position: new THREE.Vector3(0, 2, 0),
        }

        const loadModels = modelNames => modelNames.map(name => getObj('infinite-gallery/obj/gallery', name, cbObj, options))
        loadModels(['FloorIG', 'StructureIG', 'Wallgood1', 'Wallgood8', 'JoinIG'])
    }
    animate() {
        super.animate()
        const currentPos = this.walkPath.getPointAt(this.userPosition % 1)

        if(this.isWalkingForward) {
            this.userPosition += 0.001
        }

        const { x, y, z } = this.walkPath.getPointAt(this.userPosition % 1)
        this.controls.controls.getObject().translateX(currentPos.x - x)
        this.controls.controls.getObject().translateY(currentPos.y - y)
        this.controls.controls.getObject().translateZ(currentPos.z - z)
    }
}

const a = new InfiniteGallery()
console.log(a)
