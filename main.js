import * as THREE from 'three';
import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer;

// Smooth scrolling function
// function smoothScroll(target) {
//     document.querySelector(target).scrollIntoView({
//       behavior: 'smooth'
//     });
//   }
  
// document.querySelector('#scrollButton').addEventListener('click', function() {
//     smoothScroll('#targetElement');
//   });
  
function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7d4ed);

    const light = new THREE.DirectionalLight(0xCF9FFF, 5);
    light.position.set(1, 1, 5);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 5, 5);

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    window.addEventListener('resize', onWindowResize);

    loadModel();

}

function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update(0.016); 
    renderer.render(scene, camera);
}}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    moveCamera(); 
}

function moveCamera() {

    const t = document.body.getBoundingClientRect().top;
    camera.position.z = t * 0.01; 
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();

document.body.onscroll = moveCamera; 

// const controls = new OrbitControls(camera, renderer.domElement);
// const loader = new GLTFLoader();

// loader.load('BlenderFile2.gltf', function (gltf) {
//     const cross = gltf.scene;
//     scene.add(cross);
//     mixer = new THREE.AnimationMixer(cross);
//     const clips = gltf.animations;
//     const clip = THREE.AnimationClip.findByName(clips, 'MiddleVenusAction'); 
//     if (clip) {
//         const action = mixer.clipAction(clip);
//         action.play();
//     } else {
//         console.error('Animation clip not found.');
//     }
// });

// loadModel('BlenderFile2.gltf', 'PurpleGradient.jpeg', 'PurpleGradient.jpeg', ['Animation1', 'Animation2']);

function loadModel() {
    const loader = new GLTFLoader();
    loader.load('BlenderFile2.gltf', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        const textureLoader = new THREE.TextureLoader()
        const crossTexture = textureLoader.load('Pink_Chrome.jpeg')

        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        const animationActions = [];

        const animationNamesToPlay = ['Star1Action', 'Star2Action', 'Star3Action', 'Star4Action','LeftVenusAction', 'MiddleVenusAction', 'RightVenusAction']; // Add the names of the animations you want to play

        clips.forEach(animation => {
            if (animationNamesToPlay.includes(animation.name)) {
                const action = mixer.clipAction(animation);
                animationActions.push(action);
                action.play();
            }
        });
    }, undefined, function (error) {
        console.error(error);
    });
}

