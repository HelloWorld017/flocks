import EntityBird from "./entity/EntityBird";
import World from "./world/World";

class FlockSimulator {
	constructor(canvas, n=10, interval=20) {
		this.n = n;
		this.world = undefined;
		this.canvas = canvas;
		this.interval = interval;

		this.loopFunction = this.loop.bind(this);

		this.stopped = false;
	}

	simulate() {
		const world = new World(this.canvas);

		for(let i = 0; i < this.n; i++) {
			const entity = new EntityBird(world);
		}

		this.world = world;

		this.loop();
	}

	stop() {
		this.stopped = true;
	}

	loop() {
		if(this.stopped) return;

		this.world.tick();
		setTimeout(this.loopFunction, this.interval);
	}
}

export default FlockSimulator;
