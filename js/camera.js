/*
 * Creating a perspective camera uses the following attributes
 * fov — Camera frustum vertical field of view.
 * aspect — Camera frustum aspect ratio.
 * near — Camera frustum near plane.
 * far — Camera frustum far plane.
 */
function createFixedPerspectiveCamera() {
	'use strict';
	let fov = 30;
	let aspect = window.innerWidth / window.innerHeight;
	let near = 1;
	let far = 1000;

	var camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
	camera.position.set(20, 20, 40);
	camera.lookAt(scene.position);

	return camera;
}

function createFixedOrthographicCamera() {
	'use strict';
	let left = window.innerWidth / -80;
	let right = window.innerWidth / 80;
	let top = window.innerHeight / 80;
	let bottom = window.innerHeight / -80;
	let near = 1;
	let far = 10;

	var camera = new THREE.OrthographicCamera( left, right, top, bottom, near, far );
	camera.position.set(0, 5, -5);
	camera.lookAt(scene.painting.position);

	return camera;
}