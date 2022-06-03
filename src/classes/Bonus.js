// Classes
import Projectile from './Projectile.js';
import BonusPiece from './pieces/BonusPiece.js';
// Objects
import increscent from './increscent.js';
import bottomBorder from './borders/bottomBorder.js';
import coefficient from './coefficient.js';
// Functions
import {
	getID,
	convertRGBtoArr,
	getColorsDifferences,
	getBonusYPos,
	getXDist,
} from '../helpers.js';
// Configs
import { COLORS, SIZES, C, VELOCITY } from '../config.js';
// State
import state from '../state.js';

const colorsDifference = getColorsDifferences(COLORS.bonus, COLORS.projectile);

export default class Bonus {
	constructor(props) {
		this.id = getID('bonus');
		this.mode = props.mode || 'stable';
		this.color = COLORS.bonus;
		this.steps = null;
		this.hasRingCollapsed = false;
		this.radius = this.mode === 'zoom-in' ? 0 : SIZES.projectile.radius;

		this.gridIndex = { row: 0, column: props.gridColumnIndex };

		this.pos = {
			x: state.grid.column[this.gridIndex.column] + SIZES.brick.width / 2,
			y: getBonusYPos(this.gridIndex.row),
			nextY: getBonusYPos(this.gridIndex.row + 1),
		};

		this.velocity = {
			x: VELOCITY.merging,
			y: VELOCITY.dropping,
			radius: SIZES.bonus.radius / 20,
		};
	}

	calcSteps() {
		this.steps = Math.floor(
			Math.abs(this.pos.x - state.projectile.pos.x) / this.velocity.x
		);
	}

	calcVelocity() {
		// X Velocity
		if (this.id !== state.furthest.bonus.id)
			this.velocity.x /=
				getXDist(state.furthest.bonus, state.projectile) /
				getXDist(this, state.projectile);

		// Y Velocity
		const angle = Math.atan2(
			state.projectile.pos.y - this.pos.y,
			state.projectile.pos.x - this.pos.x
		);
		this.velocity.y = Math.sin(angle) * VELOCITY.merging;
	}

	lower() {
		this.gridIndex.row++;
		this.pos.y = getBonusYPos(this.gridIndex.row);
		this.pos.nextY = getBonusYPos(this.gridIndex.row + 1);
	}

	updateColor() {
		if (!Number.isInteger(this.steps)) this.calcSteps();

		const colors = convertRGBtoArr(this.color); // [Red, Green, Blue]

		const getRGB_Plus = index => colors[index] + colorsDifference[index] / this.steps;
		const getRGB_Minus = index => colors[index] - colorsDifference[index] / this.steps;

		this.color = `rgb(${getRGB_Plus(0)}, ${getRGB_Minus(1)}, ${getRGB_Plus(2)})`;
	}

	zoomIn() {
		if (this.radius + this.velocity.radius < SIZES.projectile.radius)
			this.radius += this.velocity.radius;
		else {
			this.radius = SIZES.projectile.radius;
			this.mode = 'lower';
			if (state.bonuses.some(bonus => bonus.mode === 'stable'))
				state.bonuses
					.filter(bonus => bonus.mode === 'stable')
					.forEach(bonus => (bonus.mode = 'lower'));
		}
	}

	collapseRing() {
		for (let i = 0; i < 24; i++)
			state.pieces.bonuses.push(new BonusPiece({ index: i, id: this.id, pos: this.pos }));
		this.hasRingCollapsed = true;
	}

	drop() {
		if (this.pos.y + SIZES.projectile.radius + this.velocity.y < bottomBorder.pos.y)
			this.pos.y += this.velocity.y;
		else {
			this.mode = 'merge';
			this.pos.y = bottomBorder.pos.y - SIZES.projectile.radius;
		}
	}

	merge() {
		if (!this.hasRingCollapsed) this.collapseRing();

		this.updateColor();

		// Update pos
		if (this.pos.y < state.projectile.pos.y) this.pos.y += this.velocity.y;

		if (this.pos.x - this.velocity.x > state.projectile.pos.x)
			this.pos.x -= this.velocity.x;
		else if (this.pos.x + this.velocity.x < state.projectile.pos.x)
			this.pos.x += this.velocity.x;
		else {
			coefficient.increaseCount();
			increscent.mode = 'rise';
			state.furthest.bonus = {};
			state.projectiles.push(new Projectile());
			this.selfDestruct();
		}
	}

	draw() {
		if (this.mode === 'zoom-in') this.zoomIn();
		if (this.mode === 'drop') this.drop();
		if (
			this.mode === 'merge' &&
			state.projectiles.every(projectile => projectile.mode === 'stable')
		)
			this.merge();

		// Particle
		C.beginPath();
		C.setLineDash([]);
		C.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
		C.fillStyle = this.color;
		C.fill();

		// Ring
		if (!this.hasRingCollapsed) {
			C.beginPath();
			C.setLineDash([]);
			C.arc(
				this.pos.x,
				this.pos.y,
				state.bonusRingRadius + SIZES.bonus.ring.lineWidth / 2,
				0,
				2 * Math.PI
			);
			C.lineWidth = SIZES.bonus.ring.lineWidth;
			C.strokeStyle = this.color;
			C.stroke();
		}
	}

	rePoSize() {
		this.pos = {
			x: state.grid.column[this.gridIndex.column] + SIZES.brick.width / 2,
			y: getBonusYPos(this.gridIndex.row),
			nextY: getBonusYPos(this.gridIndex.row + 1),
		};

		this.radius = SIZES.projectile.radius;
	}

	selfDestruct() {
		state.bonuses = state.bonuses.filter(bonus => bonus.id !== this.id);
	}
}
