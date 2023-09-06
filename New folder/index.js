import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl')

const sizes ={
    width: window.innerWidth,
    height: window.innerHeight
}

//Scene>Camera>Renderer>loader
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );
camera.position.set(0.85,0.85,1)
scene.add(camera)

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
renderer.shadowMap.enabled = true
renderer.gammaOutput = true
renderer.render(scene,camera)

const loader = new GLTFLoader()
loader.load('assets/scene.glb', function(glb){
    console.log(glb)
    const root = glb.scene;
    root.scale.set(0.75,0.75,0.75)
    scene.add(root);
})

const light = new THREE.DirectionalLight(0xffffff,1)
light.position.set(2,2,5)
scene.add(light)

const controls = new OrbitControls( camera, renderer.domElement );

function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate()
