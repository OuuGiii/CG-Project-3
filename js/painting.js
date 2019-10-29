function createPainting(x, y, z) {
	var painting = new THREE.Object3D();

	painting.frame = createFrame();
	painting.picture = createPicture();

	painting.add(painting.frame);
	painting.add(painting.picture);

	painting.position.set(x, y, z);

	scene.add(painting);
}

function createFrame() {
	var frame = new THREE.Object3D();

	frame.left = createFramePart(frame, 0.5, 6, 0.1, -4.25, 0, 0);
	frame.right = createFramePart(frame, 0.5, 6, 0.1, 4.25, 0, 0);
	frame.top = createFramePart(frame, 8, 0.5, 0.1, 0, 2.75, 0);
	frame.bottom = createFramePart(frame, 8, 0.5, 0.1, 0, -2.75, 0);

	return frame;
}

function createFramePart(frame, width, height, depth, x, y, z) {
	var framePart = new THREE.Object3D();

	var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
	var geometry = new THREE.CubeGeometry(width, height, depth);
	var mesh = new THREE.Mesh(geometry, material);

	framePart.add(mesh);
	framePart.position.set(x, y, z);

	frame.add(framePart);

	return framePart;
}

function createPicture() {
	var picture = new THREE.Object3D();

	picture.width = 8;
	picture.height = 5;

	picture.background = createPictureBackground(picture);
	picture.dots = createPictureDots(picture);
	picture.lines = createPictureLines(picture);

	return picture;
}

function createPictureBackground(picture) {
	var background = new THREE.Object3D();

	var geometry = new THREE.BoxGeometry(picture.width, picture.height, 0.049);
	var material = new THREE.MeshBasicMaterial({ color: 0x000000, wireframe: false });
	var box = new THREE.Mesh(geometry, material);

	background.add(box);

	picture.add(background);

	return background;
}

function createPictureDots(picture) {
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
	var line = new THREE.Object3D();

	var geometry = new THREE.BoxGeometry(8, 0.185, 0.0495);
	var material = new THREE.MeshBasicMaterial({ color: 0x808080 });
	var cube = new THREE.Mesh(geometry, material);

	line.add(cube);
	line.position.set(0, y, 0);

	picture.add(line);

	pictureLines.push(line);
}

function createVerticalPictureLine(picture, pictureLines, x) {
	var line = new THREE.Object3D();

	var geometry = new THREE.BoxGeometry(0.185, 5, 0.0495);
	var material = new THREE.MeshBasicMaterial({ color: 0x808080 });
	var cube = new THREE.Mesh(geometry, material);

	line.add(cube);
	line.position.set(x, 0, 0);

	picture.add(line);

	pictureLines.push(line);
}
