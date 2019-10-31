var phi = (1 + Math.sqrt(5)) / 2;
var offset = 0.4;

var COLORS = {
	BROWN: 0x845938,
	BLACK: 0x000000,
	WHITE: 0xffffff,
	GRAY: 0x808080,
	RED: 0xff0000,
	GREEN: 0x00ff00
};

var SCULPTURE_MATERIAL = {
	BASIC: new THREE.MeshBasicMaterial({ color: COLORS.RED, vertexColors: THREE.FaceColors, wireframe: false }),
	LAMBERT: new THREE.MeshLambertMaterial({ color: COLORS.RED, wireframe: false }),
	PHONG: new THREE.MeshPhongMaterial({ color: COLORS.RED, wireframe: false, shininess: 100 })
};

//TODO set vertices offset to make geometry irregular

function createIcosahedron(x, y, z) {
	'use strict';

	var geometry = new THREE.Geometry();

	geometry.vertices.push(
		new THREE.Vector3(-1, phi + offset, 0),
		new THREE.Vector3(1 + offset, phi, 0),
		new THREE.Vector3(-1, -phi, 0 + offset),
		new THREE.Vector3(1 + offset, -phi, 0),
		new THREE.Vector3(0 + offset, -1, phi),
		new THREE.Vector3(0, 1 + offset, phi),
		new THREE.Vector3(0, -1, -phi + offset),
		new THREE.Vector3(0 + offset, 1, -phi),
		new THREE.Vector3(phi + offset, 0, -1),
		new THREE.Vector3(phi, 0 + offset, 1),
		new THREE.Vector3(-phi + offset, 0, -1),
		new THREE.Vector3(-phi + offset, 0, 1)
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

	//adds diferent shades (or colors if material color is white) to the figure
	for (var i = 0; i < 20; i++) geometry.faces[i].color = new THREE.Color(Math.random() * 0xffffff);
	geometry.computeFaceNormals();
	var icosahedron = new THREE.Mesh(geometry, SCULPTURE_MATERIAL.BASIC);
	icosahedron.rotating = {
				left: false,
				right: false
	};
	icosahedron.position.set(x, y, z);

	icosahedron.changeMaterial = function(material_type) {
		var icosahedron_material = getCorrectMaterial(SCULPTURE_MATERIAL, material_type);

		this.material = icosahedron_material;
		console.log('Changed icosahedron material');
	};

	scene.add(icosahedron);

	return icosahedron;
}

function sculptureMovement(icosahedron) {
	if (icosahedron.rotating.left) icosahedron.rotation.y -= 0.1;
	if (icosahedron.rotating.right) icosahedron.rotation.y += 0.1;
}
