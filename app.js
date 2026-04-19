import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Настройка сцены
const container = document.getElementById('scene-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
scene.fog = new THREE.Fog(0x111111, 2, 15);
// Настройка камеры
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.set(3, 2, 4);
// Настройка рендерера
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);
// Добавляем сетку
const gridHelper = new THREE.GridHelper(10, 50, 0x00ff00, 0x003300);
scene.add(gridHelper);
// Освещение
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x0f172a, 5);
hemiLight.position.set(0, 20, 0);
scene.add(hemiLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
directionalLight.position.set(5, 10, 7);
scene.add(directionalLight);
const backLight = new THREE.DirectionalLight(0x3b82f6, 3); 
backLight.position.set(-5, 5, -5);
scene.add(backLight);
// Управление камерой
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.autoRotate = true;
controls.autoRotateSpeed = 1.0;
// Загрузка 3D модели дрона
const loader = new GLTFLoader();
loader.load(
    'models/drone_design.glb',
    function (gltf) {
        const drone = gltf.scene;
        drone.scale.set(1, 1, 1); 
        drone.position.set(0, 0.5, 0);
        scene.add(drone);
        console.log("Дрон успешно загружен!");
    },
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
    },
    function (error) {
        console.error('Ошибка при загрузке модели', error);
    }
);
// Адаптация
window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();