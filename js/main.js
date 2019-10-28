var scene,
	renderer;

var cameras = {};

var clock = new THREE.Clock();
var delta = 0;

function onKeyDown(e) {
	'use strict';
}

function onKeyPress(e) {
	'use strict';
}

function onKeyUp(e) {
	'use strict';
}

// TODO: Add so EVERY CAMERA RESIZES!!!
function onResize() {
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.activeCamera.aspect = window.innerWidth / window.innerHeight;
	scene.activeCamera.updateProjectionMatrix();
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
	createRoom();
	createIcosahedron(0, 2.5, 0); //2.5 eyeballed, should calculate actual coordinate
}

function render() {
	'use strict';
	renderer.render(scene, scene.activeCamera);
}

function animate() {
	'use strict';

	delta = clock.getDelta();
	// Under here the parts that should be animated should be added

	render();
	requestAnimationFrame(animate);
}

function init() {
	'use strict';

	renderer = new THREE.WebGLRenderer({ antialias: true });

	renderer.setSize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);

	createScene();
	scene.activeCamera = createFixedPerspectiveCamera();
	render();

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('keyup', onKeyUp);
}
