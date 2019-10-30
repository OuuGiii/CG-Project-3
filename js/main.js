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
var MATERIAL_TYPE = 0;

var clock = new THREE.Clock();
var delta = 0;

//var ind = 0; //indicates the material type

function onKeyDown(e) {
	'use strict';
	switch (e.keyCode) {
		case 37:
			scene.sculpture.rotating = true;
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
			/*if (ind == 0) {
				scene.room.changeMaterialLambert();
				scene.painting.changeMaterialLambert();
				scene.sculpture.changeMaterialLambert();
				ind = 1;
			}
			else {
				scene.room.changeMaterialBasic();
				scene.painting.changeMaterialBasic();
				scene.sculpture.changeMaterialBasic();
				ind = 0;
			}*/
			break;
		case 101: //e - TODO: change shadow type
			changeShadowType();
			break;
	}
}

function onKeyUp(e) {
	'use strict';
	switch (e.keyCode) {
		case 37:
			scene.sculpture.rotating = false;
			break;
	}
}

// TODO: Add so EVERY CAMERA RESIZES!!!
function onResize() {
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	scene.activeCamera.aspect = window.innerWidth / window.innerHeight;
	scene.activeCamera.updateProjectionMatrix();
}

function changeShadowType() {
	'use strict';

	if (MATERIAL_TYPE > 2) MATERIAL_TYPE = 0;
	//scene.room.changeRoomMaterial(MATERIAL_TYPE);
	scene.painting.changeMaterial(MATERIAL_TYPE);
	//scene.sculpture.changeSculptureMaterial(MATERIAL_TYPE);
	MATERIAL_TYPE++;
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
	sculptureMovement(scene.sculpture);
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
