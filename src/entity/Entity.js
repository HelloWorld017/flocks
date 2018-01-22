import Collider from "../math/Collider";
import Transform from "../math/Transform";

class Entity {
	constructor(world, x, y) {
		this.world = world;

		this.angle = 0;
		this.color = '#fff';

		this.x = x;
		this.y = y;

		this.id = world.spawnEntity(this);
	}

	render(renderer) {
		renderer.fillPolygon(
			Transform.rotate(this.boundModel, this.angle - Math.PI / 2, {x: this.x, y: this.y}),
			this.color
		);
	}

	update() {

	}

	collides(entity) {
		return Collider.testCollision(this.boundModel, entity.boundModel);
	}

	distance(point) {
		return Math.abs(point.x - this.x) + Math.abs(point.y - this.y); //Math.hypot(point.x - this.x, point.y - this.y)
	}

	get boundModel() {
		return [];
	}
}

export default Entity;
