var phi = (1 + Math.sqrt(5)) / 2;
var offset = 0.4;

//TODO set vertices offset to make geometry irregular

function createIcosahedron(x, y, z) {
	'use strict';

	var icosahedron = new THREE.Object3D();
	icosahedron.materials = new Array(3);

	icosahedron.materials[0] = new THREE.MeshBasicMaterial({color: 0xff0000, vertexColors: THREE.FaceColors, wireframe: false });
	icosahedron.materials[1] = new THREE.MeshLambertMaterial( {color: 0x00ff00, wireframe: false });
	icosahedron.materials[2] = new THREE.MeshPhongMaterial( {color: 0x00ff00, wireframe: false , shininess: 100});

	var geometry = new THREE.Geometry();
	//TODO 3 different mesh types and not just 1

	icosahedron.rotating = false;

	geometry.vertices.push(
		new THREE.Vector3(-1,  phi + offset,  0),
		new THREE.Vector3( 1 + offset,  phi,  0),
		new THREE.Vector3(-1, -phi,  0 + offset),
		new THREE.Vector3( 1 + offset, -phi,  0),
		new THREE.Vector3( 0 + offset, -1,  phi),
		new THREE.Vector3( 0,  1 + offset,  phi),
		new THREE.Vector3( 0, -1, -phi + offset),
		new THREE.Vector3( 0 + offset,  1, -phi),
		new THREE.Vector3( phi + offset,  0, -1),
		new THREE.Vector3( phi,  0 + offset,  1),
		new THREE.Vector3(-phi + offset,  0, -1),
		new THREE.Vector3(-phi + offset,  0,  1)
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
	for(var i = 0; i < 20; i++)
		geometry.faces[i].color = new THREE.Color(Math.random() * 0xffffff);

	var mesh = new THREE.Mesh(geometry, icosahedron.materials[0]);
	icosahedron.add(mesh);
	scene.add(icosahedron);

	icosahedron.position.set(x, y, z);

	return icosahedron;
}

function createBase(x, y, z) {
	'use strict';

	var base = new THREE.Object3D();
	base.materials = new Array(3);
	base.materials[0] = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: false });
	base.materials[1] = new THREE.MeshLambertMaterial( {color: 0xffffff, wireframe: false });
	base.materials[2] = new THREE.MeshPhongMaterial( {color: 0xffffff, wireframe: false , shininess: 100});
	var geometry = new THREE.CylinderGeometry(2, 2, 2, 16);
	var mesh = new THREE.Mesh(geometry, base.materials[0]);

	base.add(mesh);
	scene.add(base);
	mesh.position.set(x, y, z);
	return base;
}

function sculptureMovement(icosahedron){
	if(icosahedron.rotating)
		icosahedron.rotation.y -= 0.1;
}
