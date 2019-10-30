function createRoom() {
	'use strict';

	var room = new THREE.Object3D();

	room.floor = createFloor(0, 0, 0);
	room.fence = createFence();
	room.base = createBase(0, 1, 0);

	room.add(room.floor);
	room.add(room.fence);
	room.add(room.base);

	scene.add(room);
}

function createFence() {
	'use strict';

	var fence = new THREE.Object3D();

	createWall(fence, Math.PI / 2, 0, 5, -10);
	createWall(fence, 0, -10, 5, 0);

	return fence;
}

function createFloor(x, y, z) {
	'use strict';

	var floor = new THREE.Object3D();

	var material = new THREE.MeshBasicMaterial({ color: 0x845938, wireframe: false });
	var geometry = new THREE.CubeGeometry(0.01, 20, 20);
	var mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.z = Math.PI / 2;

	floor.add(mesh);

	return floor;
}

function createWall(fence, rotation, x, y, z) {
	'use strict';

	var material = new THREE.MeshBasicMaterial({ color: 0x8CD3EE, wireframe: false });
	var geometry = new THREE.CubeGeometry(1, 10, 20);
	var mesh = new THREE.Mesh(geometry, material);

	mesh.position.set(x, y, z);
	mesh.rotation.y = rotation;
	fence.add(mesh);
}

/*room.changeMaterialBasic = function() {
		'use strict';
		//change base material
		this.base.material = this.base.materials[0];
	
		//change floor material
		this.floor.material = new THREE.MeshBasicMaterial({ color: 0x845938, wireframe: false });
	
		//change fence material
		this.fence.material = new THREE.MeshBasicMaterial({ color: 0x8CD3EE, wireframe: false });
	};
	
	room.changeMaterialLambert = function() {
		'use strict';
		//change base material
		this.base.material = this.base.materials[1];
	
		//change floor material
		this.floor.material = new THREE.MeshLambertMaterial({ color: 0x845938, wireframe: false });
	
		//change fence material
		this.fence.material = new THREE.MeshLambertMaterial({ color: 0x8CD3EE, wireframe: false });
	};
	
	room.changeMaterialPhong = function() {
		'use strict';
		//change base material
		this.base.material = this.base.materials[2];
	
		//change floor material
		this.floor.material = new THREE.MeshPhongMaterial({ color: 0x845938, wireframe: false });
	
		//change fence material
		this.fence.material = new THREE.MeshPhongMaterial({ color: 0x8CD3EE, wireframe: false });
	};
*/
