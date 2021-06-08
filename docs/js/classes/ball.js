class Ball {
	constructor(x, y, radius) {
		this.position = createVector(x, y);
		this.velocity = p5.Vector.random2D();
		this.speed = random(0.3, 2);
		this.velocity.mult(this.speed);
		this.radius = radius;
		this.vertices = [];
		this.color = "#e95667";
		this.updateVertices();
	}

	render() {
		fill(this.color);
		noStroke();
		beginShape();
		circle(this.position.x, this.position.y, this.radius * 2);
		endShape();
	}

	handleBarrierCollisions() {
		for (let barrier of game.world.barriers) {
			let collision = barrier.collides(this.vertices);
			if (collision) {
				let lineAngle = atan2(collision.pointA.y - collision.pointB.y, collision.pointA.x - collision.pointB.x);
				let x = cos(lineAngle + PI / 2);
				let y = sin(lineAngle + PI / 2);
				let mag = p5.Vector.mag({
					x: x,
					y: y,
					z: 0
				});
				this.velocity.x = x * mag * this.speed;
				this.velocity.y = y * mag * this.speed;
				break;
			}
		}
	}

	updateVertices() {
		const sides = max(this.radius / 5, 10);
		this.vertices = [];
		for (var angle = -PI; angle < PI; angle += TAU / sides) {
			this.vertices.push({
				x: this.position.x + cos(angle) * this.radius,
				y: this.position.y + sin(angle) * this.radius
			})
		}
	}

	update() {
		this.position.add(this.velocity);
		this.updateVertices();
		this.handleBarrierCollisions();
	}
}