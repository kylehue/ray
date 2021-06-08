let game;


function setup() {
	createCanvas(innerWidth, innerHeight);
	disableFriendlyErrors = true;
	game = new Game();
	game.setup();
}

function draw() {
	background(0);
	fill(255);
	stroke(255);

	game.render();
	game.update();
}

function windowResized() {
	resizeCanvas(innerWidth, innerHeight);
}