class Palette {
	constructor() {
		this.palette = [
			'#ab47bc',
			'#ec407a',
			'#ef5350',
			'#ff7043',
			'#ffa726',
			'#ffca28',
			'#ffee58',
			'#d4e157',
			'#9ccc65',
			'#66bb6a',
			'#26a69a',
			'#26c6da',
			'#29b6f6',
			'#42a5f5',
			'#5c6bc0',
			'#7e57c2'
		];
	}

	randomChoice() {
		return this.palette[Math.floor(Math.random() * this.palette.length)];
	}
}

export default new Palette;
