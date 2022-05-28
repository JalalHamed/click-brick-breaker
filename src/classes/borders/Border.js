// Configs
import { SIZES, CANVAS, C, COLORS } from '../../config.js';

export default class Border {
	constructor() {
		this.pos = {
			x: 0,
		};

		this.width = CANVAS.width;
		this.height = SIZES.border.height;
	}

	draw() {
		this.width = CANVAS.width;
		C.fillStyle = COLORS.border;
		C.fillRect(this.pos.x, this.pos.y, this.width, this.height);
	}
}
