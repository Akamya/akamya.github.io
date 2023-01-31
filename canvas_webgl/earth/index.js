import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoad';
import { OrbitControls } from 'OrbitControls';
import { convertToCartesian, fetchCountries } from "./utils.js";

let adventurer = null;

// Camera
const fov = 75;
const aspect = 2;  // the canvas default
const near = 1;
const far = 5000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 0, 4);

const scene = new THREE.Scene();
{
    scene.background = new THREE.Color('black');
}


// Ambient light for the whole scene
{
    const color = 0xFFFFFF;
    const intensity = 1;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);
}


// Earth
let sphere = new THREE.SphereGeometry( 1, 32, 32 );
let texture = new THREE.TextureLoader().load( 'textures/earth.jpg' );
let mat = new THREE.MeshLambertMaterial({ map: texture });
let sphereMesh = new THREE.Mesh(sphere, mat);

scene.add(sphereMesh);

sphereMesh.position.set(0,0,0);
sphereMesh.rotation.set(0, 0, 0);


// Ask for geolocation permission
navigator.geolocation.getCurrentPosition(function(position) {
    if (position) {
        console.log(position);
        // Get the user's location and replace the marker with a 3D model (using GLTFLoader)
        let coord = convertToCartesian(position.coords.latitude, position.coords.longitude, 1);
        let model = new GLTFLoader();
        console.log(coord);
        model.load('./models/Adventurer.gltf', gltf => {
            scene.add( gltf.scene );
            gltf.scene.position.set(coord[0], coord[1], coord[2]);
            // Reduce the size of the model
            gltf.scene.scale.set(0.2, 0.2, 0.2);
            adventurer = gltf.scene;
        } , undefined, err => {
            console.error(err);
        });
    }
});


let data = await fetchCountries();
let countries = [];

for(let i = 0; i < data.length; i++) {
    let country = data[i];
    let lat = country.latlng[0];
    let lon = country.latlng[1];
    let coord = convertToCartesian(lat, lon, 1);
    let marker = new THREE.SphereGeometry( 0.02, 32, 32 );
    let texture = new THREE.TextureLoader().load( data[i].flags.png );
    let mat2 = new THREE.MeshLambertMaterial({ map: texture });
    let markerMesh = new THREE.Mesh(marker, mat2);
    scene.add(markerMesh);
    markerMesh.position.set(coord[0], coord[1], coord[2]);
    countries.push(markerMesh);
}


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls(camera, renderer.domElement);

// Note: requestAnimationFrame uses the maximum refresh rate of the monitor
function animate() {
    requestAnimationFrame( animate );
    onWindowResize();
    controls.update();
    rotateToCamera();
    renderer.render( scene, camera );
}

animate();

// Make the markers rotate to face the camera
function rotateToCamera() {
    for(let i = 0; i < countries.length; i++) {
        countries[i].lookAt(camera.position);
    }
    if(adventurer) {
        console.log(camera.position);
        adventurer.lookAt(-camera.position.x, -camera.position.y, -camera.position.z);
    }
}

// Resize the canvas when the window is resized
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}