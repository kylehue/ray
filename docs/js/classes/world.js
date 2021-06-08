class World {
	constructor() {
		this.size = 700;
		this.bounds = {
			min: {
				x: -this.size / 2,
				y: -this.size / 2
			},
			max: {
				x: this.size / 2,
				y: this.size / 2
			},
			width: this.size,
			height: this.size
		};

		this.mouse = createVector();
		this.barriers = [];
		this.balls = [];
		this.ray = new Ray;
		this.lightColor = color("#fff49b").levels;
	}

	render() {
		noStroke();
		fill(0);
		beginShape();
		rect(this.bounds.min.x, this.bounds.min.y, this.bounds.width, this.bounds.height);
		endShape();

		for (let barrier of this.barriers) {
			barrier.render();
		}

		fill(this.lightColor[0], this.lightColor[1], this.lightColor[2]);
		noStroke();
		let rayVertices = this.ray.getVertices();
		beginShape();
		for (let vert of rayVertices) {
			vertex(vert.x, vert.y);
		}
		endShape();
		drawingContext.clip();
		for (let ball of this.balls) {
			ball.render();
		}

		/*noFill();
		stroke(255, 255, 0, 100);
		strokeWeight(1);
		beginShape();
		for (let cast of this.ray.casts) {
			vertex(this.ray.position.x, this.ray.position.y);
			vertex(cast.x, cast.y);
		}
		endShape();*/

	}

	update() {
		let mouse = game.camera.screenToWorld(mouseX, mouseY);
		this.mouse.set(mouse.x, mouse.y);

		for (let barrier of this.barriers) {
			barrier.update();
		}

		for (let ball of this.balls) {
			ball.update();
		}

		//Add barriers to ray
		this.ray.barriers = [];
		for (let barrier of this.barriers) {
			for (var i = 0; i < barrier.vertices.length; i++) {
				let linePointA = barrier.vertices[i];
				let linePointB = barrier.vertices[(i + 1) % barrier.vertices.length];
				this.ray.addBarrier(linePointA.x, linePointA.y, linePointB.x, linePointB.y);
			}
		}

		this.ray.position = this.mouse;
		this.ray.cast();
	}

	addBarrier(x, y, width, height, angle) {
		const barrier = new Barrier(x, y, width, height, angle);
		this.barriers.push(barrier);
		return barrier;
	}

	getRandomPosition() {
		return createVector(random(this.bounds.min.x, this.bounds.max.x), random(this.bounds.min.y, this.bounds.max.y));
	}
}