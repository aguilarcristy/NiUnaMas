// import * as THREE from 'three';
// import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

// let scene, camera, renderer, mixer;

  
// function init() {
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf7d4ed);

//     const light = new THREE.DirectionalLight(0xCF9FFF, 5);
//     light.position.set(1, 1, 5);
//     scene.add(light);

//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(0, 5, 5);

//     renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     const controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.25;
//     window.addEventListener('resize', onWindowResize);

//     loadModel();

// }

// function animate() {
//     requestAnimationFrame(animate);
//     if (mixer) {
//         mixer.update(0.016); 
//     renderer.render(scene, camera);
// }}

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     moveCamera(); 
// }


// window.addEventListener('resize', onWindowResize, false);
// init();
// animate();

// function loadModel() {
//     const loader = new GLTFLoader();
//     loader.load('BlenderFile2.gltf', function (gltf) {
//         const model = gltf.scene;
//         scene.add(model);

//         mixer = new THREE.AnimationMixer(model);
//         const clips = gltf.animations;
//         const animationActions = [];

//         const animationNamesToPlay = ['Star1Action', 'Star2Action', 'Star3Action', 'Star4Action','LeftVenusAction', 'MiddleVenusAction', 'RightVenusAction']; // Add the names of the animations you want to play

//         clips.forEach(animation => {
//             if (animationNamesToPlay.includes(animation.name)) {
//                 const action = mixer.clipAction(animation);
//                 animationActions.push(action);
//                 action.play();
//             }
//         });
//     }, undefined, function (error) {
//         console.error(error);
//     });
// }

// ATTEMPT 2 - CAMERA MOVEMENT

// import * as THREE from 'three';
// import { OrbitControls } from 'https://unpkg.com/three@0.162.0/examples/jsm/controls/OrbitControls.js';
// import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

// let scene, camera, renderer, mixer, controls;

// function init() {
//     scene = new THREE.Scene();
//     scene.background = new THREE.Color(0xf7d4ed);

//     const light = new THREE.DirectionalLight(0xCF9FFF, 5);
//     light.position.set(1, 1, 5);
//     scene.add(light);

//     camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//     camera.position.set(3, 3, 5);

//     renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     document.body.appendChild(renderer.domElement);

//     controls = new OrbitControls(camera, renderer.domElement);
//     controls.enableDamping = true;
//     controls.dampingFactor = 0.25;

//     window.addEventListener('resize', onWindowResize);

//     loadModel();
// }

// function animate() {
//     requestAnimationFrame(animate);
//     if (mixer) {
//         mixer.update(0.016);
//     }
//     renderer.render(scene, camera);
//     controls.update(); // Update the controls in the animation loop
// }

// function onWindowResize() {
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
//     renderer.setSize(window.innerWidth, window.innerHeight);
// }

// window.addEventListener('resize', onWindowResize, false);
// init();
// animate();

// function loadModel() {
//     const loader = new GLTFLoader();
//     loader.load('BlenderFile2.gltf', function (gltf) {
//         const model = gltf.scene;
//         scene.add(model);

//         mixer = new THREE.AnimationMixer(model);
//         const clips = gltf.animations;
//         const animationActions = [];

//         const animationNamesToPlay = ['Star1Action', 'Star2Action', 'Star3Action', 'Star4Action','LeftVenusAction', 'MiddleVenusAction', 'RightVenusAction'];

//         clips.forEach(animation => {
//             if (animationNamesToPlay.includes(animation.name)) {
//                 const action = mixer.clipAction(animation);
//                 animationActions.push(action);
//                 action.play();
//             }
//         });
//     }, undefined, function (error) {
//         console.error(error);
//     });
// }

// ATTEMPT 3: CAMERA MOVEMENT

import * as THREE from 'three';
import { GLTFLoader } from 'https://unpkg.com/three@0.162.0/examples/jsm/loaders/GLTFLoader.js';

let scene, camera, renderer, mixer;

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf7d4ed);

    const light = new THREE.DirectionalLight(0xCF9FFF, 5);
    light.position.set(1, 1, 5);
    scene.add(light);

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 12);

    renderer = new THREE.WebGLRenderer({ antialias: true, canvas: document.querySelector('#bg') });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize', onWindowResize);

    loadModel();

    document.addEventListener('mousemove', onMouseMove);
}

function animate() {
    requestAnimationFrame(animate);
    if (mixer) {
        mixer.update(0.016);
    }
    renderer.render(scene, camera);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadModel() {
    const loader = new GLTFLoader();
    loader.load('Blender_File_Animated.gltf', function (gltf) {
        const model = gltf.scene;
        scene.add(model);

        mixer = new THREE.AnimationMixer(model);
        const clips = gltf.animations;
        const animationActions = [];

        const animationNamesToPlay = ['Curve.011Action', 'Star1Action', 'Star2Action', 'Star3Action', 'Star4Action','LeftVenusAction', 'MiddleVenusAction', 'MiddleVenusAction.004', 'RightVenusAction'];

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

function onMouseMove(event) {
    const sensitivity = 0.1; // Adjust this value to change the sensitivity
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

    const vector = new THREE.Vector3(mouseX * sensitivity, mouseY * sensitivity, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = - camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));

    camera.lookAt(pos);
}

window.addEventListener('resize', onWindowResize, false);
init();
animate();

