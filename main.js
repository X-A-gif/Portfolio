import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.querySelector('#canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 5;
camera.position.x = -2;
camera.position.y = 1;

const pointLight = new THREE.PointLight(0xffadff, 3000, 10000);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })

const loader = new GLTFLoader();
loader.load('./cyberpunk_vr_head_rig/scene.gltf', (gltf) => {
  gltf.scene.scale.setScalar(1.4);
  gltf.scene.traverse(c => {
  
  });
  
  gltf.scene.position.z = 0;

  gltf.scene.rotateY(Math.PI);
  scene.add(gltf.scene);
});



function animate() {
  requestAnimationFrame(animate);



  renderer.render(scene, camera);
}

animate();