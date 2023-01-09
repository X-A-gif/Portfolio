import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';

import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.querySelector('#canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 10;
camera.position.y = 1;

const pointLight = new THREE.PointLight(0xffadff, 3000, 10000);
pointLight.position.set(50, 50, 50);
scene.add(pointLight);

const loader = new GLTFLoader();
loader.load('./cyberpunk_vr_head_rig/scene.gltf', (gltf) => {
  gltf.scene.scale.setScalar(1.4);
  gltf.scene.traverse(c => {
  
  });
  
  gltf.scene.position.z = -5;
  gltf.scene.position.x = 1;

  gltf.scene.rotateY(Math.PI);
  scene.add(gltf.scene);
});

function moveCamera() {
  const move = document.body.getBoundingClientRect().top;
  camera.position.z = move * 0.01;
  camera.position.x = move * 0.0002;
  camera.rotation.y = move * 0.0008;
}

document.body.onscroll = moveCamera;
moveCamera();


function animate() {
  requestAnimationFrame(animate);



  renderer.render(scene, camera);
}

animate();