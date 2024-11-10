import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Membuat kamera dengan sudut pandang 50 derajat
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.y = 1;
camera.rotation.x = -0.3;

const scene = new THREE.Scene();
let monas;
const loader = new GLTFLoader();
// Memuat model GLTF
loader.load('models/scene.gltf',
    function (gltf) {
        monas = gltf.scene;
        scene.add(monas);
        monas.position.z -= 3;
        monas.position.x -= 1.5;
        monas.rotation.y = 1;
        monas.rotation.z -= 0.1;
        reRender3d();
    },
    function (xhr) {},
    function (error) {}
);

const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container3d').appendChild(renderer.domElement);

const al = new THREE.AmbientLight(0xffffff, 1.5);
scene.add(al);

const dl = new THREE.DirectionalLight(0xffffff, 1);
dl.position.set(-0.352, 2.362, 2.627);
dl.castShadow = true;
const dlhelper = new THREE.DirectionalLightHelper(dl, 0);
//scene.add(dl, dlhelper);

// Variabel untuk mengatur rotasi
let isMouseDown = false;
let previousMousePosition = { x: 0, y: 0 };
let targetRotationY = 0;
let targetRotationX = 0;
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
        targetRotationX += deltaMove.y * rotationSpeed;
    }

    // Menyimpan posisi mouse saat ini
    previousMousePosition = {
        x: event.clientX,
        y: event.clientY
    };
});

// Fungsi untuk merender ulang scene
const reRender3d = () => {
    requestAnimationFrame(reRender3d); // Memanggil fungsi ini secara berulang
    if(monas){
        monas.rotation.y += (targetRotationY - monas.rotation.y) * smoothFactor;
        monas.rotation.x += (targetRotationX - monas.rotation.x) * smoothFactor;
    }
    renderer.render(scene, camera); 
};
 // Memulai proses render