var phi = (1 + 5 ** -0.5) / 2;

//TODO set vertices offset to make geometry irregular

function createIcosahedron(x, y, z) {
	'use strict';

	var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: false });
	var geometry = new THREE.Geometry();
	//TODO 3 different mesh types and not just 1
	var mesh,
		icosahedron = new THREE.Object3D();

	geometry.vertices.push(
		//ordered 0 to 11 by order of insertion
		new THREE.Vector3(0, 1, phi),
		new THREE.Vector3(0, 1, -phi),
		new THREE.Vector3(0, -1, phi),
		new THREE.Vector3(0, -1, -phi),
		new THREE.Vector3(phi, 0, 1),
		new THREE.Vector3(-phi, 0, 1),
		new THREE.Vector3(phi, 0, -1),
		new THREE.Vector3(-phi, 0, -1),
		new THREE.Vector3(1, phi, 0),
		new THREE.Vector3(1, -phi, 0),
		new THREE.Vector3(-1, phi, 0),
		new THREE.Vector3(-1, -phi, 0)
	);

	geometry.faces.push(
		//all faces added individually (HELP: plot vertices online in order above and connect vertices)
		new THREE.Face3(0, 1, 8),
		new THREE.Face3(0, 10, 1),
		new THREE.Face3(0, 8, 4),
		new THREE.Face3(0, 4, 5),
		new THREE.Face3(0, 5, 10),
		new THREE.Face3(1, 6, 8),
		new THREE.Face3(1, 7, 6),
		new THREE.Face3(1, 10, 7),
		new THREE.Face3(10, 5, 7),
		new THREE.Face3(8, 9, 4),
		new THREE.Face3(2, 3, 9),
		new THREE.Face3(2, 11, 3),
		new THREE.Face3(2, 4, 9),
		new THREE.Face3(2, 5, 4),
		new THREE.Face3(2, 11, 5),
		new THREE.Face3(3, 9, 6),
		new THREE.Face3(3, 6, 7),
		new THREE.Face3(3, 7, 11),
		new THREE.Face3(10, 5, 11),
		new THREE.Face3(8, 6, 9)
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
