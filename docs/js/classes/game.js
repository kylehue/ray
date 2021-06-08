class Game {
	constructor() {
		this.camera = new Camera2D(drawingContext, {
			zoomTransitionSpeed: 0.1,
			moveTransitionSpeed: 0.05
		});

		this.mouse = createVector();
	}

	setup() {
		this.world = new World();

		const wallWidth = 20;
		//Top wall
		this.world.barriers.push(new Barrier(
			0,
			this.world.bounds.min.y + wallWidth / 2,
			this.world.bounds.width - wallWidth * 2,
			wallWidth
		));

		//Right wall
		this.world.barriers.push(new Barrier(
			this.world.bounds.max.x - wallWidth / 2,
			this.world.bounds.min.y + this.world.bounds.height / 2,
			wallWidth,
			this.world.bounds.height
		));

		//Bottom wall
		this.world.barriers.push(new Barrier(
			0,
			this.world.bounds.max.y - wallWidth / 2,
			this.world.bounds.width - wallWidth * 2,
			wallWidth
		));

		//Left wall
		this.world.barriers.push(new Barrier(
			this.world.bounds.min.x + wallWidth / 2,
			this.world.bounds.min.y + this.world.bounds.height / 2,
			wallWidth,
			this.world.bounds.height
		));

		//Add other barriers
		for (var i = 0; i < 10; i++) {
			let pos = this.world.getRandomPosition();
			let bw = random(20, 150);
			let bh = random(20, 150);
			let ba = random(-PI, PI);
			let barrier = new Barrier(pos.x, pos.y, bw, bh, ba);

			//Make sure the barrier doesn't collide with other barriers
			for (var j = 0; j < this.world.barriers.length; j++) {
				if (barrier.collides(this.world.barriers[j].vertices)) {
					pos = this.world.getRandomPosition();
					bw = random(20, 150);
					bh = random(20, 150);
					ba = random(-PI, PI);
					barrier = new Barrier(pos.x, pos.y, bw, bh, ba);
					j = 0;
				}
			}

			this.world.barriers.push(barrier);
		}

		//Add balls
		let minRadius = 5;
		let maxRadius = 15;
		for(var i = 0; i < 40; i++){
			let pos = this.world.getRandomPosition();
			let radius = random(minRadius, maxRadius);
			let ball = new Ball(pos.x, pos.y, radius);

			//Make sure ball doesn't spawn inside the barriers
			for (var j = 0; j < this.world.barriers.length; j++) {
				let barrier = this.world.barriers[j];
				if (barrier.collides(ball.vertices)) {
					pos = this.world.getRandomPosition();
					radius = random(minRadius, maxRadius);
					ball = new Ball(pos.x, pos.y, radius);
					j = 0;
				}
			}

			this.world.balls.push(ball);
		}

	}

	render() {
		this.camera.begin();
		let movement = this.world.mouse.copy();
		movement.limit(20)
		this.camera.moveTo(movement.x, movement.y);

		this.camera.zoomTo(width / 2 + this.world.size);
		this.world.render();
		this.camera.end();
	}

	update() {

		this.world.update();
	}

	static utils = {
		intersects: function(x1, y1, x2, y2, x3, y3, x4, y4) {
			let tn = (x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4);
			let td = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
			let t = tn / td;
			let un = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);
			let ud = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
			let u = un / ud;
			return t < 1 && t > 0 && u > 0 && u < 1;
		}
	}
}