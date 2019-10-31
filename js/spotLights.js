var LIGHT_COLORS = {
	ON: 0xffffff,
	OFF: 0x6969669
};

function createSpotLight(x, y, z) {
	'use strict';
	// white spotlight shining from the side, casting a shadow
	var spotLight = new THREE.Object3D();

	spotLight.cone = createCone();
	spotLight.sphere = createSphere();
	spotLight.light = createLight();

	spotLight.sphere.add(spotLight.light);
	spotLight.cone.add(spotLight.sphere);
	spotLight.add(spotLight.cone);

	spotLight.turnTheSwitch = function() {
		'use strict';
		this.light.visible = !this.light.visible;

		if (this.light.visible === true) {
			this.sphere.material.color.setHex(LIGHT_COLORS.ON);
		} else {
			this.sphere.material.color.setHex(LIGHT_COLORS.OFF);
		}
		console.log('Turned the ' + this.name + (this.light.visible == true ? ' ON' : ' OFF'));
	};

	spotLight.position.set(x, y, z);

	scene.add(spotLight);

	return spotLight;
}

function createCone() {
	'use strict';
	var geometry = new THREE.ConeGeometry(0.5, 2, 32);
	var material = new THREE.MeshBasicMaterial({ color: 0x000000 });
	var cone = new THREE.Mesh(geometry, material);

	return cone;
}

function createSphere() {
	'use strict';
	var geometry = new THREE.SphereGeometry(0.5, 32, 32);
	var material = new THREE.MeshBasicMaterial({ color: LIGHT_COLORS.ON });
	var sphere = new THREE.Mesh(geometry, material);
	sphere.position.set(0, -1, 0);

	return sphere;
}

function createLight() {
	'use strict';
	var light = new THREE.SpotLight(0xffffff, 1.0, 300, 0.8, 0.1, 2);

	light.castShadow = true;

	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;

	light.shadow.camera.near = 100;
	light.shadow.camera.far = 4000;
	light.shadow.camera.fov = 300;
	return light;
}
