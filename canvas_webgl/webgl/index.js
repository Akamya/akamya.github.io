import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoad';

const fov = 75;
const aspect = 2;  // the canvas default
const near = 1;
const far = 50;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 3);


const scene = new THREE.Scene();
{
    const near = 1;
    const far = 5;
    const color = 'lightblue';
    scene.fog = new THREE.Fog(color, near, far);
    scene.background = new THREE.Color('black');
}

{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(0, 3, 5);
    scene.add(light);
}


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

let geo = new THREE.BoxGeometry( 1, 1, 18 );
let mat = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });
let cube = new THREE.Mesh(geo, mat);

scene.add(cube);

cube.position.set(3,0,-5);
cube.rotation.set(0, 0, 0)


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

    skull.rotation.y = alpha * (Math.PI /180);
    skull.rotation.x = (beta-90) * (Math.PI /180);
    // skull.rotation.z = -gamma * Math.PI /180;
}

window.addEventListener("deviceorientation", handleOrientation, true);