import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoad';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const loader = new GLTFLoader();

let skull = null;

loader.load('./models/skull/scene.gltf', gltf => {
    scene.add( gltf.scene );
    skull = gltf.scene;
}, undefined, err => {
    console.error(err);
});

// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshPhongMaterial( { color: 0xffff00 } );
// const cube = new THREE.Mesh( geometry, material );
const light = new THREE.DirectionalLight( 0xffffff, 1 );
const fullLight = new THREE.AmbientLight( 0xffffff, 0.4 );
light.position.set( 1, 1, 1 ).normalize();
scene.add( light, fullLight );

camera.position.z = 5;

function animate() {
    requestAnimationFrame( animate );
    renderer.render( scene, camera );

}
animate();

function handleOrientation(e) {
    let absolute = e.absolute;
    let alpha = e.alpha;
    let beta = e.beta;
    let gamma = e.gamma;

    skull.rotation.y = alpha * Math.PI /180;
    skull.rotation.x = (beta-90) * Math.PI /180;
    skull.rotation.z = -gamma * Math.PI /180;
}

window.addEventListener("deviceorientation", handleOrientation, true);