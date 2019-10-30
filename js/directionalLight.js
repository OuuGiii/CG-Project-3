function createDirectionalLight(x, y, z) {
	'use strict';
	// white directional light, supposed to illuminate the whole scene
	var directionalLight = new THREE.DirectionalLight(0xff0000, 1);
	directionalLight.position.set(x, y, z);
    
	directionalLight.castShadow = true;
    

	directionalLight.turnTheSwitch = function() {
		'use strict';
		this.visible = !this.visible;
		console.log('Turned the directional light' + (this.visible == true ? ' ON' : ' OFF'));
	};
	
	directionalLight.turnTheShadows = function() {
		'use strict';
		this.castShadow = !this.castShadow;
		console.log('Turned the shadows' + (this.shadows == true ? 'ON' : 'OFF'));
	}

	scene.add(directionalLight);

	return directionalLight;
}