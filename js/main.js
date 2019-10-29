var scene = {
	room: null,
	sculpture: null,
	painting: null
};
var renderer;

var cameras = {};
var spotLights = {
	spotLight1: null,
	spotLight2: null,
	spotLight3: null,
	spotLight4: null
};

var materials = {
	material1: new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false }),
	material2: new THREE.MeshPhongMaterial({ color: 0xffffff, wireframe: false }),
	material3: new THREE.MeshLambertMaterial({ color: 0xffffff, wireframe: false })
};

var clock = new THREE.Clock();
var delta = 0;

function onKeyDown(e) {
	'use strict';
}

function onKeyPress(e) {
	'use strict';
	switch (e.keyCode) {
		case 49: //1
			spotLights.spotLight1.turnTheSwitch();
			break;
		case 50: //2
			spotLights.spotLight2.turnTheSwitch();
			break;
		case 51: //3
			spotLights.spotLight3.turnTheSwitch();
			break;

		// TODO ADD MATERIAL CHANGE
		// case 52: //4
		// 	spotLights.spotLight4.turnTheSwitch();
		// 	break;
		// case 50: //2
		// 	spotLights.spotLight2.turnTheSwitch();
		// 	break;
		// case 51: //3
		// 	spotLights.spotLight3.turnTheSwitch();
		// 	break;
		// case 52: //4
		// 	spotLights.spotLight4.turnTheSwitch();
		// 	break;
	}
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
	scene.room = createRoom();
	scene.sculpture = createIcosahedron(0, 2.5, 0); //2.5 eyeballed, should calculate actual coordinate
	scene.painting = createPainting(0, 5, -9.45);
}

function createSpotLights() {
	'use strict';
	spotLights.spotLight1 = createSpotLight(0, 0, 0);
	spotLights.spotLight1.name = 'spotLight1';
	spotLights.spotLight2 = createSpotLight(10, 10, 10);
	spotLights.spotLight2.name = 'spotLight2';
	spotLights.spotLight3 = createSpotLight(5, 5, 5);
	spotLights.spotLight3.name = 'spotLight3';
	spotLights.spotLight4 = createSpotLight(-5, 0, -5);
	spotLights.spotLight4.name = 'spotLight4';

	spotLights.spotLight1.lookAt(scene.painting);
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
	createSpotLights();
	scene.activeCamera = createFixedPerspectiveCamera();
	render();

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('keyup', onKeyUp);
}
