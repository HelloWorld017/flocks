import Renderer from "../renderer/Renderer";

class World {
	constructor(canvas, width=canvas.width, height=canvas.height) {
		this.eid = 0;
		this.entities = [];

		this.width = width;
		this.height = height;
		this.renderer = new Renderer(canvas.getContext('2d'));
	}

	spawnEntity(entity) {
		const id = this.eid++;
		this.entities[id] = entity;

		return id;
	}

	removeEntity(entity) {
		this.entity[entity.id] = undefined;
	}

	tick() {
		this.renderer.clear();

		for(let v of this.entities) {
			if(v === undefined) continue;
			v.update();
			v.render(this.renderer);
		}
	}
}

export default World;
