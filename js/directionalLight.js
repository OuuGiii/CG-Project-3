function createDirectionalLight(x, y, z) {
	'use strict';
	// white directional light, supposed to illuminate the whole scene
	var directionalLight = new THREE.DirectionalLight(0xff0000, 1);
	directionalLight.position.set(x, y, z);
    
	directionalLight.castShadow = true;
    

	directionalLight.turnTheSwitch = function() {
		this.visible = !this.visible;
		console.log('Turned the ' + this.name + (this.visible == true ? ' ON' : ' OFF'));
	};

	scene.add(directionalLight);

	return directionalLight;
}