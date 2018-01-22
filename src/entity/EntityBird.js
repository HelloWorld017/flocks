import Entity from "./Entity";
import Palette from "../renderer/Palette";

class EntityBird extends Entity {
	constructor(world, {x, y, angle, width, threshold, color} = {
		x: Math.random() * world.width,
		y: Math.random() * world.height,
		angle: Math.random() * Math.PI * 2,
		width: Math.random() * 20 + 10,
		threshold: Math.random() * 40 + 20,
		color: Palette.randomChoice()
	}) {
		super(world, x, y);

		this.width = width;
		this.height = width * 3;

		this.angle = angle;
		this.motion = {x: 0, y: 0, angle: 0};
		this.threshold = threshold;
		this.color = color;
	}

	nearestNeighbors(count=5) {
		return this.world.entities
			.slice()
			.sort((p1, p2) => this.distance(p1) - this.distance(p2))
			.slice(0, count);
	}

	update() {
		const nn = this.nearestNeighbors(5);
		const {x, y, angle} = nn.reduce((prev, curr) => {
			prev.x += curr.x;
			prev.y += curr.y;
			prev.angle += curr.angle;

			return prev;
		}, {x: 0, y: 0, angle: 0});

		this.motion.angle /= 30;
		this.motion.angle += (angle / 5 - this.angle) / 20;


		let angleBase = undefined;

		if(this.x <= this.threshold) {
			angleBase = 0;
			if(this.y <= this.threshold) {
				angleBase = 1 / 4 * Math.PI;
			} else if (this.y >= this.world.height - this.threshold) {
				angleBase = 7 / 4 * Math.PI;
			}
		} else if (this.x >= this.world.width - this.threshold) {
			angleBase = Math.PI;
			if(this.y <= this.threshold) {
				angleBase = 3 / 4 * Math.PI;
			} else if (this.y >= this.world.height - this.threshold) {
				angleBase = 5 / 4 * Math.PI;
			}
		} else {
			if(this.y <= this.threshold) {
				angleBase = Math.PI / 2;
			} else if (this.y >= this.world.height - this.threshold) {
				angleBase = Math.PI * 3 / 2;
			}
		}

		if(angleBase !== undefined) {
			this.angle += (angleBase + Math.PI / 4 * Math.random() - Math.PI / 8) - this.angle;
		}

		//this.motion.x += (x / 5 - this.x) / 80;
		//this.motion.y += (y / 5 - this.y) / 80;

		this.motion.angle += (Math.atan2(y / 5 - this.y, x / 5 - this.x) - this.angle) / 3;

		if (this.distance(nn[0]) < this.threshold) {
			this.motion.angle += (Math.atan2(this.y - nn[0].y + Math.random() - 0.5,
				this.x - nn[0].x + Math.random() - 0.5) - this.angle);

			//this.motion.x += (this.x - nn[0].x + Math.random() - 0.5) * .5;
			//this.motion.y += (this.y - nn[0].y + Math.random() - 0.5) * .5;
		}

		this.motion.angle += (Math.atan2(window.targetY - this.y, window.targetX - this.x)) / 10;

		this.angle += Math.tanh(this.motion.angle) * 0.2;

		this.motion.x = Math.cos(this.angle);
		this.motion.y = Math.sin(this.angle);

		this.x += this.motion.x;
		this.y += this.motion.y;

		this.x = Math.max(0, Math.min(this.world.width, this.x));
		this.y = Math.max(0, Math.min(this.world.height, this.y));

		while(this.angle < 0) this.angle += Math.PI * 2;

		this.angle = this.angle % (Math.PI * 2);
	}

	get boundModel() {
		return [
			{x: this.x, y: this.y - this.height / 3 * 2},
			{x: this.x - this.width / 2, y: this.y + this.height / 3},
			{x: this.x + this.width / 2, y: this.y + this.height / 3}
		];
	}
}

export default EntityBird;
