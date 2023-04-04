import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeff1f5);

const canvas = document.getElementById("canvas-view") as HTMLCanvasElement;
const width = canvas.width;
const height = canvas.height;

const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(width, height);
renderer.shadowMap.enabled = true;

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(-2, 0, 2);
controls.update();

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
scene.add(cube);

const planeGeometry = new THREE.PlaneGeometry(10, 10);
const planeMaterial = new THREE.MeshPhongMaterial({ color: 0xeff1f5 });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.receiveShadow = true;
plane.rotation.x = -Math.PI / 2;
plane.position.y = -0.5;
scene.add(plane);

const directional = new THREE.DirectionalLight(0xeff1f5, 0.5);
directional.position.set(10, 10, 10);
directional.castShadow = true;
directional.shadow.camera.near = 0.1;
directional.shadow.camera.far = 100;
directional.shadow.camera.left = -5;
directional.shadow.camera.right = 5;
directional.shadow.camera.top = 5;
directional.shadow.camera.bottom = -5;
directional.shadow.mapSize.width = 256;
directional.shadow.mapSize.height = 256;
scene.add(directional);

const ambient = new THREE.AmbientLight(0xeff1f5, 0.5);
ambient.castShadow = true;
scene.add(ambient);

scene.add(camera);

function animate() {
  requestAnimationFrame(animate);
  // cube.rotation.x += 0.01;
  // cube.rotation.y += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();
