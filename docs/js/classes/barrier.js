class Barrier {
	constructor(x, y, width, height, angle) {
		this.position = createVector(x, y);
		this.width = width || 0;
		this.height = height || 0;
		this.angle = angle || 0;
		this.vertices = [{
			x: this.position.x - this.width / 2,
			y: this.position.y - this.height / 2
		}, {
			x: this.position.x + this.width / 2,
			y: this.position.y - this.height / 2
		}, {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}, {
			x: this.position.x - this.width / 2,
			y: this.position.y + this.height / 2
		}];

		this.updateVertices();
	}

	render() {
		noFill();
		stroke(255);
		strokeWeight(1);
		beginShape();
		for (let vert of this.vertices) {
			vertex(vert.x, vert.y);
		}
		endShape(CLOSE);
	}

	updateVertices() {
		//Movement
		this.vertices = [{
			x: this.position.x - this.width / 2,
			y: this.position.y - this.height / 2
		}, {
			x: this.position.x + this.width / 2,
			y: this.position.y - this.height / 2
		}, {
			x: this.position.x + this.width / 2,
			y: this.position.y + this.height / 2
		}, {
			x: this.position.x - this.width / 2,
			y: this.position.y + this.height / 2
		}];

		//Rotation
		for (let vert of this.vertices) {
			let x = (vert.x - this.position.x) * cos(this.angle) - (vert.y - this.position.y) * sin(this.angle);
			vert.y = (vert.x - this.position.x) * sin(this.angle) + (vert.y - this.position.y) * cos(this.angle);
			vert.x = x;
			vert.x += this.position.x;
			vert.y += this.position.y;
		}
	}

	collides(vertices) {
		for (var i = 0; i < this.vertices.length; i++) {
			let lineAPointA = this.vertices[i];
			let lineAPointB = this.vertices[(i + 1) % this.vertices.length];
			for (var j = 0; j < vertices.length; j++) {
				let lineBPointA = vertices[j];
				let lineBPointB = vertices[(j + 1) % vertices.length];
				if (Game.utils.intersects(lineAPointA.x, lineAPointA.y, lineAPointB.x, lineAPointB.y, lineBPointA.x, lineBPointA.y, lineBPointB.x, lineBPointB.y)) {
					return {
						pointA: lineAPointA,
						pointB: lineAPointB
					}
				}
			}
		}

		return null;
	}

	update() {
		this.updateVertices();
	}
}