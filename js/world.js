function createRoom(){
	'use strict';

	var room = new THREE.Object3D();

	room.floor = createFloor(room, 0, 0, 0);
	room.fence = createFence();
	room.base = createBase(0, 0, 0);

	room.add(room.floor);
	room.add(room.fence);
	room.add(room.base);

	scene.add(room);
}

function createFence(){
	'use strict';

	var fence = new THREE.Object3D();

	createWall(fence, Math.PI/2, 0, 5, -10);
	createWall(fence, 0, -10, 5, 0);

	return fence;
}

function createFloor(base, x, y, z){
	'use strict';

	var floor = new THREE.Object3D();

	var material = new THREE.MeshBasicMaterial({color: 0xFFFFFF, wireframe: true });
	var geometry = new THREE.PlaneGeometry(20, 20);
	var mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.x = Math.PI/2;

	floor.add(mesh);

	return floor;
}

function createWall(fence, rotation, x, y, z){
	'use strict';

	var material = new THREE.MeshBasicMaterial({color : 0xFFFFFF, wireframe: true});
	var geometry = new THREE.CubeGeometry(1, 10, 20);
	var mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.y = rotation;
	fence.add(mesh);
}
