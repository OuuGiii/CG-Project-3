var scene,
	renderer,
	toggle = true;

var cameras = {};

var clock = new THREE.Clock();
var delta = 0;

function onKeyDown(e) {
	'use strict';

	switch (e.keyCode) {
		case 37: //left
			break;
		case 39: //right
			break;
	}
}

function onKeyPress(e) {
	'use strict';

	switch (e.keyCode) {
		case 49: //1
			break;
		case 50: //2
			break;
		case 51: //3
			break;
		case 52: //4
			break;
		case 81: //Q
		case 113: //q
			break;
		case 82: //R
		case 114: //r
			toggle = !toggle;
			toggleAxis(toggle);
			break;
		case 87: //W
		case 119: //w
			break;
		case 69: //E
		case 101: //e
			break;
		case 32: //space
			break;
	}
}

function onKeyUp(e) {
	'use strict';

	switch (e.keyCode) {
		case 37: //left
			break;
		case 39: //right
			break;
	}
}

// TODO: Add so EVERY CAMERA REZISES!!!
function onResize() {
	'use strict';
	renderer.setSize(window.innerWidth, window.innerHeight);
	// scene.activeCamera.aspect = window.innerWidth / window.innerHeight;
	// scene.activeCamera.updateProjectionMatrix();
}

function createScene() {
	'use strict';
	scene = new THREE.Scene();
}

function render() {
	'use strict';
	// renderer.render(scene, scene.activeCamera);
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
	render();

	window.addEventListener('resize', onResize);
	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keypress', onKeyPress);
	window.addEventListener('keyup', onKeyUp);
}
