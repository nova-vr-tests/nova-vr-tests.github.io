import * as THREE from 'three'

interface Uniforms {
    [s: string]: {
        value: number | THREE.Texture
    }
}

type Us = Array<[string, number | THREE.Texture]>

class ShaderObject {
    uniforms: Uniforms
    material: THREE.ShaderMaterial
    mesh: THREE.Mesh
    geometry: THREE.BufferGeometry

    constructor(g: THREE.BufferGeometry, us: Us, v: string, f: string) {
        this.uniforms = {}

        this.updateUniform = this.updateUniform.bind(this)
        this.addAttribute = this.addAttribute.bind(this)
        this.init = this.init.bind(this)

        this.init(g, us, v, f)
    }
    init(g: THREE.BufferGeometry, us: Us, v: string, f: string) {
        us.map(u => (this.updateUniform(u[0], u[1])))

        this.geometry = g

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: document.getElementById(v).textContent,
            fragmentShader: document.getElementById(f).textContent,
        })


        this.mesh = new THREE.Mesh(this.geometry, this.material)
    }
    addAttribute(n: string, a: THREE.BufferAttribute) {
        this.geometry.addAttribute(n, a)
    }
    updateUniform(n: string, v: number | THREE.Texture) {
        this.uniforms[n] = {
            value: v,
        }
    }
}

export default ShaderObject
export {
    Us,
}
