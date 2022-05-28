// Configs
import { CANVAS, C } from '../config.js';

class FPS {
	constructor() {
		this.lastRun = performance.now();
	}

	get calcFps() {
		let delta = (performance.now() - this.lastRun) / 1000;
		this.lastRun = performance.now();
		return 1 / delta;
	}

	draw() {
		C.fillStyle = 'Black';
		C.font = '1rem Arial';
		C.fillText(Math.floor(this.calcFps) + ' fps', CANVAS.width - 35, 20);
	}
}

export default new FPS();
