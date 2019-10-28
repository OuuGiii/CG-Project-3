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
	camera.position.set(10, 10, 10);
	camera.lookAt(scene.position);

	return camera;
}
