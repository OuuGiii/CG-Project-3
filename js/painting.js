function createPainting(x, y, z) {
	'use strict';
	var painting = new THREE.Object3D();

	painting.width = 15;
	painting.height = 7;

	painting.frame = createFrame(painting);
	painting.picture = createPicture(painting);

	painting.position.set(x, y, z);

	scene.add(painting);

	return painting;
}

function createFrame(painting) {
	'use strict';
	var frame = new THREE.Object3D();

	frame.widthOfFramePart = 0.5;
	frame.depthOfFramePart = 0.1;

	var positionOfLeftFramePart = 0 - (painting.width - frame.widthOfFramePart) / 2;
	var positionOfRightFramePart = 0 + (painting.width - frame.widthOfFramePart) / 2;
	var positionOfTopFramePart = 0 + (painting.height - frame.widthOfFramePart) / 2;
	var positionOfBottomFramePart = 0 - (painting.height - frame.widthOfFramePart) / 2;

	frame.left = createFramePart(frame, frame.widthOfFramePart, painting.height, frame.depthOfFramePart, positionOfLeftFramePart, 0, 0);
	frame.right = createFramePart(frame, frame.widthOfFramePart, painting.height, frame.depthOfFramePart, positionOfRightFramePart, 0, 0);
	frame.top = createFramePart(frame, painting.width, frame.widthOfFramePart, frame.depthOfFramePart, 0, positionOfTopFramePart, 0);
	frame.bottom = createFramePart(frame, painting.width, frame.widthOfFramePart, frame.depthOfFramePart, 0, positionOfBottomFramePart, 0);

	painting.add(frame);

	return frame;
}

function createFramePart(frame, width, height, depth, x, y, z) {
	'use strict';
	var framePart = new THREE.Object3D();

	var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
	var geometry = new THREE.CubeGeometry(width, height, depth);
	var mesh = new THREE.Mesh(geometry, material);

	framePart.add(mesh);
	framePart.position.set(x, y, z);

	frame.add(framePart);

	return framePart;
}

function createPicture(painting) {
	'use strict';
	var picture = new THREE.Object3D();

	picture.width = painting.width - 2 * painting.frame.widthOfFramePart;
	picture.height = painting.height - 2 * painting.frame.widthOfFramePart;

	picture.background = createPictureBackground(picture);
	picture.dots = createPictureDots(picture);
	picture.lines = createPictureLines(picture);

	painting.add(picture);

	return picture;
}

function createPictureBackground(picture) {
	'use strict';
	var background = new THREE.Object3D();

	var geometry = new THREE.BoxGeometry(picture.width, picture.height, 0.049);
	var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
	var box = new THREE.Mesh(geometry, material);

	background.add(box);

	picture.add(background);

	return background;
}

function createPictureDots(picture) {
	'use strict';
	var leftRange = 0 - (picture.width - 1) / 2;
	var rightRange = 0 + (picture.width - 1) / 2;
	var topRange = 0 + (picture.height - 1) / 2;
	var bottomRange = 0 - (picture.height - 1) / 2;

	var pictureDots = [];

	for (var y = bottomRange; y <= topRange; y += 1) {
		for (var x = leftRange; x <= rightRange; x += 1) {
			createPictureDot(picture, pictureDots, x, y);
		}
	}

	return pictureDots;
}

function createPictureDot(picture, pictureDots, x, y) {
	'use strict';
	var dot = new THREE.Object3D();

	var geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.05);
	var material = new THREE.MeshBasicMaterial({ color: 0xffffff });
	var cylinder = new THREE.Mesh(geometry, material);

	cylinder.rotation.x = Math.PI / 2;

	dot.add(cylinder);
	dot.position.set(x, y, 0);

	picture.add(dot);

	pictureDots.push(dot);
}

function createPictureLines(picture) {
	'use strict';
	var leftRange = 0 - (picture.width - 1) / 2;
	var rightRange = 0 + (picture.width - 1) / 2;
	var topRange = 0 + (picture.height - 1) / 2;
	var bottomRange = 0 - (picture.height - 1) / 2;

	var pictureLines = [];

	for (var y = bottomRange; y <= topRange; y += 1) {
		createHorizontalPictureLine(picture, pictureLines, y);
	}
	for (var x = leftRange; x <= rightRange; x += 1) {
		createVerticalPictureLine(picture, pictureLines, x);
	}

	return pictureLines;
}

function createHorizontalPictureLine(picture, pictureLines, y) {
	'use strict';
	var line = new THREE.Object3D();

	var geometry = new THREE.BoxGeometry(picture.width, 0.185, 0.0495);
	var material = new THREE.MeshBasicMaterial({ color: 0x808080 });
	var cube = new THREE.Mesh(geometry, material);

	line.add(cube);
	line.position.set(0, y, 0);

	picture.add(line);

	pictureLines.push(line);
}

function createVerticalPictureLine(picture, pictureLines, x) {
	'use strict';
	var line = new THREE.Object3D();

	var geometry = new THREE.BoxGeometry(0.185, picture.height, 0.0495);
	var material = new THREE.MeshBasicMaterial({ color: 0x808080 });
	var cube = new THREE.Mesh(geometry, material);

	line.add(cube);
	line.position.set(x, 0, 0);

	picture.add(line);

	pictureLines.push(line);
}
