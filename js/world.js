var COLORS = {
	BROWN: 0x845938,
	BLACK: 0x000000,
	WHITE: 0xffffff,
	GRAY: 0x808080,
	RED: 0xff0000,
	GREEN: 0x00ff00
};

var ROOM_MATERIAL = {
	FLOOR: {
		BASIC: new THREE.MeshBasicMaterial({ color: 0x845938, wireframe: false }),
		LAMBERT: new THREE.MeshLambertMaterial({ color: 0x845938, wireframe: false }),
		PHONG: new THREE.MeshPhongMaterial({ color: 0x845938, wireframe: false })
	},
	WALL: {
		BASIC: new THREE.MeshBasicMaterial({ color: 0x8cd3ee, wireframe: false }),
		LAMBERT: new THREE.MeshLambertMaterial({ color: 0x8cd3ee, wireframe: false }),
		PHONG: new THREE.MeshPhongMaterial({ color: 0x8cd3ee, wireframe: false })
	},
	BASE: {
		BASIC: new THREE.MeshBasicMaterial({ color: COLORS.WHITE, wireframe: false }),
		LAMBERT: new THREE.MeshLambertMaterial({ color: COLORS.WHITE, wireframe: false }),
		PHONG: new THREE.MeshPhongMaterial({ color: COLORS.WHITE, wireframe: false, shininess: 100 })
	}
};

function createRoom() {
	'use strict';

	var room = new THREE.Object3D();

	room.floor = createFloor(0, 0, 0);
	room.fence = createFence();
	room.base = createBase(0, 1, 0);

	room.add(room.floor);
	room.add(room.fence);
	room.add(room.base);

	room.changeMaterial = function(material_type) {
		var floor_material = getCorrectMaterial(ROOM_MATERIAL.FLOOR, material_type);
		var wall_material = getCorrectMaterial(ROOM_MATERIAL.WALL, material_type);
		var base_material = getCorrectMaterial(ROOM_MATERIAL.BASE, material_type);

		this.floor.material = floor_material;

		this.fence.leftWall.material = wall_material;
		this.fence.backWall.material = wall_material;

		this.base.material = base_material;
		console.log('Changed room material');
	};

	scene.add(room);
	return room;
}

function createFence() {
	'use strict';

	var fence = new THREE.Object3D();

	fence.leftWall = createWall(fence, Math.PI / 2, 0, 5, -10);
	fence.backWall = createWall(fence, 0, -10, 5, 0);

	return fence;
}

function createFloor(x, y, z) {
	'use strict';
	var geometry = new THREE.CubeGeometry(0.01, 20, 20);
	var floor = new THREE.Mesh(geometry, ROOM_MATERIAL.FLOOR.BASIC);

	floor.position.set(x, y, z);
	floor.rotation.z = Math.PI / 2;

	return floor;
}

function createWall(fence, rotation, x, y, z) {
	'use strict';
	var geometry = new THREE.CubeGeometry(1, 10, 20);
	var wall = new THREE.Mesh(geometry, ROOM_MATERIAL.WALL.BASIC);

	wall.position.set(x, y, z);
	wall.rotation.y = rotation;

	fence.add(wall);
	return wall;
}

function createBase(x, y, z) {
	'use strict';
	var geometry = new THREE.CylinderGeometry(2, 2, 2, 16);
	var base = new THREE.Mesh(geometry, ROOM_MATERIAL.BASE.BASIC);

	base.position.set(x, y, z);

	scene.add(base);

	return base;
}
