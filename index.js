import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const canvas = document.querySelector('.webgl')

const sizes ={
    width: 1200,
    height: 600,
}

//2
const scene = new THREE.Scene()
scene.background = new THREE.Color(0x000c25)
// scene.opacity = new THREE.opacity(1)

//3
const camera = new THREE.PerspectiveCamera( 35, sizes.width / sizes.height, 1, 10000 );
camera.position.set(2.75,2.75,2.25)
scene.add(camera)

//1
const renderer = new THREE.WebGLRenderer();
renderer.setSize( sizes.width, sizes.height );
document.getElementById("webgl").appendChild( renderer.domElement );

renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio,3))
renderer.shadowMap.enabled = true
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.render(scene,camera)

const loader = new GLTFLoader()
loader.load('scene.glb', function(glb){
    console.log(glb)
    const root = glb.scene;
    root.scale.set(0.75,0.75,0.75)
    scene.add(root);
})

const light = new THREE.DirectionalLight(0xffffff,5)
light.position.set(3.75,3.75,3.25)
scene.add(light)

//4
const controls = new OrbitControls( camera, renderer.domElement );


//5
function animate(){
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene,camera);
}

animate()