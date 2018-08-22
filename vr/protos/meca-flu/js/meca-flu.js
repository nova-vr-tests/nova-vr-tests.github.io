class mecaflu{
    constructor(){
        this.renderer= null
        this.scene = null
        this.camera = null
        this.uniforms = null
        this. plane = null
        this.displacement = null
        this.meshLengthSegments = null
        this.meshWidthSegments = null

        this.init = this.init.bind(this)
        this.animate = this.animate.bind(this)
        this.change_uvs = this.change_uvs.bind(this)
        this.applyDisplacements = this.applyDisplacements.bind(this)
        this.onWindowResize = this.onWindowResize.bind(this)
        this.render = this.render.bind(this)
        this.init()
        this.animate()
    }

    // Function to change uv mapping
    change_uvs(geometry, unitx, unity, offsetx, offsety) {
        const uvs = geometry.attributes.uv.array
        for (let i = 0; i < uvs.length; i += 2) {
            uvs[i] = (uvs[i] + offsetx) * unitx
            uvs[i + 1] = (uvs[i + 1] + offsety) * unity
        }
    }

    // Displaces calculates displacements for each vertices of a mesh
    applyDisplacements(displacement) {
        let x = null
        let y = null
        const alpha = 0.5
        const beta = alpha
        for (let i = 0; i < displacement.length; i++) {
            x = i / this.meshWidthSegments
            y = i % this.meshWidthSegments
            displacement[i] = 2 * Math.sin(alpha * x) * Math.sin(beta * y)
        }
    }

    init() {
        // Camera setup
        this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000)
        this.camera.position.z = 30
        this.camera.position.x = 5

        // Scene setup
        this.scene = new THREE.Scene()

        // Shader variables setup
        this.uniforms = {
            amplitude: {
                value: 10,
            },
            scaleFactor: {
                value: 1.0,
            },
            texture: {
                value: new THREE.TextureLoader().load('meca-flu/textures/about-us.png'),
            }
        }
        this.uniforms.texture.value.wrapS = this.uniforms.texture.value.wrapT = THREE.MirroredRepeatWrapping
        const shaderMaterial = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: document.getElementById('vertexshader').textContent,
            fragmentShader: document.getElementById('fragmentshader').textContent,
        })

        // setting up the geometry
        // play with controls on: https://threejs.org/docs/#api/geometries/PlaneBufferGeometry
        this.meshLengthSegments = 100
        this.meshWidthSegments =this.meshLengthSegments
        let meshWidth = 50
        let meshLength = meshWidth
        this.geometry = new THREE.PlaneBufferGeometry(meshLength, meshWidth, this.meshLengthSegments,this.meshWidthSegments)

        // Changing uv mapping of current geometry
        this.change_uvs(this.geometry, 1, 1, 0, 0)

        // Deforming plane with displacements
        this.displacement = new Float32Array(this.geometry.attributes.position.count)
        this.applyDisplacements(this.displacement)

        // Setting up the shaders' attributes
        this.geometry.addAttribute('displacement', new THREE.BufferAttribute(this.displacement, 1))

        // Creating the mesh
        this.plane = new THREE.Mesh(this.geometry, shaderMaterial)

        // Adding the mesh to our scene
        this.scene.add(this.plane)

        // Rendering
        this.renderer = new THREE.WebGLRenderer()
        this.renderer.setPixelRatio(window.devicePixelRatio)
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        const container = document.getElementById('container')
        container.appendChild(this.renderer.domElement)

        // Event listeneres
        window.addEventListener('resize', this.onWindowResize, false)
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    animate() {
        requestAnimationFrame(this.animate)
        this.render()
    }

    render() {
        const time = Date.now() * 0.0001

        // Rotating and scaling plane wrt time
        this.plane.rotation.z = 0.5 * time
        this.uniforms.scaleFactor.value = 0.5 * Math.sin(time)

        // Render
        this. renderer.render(this.scene, this.camera)
    }
}

window.mecaflu = new mecaflu()
