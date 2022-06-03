// Classes
import Border from './Border.js';
// Configs
import { SIZES, CANVAS } from '../../config.js';

class TobBorder extends Border {
	constructor() {
		super();
		this.pos.y = SIZES.border.margin;
	}

	get heightFromTop() {
		return this.pos.y + this.height;
	}

	rePoSize() {
		this.width = CANVAS.width;
		this.height = SIZES.border.height;
		this.pos.y = SIZES.border.margin;
	}
}

export default new TobBorder();
