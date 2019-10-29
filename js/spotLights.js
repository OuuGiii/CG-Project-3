function createSpotLight(x, y, z) {
	'use strict';
	// white spotlight shining from the side, casting a shadow

	var spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(x, y, z);

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	spotLight.turnTheSwitch = function() {
		this.visible = !this.visible;
		console.log('Turned the ' + this.name + (this.visible == true ? ' ON' : ' OFF'));
	};

	scene.add(spotLight);

	return spotLight;
}
