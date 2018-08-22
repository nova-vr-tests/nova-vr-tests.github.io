/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./meca-flu/js/meca-flu.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./meca-flu/js/meca-flu.js":
/*!*********************************!*\
  !*** ./meca-flu/js/meca-flu.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var mecaflu = function () {
    function mecaflu() {
        _classCallCheck(this, mecaflu);

        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.uniforms = null;
        this.plane = null;
        this.displacement = null;
        this.meshLengthSegments = null;
        this.meshWidthSegments = null;

        this.init = this.init.bind(this);
        this.animate = this.animate.bind(this);
        this.change_uvs = this.change_uvs.bind(this);
        this.applyDisplacements = this.applyDisplacements.bind(this);
        this.onWindowResize = this.onWindowResize.bind(this);
        this.render = this.render.bind(this);
        this.init();
        this.animate();
    }

    // Function to change uv mapping


    _createClass(mecaflu, [{
        key: 'change_uvs',
        value: function change_uvs(geometry, unitx, unity, offsetx, offsety) {
            var uvs = geometry.attributes.uv.array;
            for (var i = 0; i < uvs.length; i += 2) {
                uvs[i] = (uvs[i] + offsetx) * unitx;
                uvs[i + 1] = (uvs[i + 1] + offsety) * unity;
            }
        }

        // Displaces calculates displacements for each vertices of a mesh

    }, {
        key: 'applyDisplacements',
        value: function applyDisplacements(displacement) {
            var x = null;
            var y = null;
            var alpha = 0.5;
            var beta = alpha;
            for (var i = 0; i < displacement.length; i++) {
                x = i / this.meshWidthSegments;
                y = i % this.meshWidthSegments;
                displacement[i] = 2 * Math.sin(alpha * x) * Math.sin(beta * y);
            }
        }
    }, {
        key: 'init',
        value: function init() {
            // Camera setup
            this.camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 10000);
            this.camera.position.z = 30;
            this.camera.position.x = 5;

            // Scene setup
            this.scene = new THREE.Scene();

            // Shader variables setup
            this.uniforms = {
                amplitude: {
                    value: 10
                },
                scaleFactor: {
                    value: 1.0
                },
                texture: {
                    value: new THREE.TextureLoader().load('meca-flu/textures/about-us.png')
                }
            };
            this.uniforms.texture.value.wrapS = this.uniforms.texture.value.wrapT = THREE.MirroredRepeatWrapping;
            var shaderMaterial = new THREE.ShaderMaterial({
                uniforms: this.uniforms,
                vertexShader: document.getElementById('vertexshader').textContent,
                fragmentShader: document.getElementById('fragmentshader').textContent
            });

            // setting up the geometry
            // play with controls on: https://threejs.org/docs/#api/geometries/PlaneBufferGeometry
            this.meshLengthSegments = 100;
            this.meshWidthSegments = this.meshLengthSegments;
            var meshWidth = 50;
            var meshLength = meshWidth;
            this.geometry = new THREE.PlaneBufferGeometry(meshLength, meshWidth, this.meshLengthSegments, this.meshWidthSegments);

            // Changing uv mapping of current geometry
            this.change_uvs(this.geometry, 1, 1, 0, 0);

            // Deforming plane with displacements
            this.displacement = new Float32Array(this.geometry.attributes.position.count);
            this.applyDisplacements(this.displacement);

            // Setting up the shaders' attributes
            this.geometry.addAttribute('displacement', new THREE.BufferAttribute(this.displacement, 1));

            // Creating the mesh
            this.plane = new THREE.Mesh(this.geometry, shaderMaterial);

            // Adding the mesh to our scene
            this.scene.add(this.plane);

            // Rendering
            this.renderer = new THREE.WebGLRenderer();
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            var container = document.getElementById('container');
            container.appendChild(this.renderer.domElement);

            // Event listeneres
            window.addEventListener('resize', this.onWindowResize, false);
        }
    }, {
        key: 'onWindowResize',
        value: function onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }, {
        key: 'animate',
        value: function animate() {
            requestAnimationFrame(this.animate);
            this.render();
        }
    }, {
        key: 'render',
        value: function render() {
            var time = Date.now() * 0.0001;

            // Rotating and scaling plane wrt time
            this.plane.rotation.z = 0.5 * time;
            this.uniforms.scaleFactor.value = 0.5 * Math.sin(time);

            // Render
            this.renderer.render(this.scene, this.camera);
        }
    }]);

    return mecaflu;
}();

window.mecaflu = new mecaflu();

/***/ })

/******/ });
//# sourceMappingURL=mecaFlu.js.map