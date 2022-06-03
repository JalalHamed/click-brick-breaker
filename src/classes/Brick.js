// Classes
import BrickPiece from './pieces/BrickPiece.js';
// Objects
import score from './statistics/score.js';
import topBorder from './borders/topBorder.js';
// Functions
import {
	getID,
	getBrickYPos,
	convertRGBtoArr,
	getColorsDifferences,
} from '../helpers.js';
// Configs
import {
	C,
	COLORS,
	SIZES,
	BRICK_COLOR_RETRIEVE_DELAY as B_C_R_D,
	GAME_COUNTER_MAX_VALUE as G_C_M_V,
} from '../config.js';
// State
import state from '../state.js';

export default class Brick {
	constructor(props) {
		this.id = getID('brick');
		this.mode = props.mode || 'stable';
		this.weight = state.isFirstRound ? score.count : score.count + 1;
		this.color = COLORS.brick.heaviest;
		this.counter = 0;

		this.gridIndex = { row: 0, column: props.gridColumnIndex };

		this.couldCollide = { bottom: true, left: true, right: true };

		this.size = {
			width: this.mode === 'zoom-in' ? 0 : SIZES.brick.width,
			height: this.mode === 'zoom-in' ? 0 : SIZES.brick.height,
		};

		this.endpoint = {
			x: state.grid.column[this.gridIndex.column],
			y: getBrickYPos(this.gridIndex.row),
		};

		this.pos = {
			x: this.endpoint.x + (this.mode === 'zoom-in' ? SIZES.brick.width / 2 : 0),
			y: this.endpoint.y + (this.mode === 'zoom-in' ? SIZES.brick.height / 2 : 0),
			nextY: getBrickYPos(this.gridIndex.row + 1),
		};

		this.velocity = { x: SIZES.brick.width / 25, y: SIZES.brick.height / 25 };
	}

	corner(corner) {
		switch (corner) {
			case 'top-left':
				return [this.pos.x, this.pos.y];
			case 'top-right':
				return [this.pos.x + SIZES.brick.width, this.pos.y];
			case 'bottom-left':
				return [this.pos.x, this.pos.y + SIZES.brick.height];
			case 'bottom-right':
				return [this.pos.x + SIZES.brick.width, this.pos.y + SIZES.brick.height];
			default:
				return;
		}
	}

	lower() {
		this.gridIndex.row++;
		this.pos.y = getBrickYPos(this.gridIndex.row);
		this.pos.nextY = getBrickYPos(this.gridIndex.row + 1);
	}

	updateColor() {
		const difference = (state.isFirstRound ? 1 : score.count + 1) - this.weight;
		const brickColorDifferences = getColorsDifferences(
			COLORS.brick.heaviest,
			COLORS.brick.lightest
		);
		const green = brickColorDifferences[1] / score.count;
		const blue = brickColorDifferences[2] / score.count;
		if (difference > 0)
			return `rgb(255, ${80 + difference * green}, ${80 + difference * blue})`;
		else return COLORS.brick.heaviest;
	}

	retrieveColor() {
		this.color = this.updateColor();
		this.counter = 0;
	}

	collide() {
		this.weight--;

		// Change the color, displaying the hit
		if (!convertRGBtoArr(this.color)[3] && state.counter < G_C_M_V - B_C_R_D) {
			this.color = `${this.color.slice(0, -1)}, 0.6)`;
			this.counter = state.counter;
		}

		if (this.weight === 0) {
			this.collapse();
			this.selfDestruct();
		}
	}

	collapse() {
		for (let i = 0; i < 24; i++)
			state.pieces.bricks.push(
				new BrickPiece({
					index: i,
					id: this.id,
					pos: this.pos,
					color: this.color,
				})
			);
	}

	zoomIn() {
		const isDone = { x: false, y: false };

		const update = (coord, dimension) => {
			if (this.pos[coord] - this.velocity[coord] > this.endpoint[coord]) {
				this.pos[coord] -= this.velocity[coord];
				this.size[dimension] += this.velocity[coord] * 2;
			} else {
				this.pos[coord] = this.endpoint[coord];
				this.size[dimension] = SIZES.brick[dimension];
				isDone[coord] = true;
			}
		};

		update('x', 'width');
		update('y', 'height');

		if (isDone.x && isDone.y) {
			this.mode = 'lower';
			if (state.bricks.some(brick => brick.mode === 'stable'))
				state.bricks
					.filter(brick => brick.mode === 'stable')
					.forEach(brick => (brick.mode = 'lower'));
		}
	}

	draw() {
		if (this.mode === 'zoom-in') this.zoomIn();
		if (this.counter && this.counter + B_C_R_D < state.counter) this.retrieveColor();

		C.fillStyle = this.color;
		C.fillRect(this.pos.x, this.pos.y, this.size.width, this.size.height);
		C.font = `${SIZES.font}rem play`;
		C.fillStyle = '#fff';
		C.textAlign = 'center';
		C.textBaseline = 'middle';
		C.fillText(
			this.weight,
			state.grid.column[this.gridIndex.column] + SIZES.brick.width / 2,
			this.mode === 'zoom-in'
				? getBrickYPos(this.gridIndex.row) + SIZES.brick.height / 2
				: this.pos.y + SIZES.brick.height / 2
		);
	}

	rePoSize() {
		this.pos = {
			x: state.grid.column[this.gridIndex.column],
			y: getBrickYPos(this.gridIndex.row),
			nextY: getBrickYPos(this.gridIndex.row + 1),
		};

		this.size.width = SIZES.brick.width;
		this.size.height = SIZES.brick.height;
	}

	selfDestruct() {
		state.bricks = state.bricks.filter(brick => brick.id !== this.id);
	}
}
