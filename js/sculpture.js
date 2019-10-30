var phi = (1 + 5 ** -0.5) / 2;

//TODO set vertices offset to make geometry irregular

function createIcosahedron(x, y, z) {
	'use strict';

	var material = new THREE.MeshBasicMaterial({ color: 0xB559A2, wireframe: false });
	var geometry = new THREE.Geometry();
	//TODO 3 different mesh types and not just 1
	var mesh,
		icosahedron = new THREE.Object3D();

	geometry.vertices.push(
		new THREE.Vector3(-1,  phi,  0),
		new THREE.Vector3( 1,  phi,  0),
		new THREE.Vector3(-1, -phi,  0),
		new THREE.Vector3( 1, -phi,  0),
		new THREE.Vector3( 0, -1,  phi),
		new THREE.Vector3( 0,  1,  phi),
		new THREE.Vector3( 0, -1, -phi),
		new THREE.Vector3( 0,  1, -phi),
		new THREE.Vector3( phi,  0, -1),
		new THREE.Vector3( phi,  0,  1),
		new THREE.Vector3(-phi,  0, -1),
		new THREE.Vector3(-phi,  0,  1)
	);

	geometry.faces.push(

		new THREE.Face3(0, 11, 5),
		new THREE.Face3(0, 5, 1),
		new THREE.Face3(0, 1, 7),
		new THREE.Face3(0, 7, 10),
		new THREE.Face3(0, 10, 11),
		new THREE.Face3(1, 5, 9),
		new THREE.Face3(5, 11, 4),
		new THREE.Face3(11, 10, 2),
		new THREE.Face3(10, 7, 6),
		new THREE.Face3(7, 1, 8),
		new THREE.Face3(3, 9, 4),
		new THREE.Face3(3, 4, 2),
		new THREE.Face3(3, 2, 6),
		new THREE.Face3(3, 6, 8),
		new THREE.Face3(3, 8, 9),
		new THREE.Face3(4, 9, 5),
		new THREE.Face3(2, 4, 11),
		new THREE.Face3(6, 2, 10),
		new THREE.Face3(8, 6, 7),
		new THREE.Face3(9, 8, 1)
	);

	mesh = new THREE.Mesh(geometry, material);
	icosahedron.add(mesh);
	scene.add(icosahedron);

	icosahedron.position.set(x, y, z);

	return icosahedron;
}

function createBase(x, y, z) {
	'use strict';

	var base = new THREE.Object3D();
	var geometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 16);
	var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: false });
	//TODO 3 different mesh types and not just 1
	var mesh = new THREE.Mesh(geometry, material);

	base.add(mesh);
	scene.add(base);
	mesh.position.set(x, y, z);

	return base;
}
