var scene = {
	room: null,
	sculpture: null,
	painting: null
};
var renderer;

var cameras = {
	perspectiveCamera: null,
	orthographicCamera: null
};

var spotLights = {
	spotLight1: null,
	spotLight2: null,
	spotLight3: null,
	spotLight4: null
};

var directionalLight = null;

var materials = {
	material1: 'Basic',
	material2: 'Lambert',
	material3: 'Phong'
};

/*
 * 0 = basic
 * 1 = lambert
 * 2 = phong
 */
var MATERIAL_TYPE = {
	ACTIVE: 0,
	BASIC: 0,
	LAMBERT: 1,
	PHONG: 2
};

var clock = new THREE.Clock();
var delta = 0;

//var ind = 0; //indicates the material type

function onKeyDown(e) {
	'use strict';
	switch (e.keyCode) {
		case 37: //left
			scene.sculpture.rotating.left = true;
			break;
		case 39: //right
			scene.sculpture.rotating.right = true;
			break;
	}
}

function onKeyPress(e) {
	'use strict';
	switch (e.keyCode) {
		case 48: //0
			scene.traverse(function(node) {
				if (node instanceof THREE.Mesh) {
					node.material.wireframe = !node.material.wireframe;
				}
			});
			break;
		case 49: //1
			spotLights.spotLight1.turnTheSwitch();
			break;
		case 50: //2
			spotLights.spotLight2.turnTheSwitch();
			break;
		case 51: //3
			spotLights.spotLight3.turnTheSwitch();
			break;
		case 52: //4
			spotLights.spotLight4.turnTheSwitch();
			break;
		case 53: //5
			scene.activeCamera = cameras.perspectiveCamera;
			break;
		case 54: //6
			scene.activeCamera = cameras.orthographicCamera;
			break;
		case 113: //q
			directionalLight.turnTheSwitch();
			break;
		case 119: //w - TODO: activate/deactivate lighting calculation
			toggleLightingCalculation();
			break;
		case 101: //e - TODO: change shadow type
			changeShadowType();
			break;
	}
}

function onKeyUp(e) {
	'use strict';
	switch (e.keyCode) {
		case 37: //left
			scene.sculpture.rotating.left = false;
			break;
		case 39: //right
			scene.sculpture.rotating.right = false;
			break;
	}
}

// TODO: Add so EVERY CAMERA RESIZES!!!
function onResize() {
	'use strict';
	cameras.perspectiveCamera.aspect = window.innerWidth / window.innerHeight;
	cameras.perspectiveCamera.updateProjectionMatrix();

	// notify the renderer of the size change
	renderer.setSize(window.innerWidth, window.innerHeight);
	// update the camera
	cameras.orthographicCamera.left = -window.innerWidth / scale;
	cameras.orthographicCamera.right = window.innerWidth / scale;
	cameras.orthographicCamera.top = window.innerHeight / scale;
	cameras.orthographicCamera.bottom = -window.innerHeight / scale;
	cameras.orthographicCamera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);
}

function toggleLightingCalculation() {
	'use strict';

	if (MATERIAL_TYPE.ACTIVE === MATERIAL_TYPE.LAMBERT || MATERIAL_TYPE.ACTIVE === MATERIAL_TYPE.PHONG) {
		scene.room.changeMaterial(MATERIAL_TYPE.BASIC);
		scene.painting.changeMaterial(MATERIAL_TYPE.BASIC);
		scene.sculpture.changeMaterial(MATERIAL_TYPE.BASIC);
		MATERIAL_TYPE.ACTIVE = MATERIAL_TYPE.BASIC;
		console.log('Turned lightning calculations OFF');
	} else if (MATERIAL_TYPE.ACTIVE === MATERIAL_TYPE.BASIC) {
		scene.room.changeMaterial(MATERIAL_TYPE.LAMBERT);
		scene.painting.changeMaterial(MATERIAL_TYPE.LAMBERT);
		scene.sculpture.changeMaterial(MATERIAL_TYPE.LAMBERT);
		MATERIAL_TYPE.ACTIVE = MATERIAL_TYPE.LAMBERT;
		console.log('Turned lightning calculations ON');
	}
}

function changeShadowType() {
	'use strict';

	if (MATERIAL_TYPE.ACTIVE === MATERIAL_TYPE.LAMBERT) {
		scene.room.changeMaterial(MATERIAL_TYPE.PHONG);
		scene.painting.changeMaterial(MATERIAL_TYPE.PHONG);
		scene.sculpture.changeMaterial(MATERIAL_TYPE.PHONG);
		MATERIAL_TYPE.ACTIVE = MATERIAL_TYPE.PHONG;
		console.log('Turned material to PHONG');
	} else if (MATERIAL_TYPE.ACTIVE === MATERIAL_TYPE.PHONG) {
		scene.room.changeMaterial(MATERIAL_TYPE.LAMBERT);
		scene.painting.changeMaterial(MATERIAL_TYPE.LAMBERT);
		scene.sculpture.changeMaterial(MATERIAL_TYPE.LAMBERT);
		MATERIAL_TYPE.ACTIVE = MATERIAL_TYPE.LAMBERT;
		console.log('Turned material to LAMBERT');
	}
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
	scene.room = createRoom();
	scene.sculpture = createIcosahedron(0, 3.5, 0);
	scene.painting = createPainting(0, 5, -9.45);
}

function createSpotLights() {
	'use strict';

	spotLights.spotLight1 = createSpotLight(-8, 10, 0);
	spotLights.spotLight1.name = 'spotLight1';
	spotLights.spotLight1.light.target = scene.painting.frame.left;
	spotLights.spotLight1.rotation.x = Math.PI / 3;
	spotLights.spotLight1.rotation.z = Math.PI / 6;

	spotLights.spotLight2 = createSpotLight(-3, 10, 0);
	spotLights.spotLight2.name = 'spotLight2';
	spotLights.spotLight2.light.target = scene.sculpture;
	spotLights.spotLight2.rotation.z = Math.PI / 8;

	spotLights.spotLight3 = createSpotLight(3, 10, 0);
	spotLights.spotLight3.name = 'spotLight3';
	spotLights.spotLight3.light.target = scene.sculpture;
	spotLights.spotLight3.rotation.z = Math.PI / -8;

	spotLights.spotLight4 = createSpotLight(8, 10, 0);
	spotLights.spotLight4.name = 'spotLight4';
	spotLights.spotLight4.light.target = scene.painting.frame.right;
	spotLights.spotLight4.rotation.x = Math.PI / 3;
	spotLights.spotLight4.rotation.z = Math.PI / -6;
}

function render() {
	'use strict';
	renderer.render(scene, scene.activeCamera);
}

function animate() {
	'use strict';

	delta = clock.getDelta();
	// Under here the parts that should be animated should be added
	sculptureMovement(scene.sculpture, delta);
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
	directionalLight = createDirectionalLight(0, 0, 10);
	directionalLight.target = scene.room.floor;
	directionalLight.position.set(0, 20, 0);
	cameras.orthographicCamera = createFixedOrthographicCamera();
	cameras.perspectiveCamera = createFixedPerspectiveCamera();
	scene.activeCamera = cameras.perspectiveCamera;
	render();

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('keyup', onKeyUp);
}
