import * as THREE from 'three';
import { GLTFLoader } from 'GLTFLoad';
import { OrbitControls } from 'OrbitControls';
import { convertToCartesian, fetchCountries } from "./utils.js";

let geo = null;

// Ask for geolocation permission
navigator.geolocation.getCurrentPosition(function(position) {
    if (position) {
        geo = position.coords;
    }
});


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

// Get the user's location
let marker = new THREE.SphereGeometry( 0.01, 32, 32 );
let mat2 = new THREE.MeshLambertMaterial({ color: 0xFF0000 });
let markerMesh = new THREE.Mesh(marker, mat2);

scene.add(markerMesh);

const coord = convertToCartesian(43.7101728, 7.2619532, 1);

markerMesh.position.set(coord[0], coord[1], coord[2]);

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
}