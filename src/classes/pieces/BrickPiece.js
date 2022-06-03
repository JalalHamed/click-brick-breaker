// Classes
import Piece from './Piece.js';
// Functions
import {
	convertRGBtoArr,
	getBrickPiecePos,
	getColorsDifferences,
	getStandardColor,
} from '../../helpers.js';
// Configs
import { C, CANVAS, COLORS, SIZES } from '../../config.js';
// State
import state from '../../state.js';

const diffs = getColorsDifferences(COLORS.brick.heaviest, COLORS.brick.lightest);

class BrickPiece extends Piece {
	constructor(props) {
		super(props);
		this.color = state.isFirstRound ? COLORS.brick.heaviest : COLORS.brick.lightest;
		this.isGoingUp = state.isFirstRound ? true : false;
		this.steps = Math.floor(this.D_T_T_B_F) + 1 / 0.02; // distance to take before fade + distance to take after fade

		this.pos = {
			x: props.pos.x + getBrickPiecePos(props.index).x,
			y: props.pos.y + getBrickPiecePos(props.index).y,
		};
	}

	updateColor() {
		const [red, green, blue] = convertRGBtoArr(this.color);
		const velocity = [diffs[1] / this.steps, diffs[2] / this.steps];
		if (this.isGoingUp)
			this.color = `rgb(${red}, ${green + velocity[0]}, ${blue + velocity[1]})`;
		else this.color = `rgb(${red}, ${green - velocity[0]}, ${blue - velocity[1]})`;
	}

	draw() {
		this.update();
		this.updateColor();
		if (this.transparency === 0) this.selfDestruct('bricks', this.id);

		C.fillStyle = `${this.color.slice(0, -1)}, ${this.transparency})`;
		C.fillRect(
			this.pos.x,
			this.pos.y,
			SIZES.pieces.brick.width,
			SIZES.pieces.brick.height
		);
	}
}

export default BrickPiece;
