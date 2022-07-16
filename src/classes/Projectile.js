// Objects
import bottomBorder from './borders/bottomBorder.js';
// Functions
import { getID } from '../helpers.js';
// Configs
import { COLORS, SIZES, CANVAS, C, VELOCITY } from '../config.js';
// State
import state from '../state.js';

export default class Projectile {
	constructor(props) {
		this.id = getID('projectile');
		this.mode = 'stable';

		this.radius = SIZES.projectile.radius;

		this.pos = {
			x: state.getLS('projectile') || CANVAS.width / 2,
			y: bottomBorder.pos.y - this.radius,
		};

		this.velocity = { x: 0, y: 0 };
	}

	getSidePoint(side) {
		switch (side) {
			case 'left':
				return this.pos.x - this.radius;
			case 'top':
				return this.pos.y - this.radius;
			case 'right':
				return this.pos.x + this.radius;
			case 'bottom':
				return this.pos.y + this.radius;
			default:
				return;
		}
	}

	merge() {
		if (this.pos.x + VELOCITY.merging < state.projectile.pos.x)
			this.pos.x += VELOCITY.merging;
		else if (this.pos.x - VELOCITY.merging > state.projectile.pos.x)
			this.pos.x -= VELOCITY.merging;
		else {
			this.pos.x = state.projectile.pos.x;
			this.mode = 'stable';
		}
	}

	draw() {
		if (this.mode === 'merge') this.merge();

		C.beginPath();
		C.setLineDash([]);
		C.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
		C.fillStyle = COLORS.projectile;
		C.fill();
	}

	update() {
		this.pos.x += this.velocity.x;
		this.pos.y += this.velocity.y;
	}

	rePoSize() {
		this.radius = SIZES.projectile.radius;

		this.pos = {
			x: (this.pos.x * innerWidth) / state.innerWidth,
			y: bottomBorder.pos.y - SIZES.projectile.radius,
		};

		state.setLS({ projectile: this.pos.x });
	}
}
