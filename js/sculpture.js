var phi = (1+5**-0.5)/2;

//TODO set vertices offset to make geometry irregular

function createIcosahedron(){
	'use strict';

	var material = new THREE.MeshBasicMaterial({color: 0x0000ff, wireframe: true});
	var geometry = new THREE.Geometry();
	var mesh, icosahedron = new THREE.Object3D();

	geometry.vertices.push(
		new THREE.Vector3( 0,  1, phi),
		new THREE.Vector3( 0, 1, -phi),
		new THREE.Vector3( 0, -1, phi),
		new THREE.Vector3( 0, -1, -phi),
		new THREE.Vector3( phi, 0, 1),
		new THREE.Vector3( -phi, 0, 1),
		new THREE.Vector3( phi, 0, -1),
		new THREE.Vector3( -phi, 0, -1),
		new THREE.Vector3( 1, phi, 0),
		new THREE.Vector3( 1, -phi, 0),
		new THREE.Vector3( -1, phi, 0),
		new THREE.Vector3( -1, -phi, 0)
	);

	geometry.faces.push(
		new THREE.Face3( 0, 1, 8),
		new THREE.Face3( 0, 10, 1),
		new THREE.Face3( 0, 8, 4),
		new THREE.Face3( 0, 4, 5),
		new THREE.Face3( 0, 5, 10),
		new THREE.Face3( 1, 6, 8),
		new THREE.Face3( 1, 7, 6),
		new THREE.Face3( 1, 10, 7),
		new THREE.Face3( 10, 5, 7),
		new THREE.Face3( 8, 9, 4),
		new THREE.Face3( 2, 3, 9),
		new THREE.Face3( 2, 11, 3),
		new THREE.Face3( 2, 4, 9),
		new THREE.Face3( 2, 5, 4),
		new THREE.Face3( 2, 11, 5),
		new THREE.Face3( 3, 9, 6),
		new THREE.Face3( 3, 6, 7),
		new THREE.Face3( 3, 7, 11),
		new THREE.Face3( 10, 5, 11),
		new THREE.Face3( 8, 6, 9)
	);

	mesh = new THREE.Mesh(geometry, material);
	icosahedron.add(mesh);
	scene.add(icosahedron);

	return icosahedron;
}
