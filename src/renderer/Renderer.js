class Renderer {
	constructor(ctx) {
		this.ctx = ctx;
	}

	clear() {
		this.ctx.fillStyle = '#222';
		this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
	}

	fillPolygon(polygon, color="#000") {
		this.ctx.beginPath();
		this.ctx.moveTo(polygon[0].x, polygon[0].y);

		polygon.reduce((prev, curr) => {
			this.ctx.lineTo(curr.x, curr.y);

			return curr;
		}, polygon[0]);

		this.ctx.fillStyle = color;
		this.ctx.fill();
		this.ctx.closePath();
	}
}

export default Renderer;
