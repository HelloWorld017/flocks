import FlockSimulator from "./FlockSimulator";

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.targetX = window.innerWidth / 2;
window.targetY = window.innerHeight / 2;

const simulator = new FlockSimulator(canvas);
simulator.simulate();

window.simulator = simulator;

window.addEventListener('mousemove', (evt) => {
	window.targetX = evt.clientX;
	window.targetY = evt.clientY;
});
