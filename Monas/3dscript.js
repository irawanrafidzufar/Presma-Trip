import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Membuat kamera dengan sudut pandang 50 derajat
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.y = 400;
camera.position.z = 1500;
camera.position.x = 700;

const scene = new THREE.Scene();
let monas;
const loader = new GLTFLoader();
// Memuat model GLTF
loader.load('models/monas/scene.gltf',
    function (gltf) {
        monas = gltf.scene;
        scene.add(monas);

        reRender3d();
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3d').appendChild(renderer.domElement);


const al = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(al);

const dl = new THREE.DirectionalLight(0xffffff, 0.5);
dl.position.set(0, 2, 2);
dl.castShadow = true;
const dlhelper = new THREE.DirectionalLightHelper(dl, 0);
scene.add(dl, dlhelper);

// Variabel untuk mengatur rotasi
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotationY = 0;
const rotationSpeed = 0.01;
const smoothFactor = 0.1;

// Event listener untuk mouse down
window.addEventListener('mousedown', (event) => {
    if (event.button === 0) { // Cek jika klik kiri
        isMouseDown = true;
    }
});

// Event listener untuk mouse up
window.addEventListener('mouseup', () => {
    isMouseDown = false;
});

// Event listener untuk mouse move
window.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const deltaMove = {
            x: event.clientX - previousMousePosition.x,
            y: event.clientY - previousMousePosition.y
        };

        // Mengatur rotasi objek berdasarkan pergerakan mouse
        targetRotationY += deltaMove.x * rotationSpeed;
    }

    // Menyimpan posisi mouse saat ini
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

const autoRotationSpeed = 12;

// Fungsi untuk merender ulang scene
const reRender3d = () => {
    requestAnimationFrame(reRender3d); // Memanggil fungsi ini secara berulang
    if(monas){
        monas.rotation.y += (targetRotationY - monas.rotation.y) * smoothFactor;
        monas.rotation.y += autoRotationSpeed * 0.01;
    } 
    renderer.render(scene, camera); 
};
 // Memulai proses render