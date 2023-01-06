import * as THREE from 'three';

// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  canvas: document.querySelector('#canvas'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.z = 35;

//  const controls = new OrbitControls(camera, renderer.domElement);

 const loader = new GLTFLoader();
 loader.load('./earthquakes/scene.gltf', (gltf) => {
   gltf.scene.scale.setScalar(0.2);
   gltf.scene.traverse(c => {
     c.castShadow = true;
  });

   gltf.scene.position.y = 0;
   
   scene.add(gltf.scene);
 });

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);


const particlesGeometry = new THREE.BufferGeometry()
const particlesCount = 50000

const posArray = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 50
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

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  

  camera.position.y = t * -0.02;
  
}

document.body.onscroll = moveCamera;
moveCamera();



function animate() {
  requestAnimationFrame(animate);

  //  controls.update();

  particlesMesh.rotation.y -= 0.0005

  renderer.render(scene, camera);
}

animate();