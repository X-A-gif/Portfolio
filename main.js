import * as THREE from 'three';


import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.querySelector('#canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 8;


 const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
loader.load('./silent_ash/scene.gltf', (gltf) => {
  gltf.scene.scale.setScalar(0.8);
  gltf.scene.traverse(c => {
    c.castShadow = true;
  });

  gltf.scene.position.y = 1;

  scene.add(gltf.scene);
});

//  const fbxLoader = new FBXLoader();
//  fbxLoader.load('./dancer/girl.fbx', (fbx) => {
//    fbx.scale.setScalar(0.007);
//    fbx.traverse(c => {
//     c.castShadow = true;
//   });
  
//   fbx.position.x = -1;
//   fbx.position.y = 1;
//    scene.add(fbx);
//  });

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);


const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 50000

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 10
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))


const particlesMaterial = new THREE.PointsMaterial({
    color: 0x604df5,
    size: 0.00115,
})

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particlesMesh)

const pointlight = new THREE.PointLight(0xffffff, 0.1)
pointlight.position.x = 2
pointlight.position.y = 3
pointlight.position.z = 4
scene.add(pointlight)

function animate() {
  requestAnimationFrame(animate);

   controls.update();

  particlesMesh.rotation.y -= 0.0005


  renderer.render(scene, camera);
}

animate();