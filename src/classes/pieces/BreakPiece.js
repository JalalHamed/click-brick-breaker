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

const diffs = getColorsDifferences(
  COLORS.brick.heaviest,
  COLORS.brick.lightest
);

class BreakPiece extends Piece {
  constructor(props) {
    super(props);
    this.color = getStandardColor(props.color);
    this.isGoingUp = this.color === COLORS.brick.heaviest ? true : false;
    this.steps = Math.floor(this.D_T_T_B_F) + 1 / 0.02;

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
    else
      this.color = `rgb(${red}, ${green - velocity[0]}, ${blue - velocity[1]})`;
  }

  draw() {
    this.update();
    this.updateColor();
    if (this.transparency === 0) this.selfDestruct();

    C.fillStyle = `${this.color.slice(0, -1)}, ${this.transparency})`;
    C.fillRect(
      this.pos.x,
      this.pos.y,
      SIZES.pieces.brick.width,
      SIZES.pieces.brick.height
    );
  }

  selfDestruct() {
    state.pieces.bricks = state.pieces.bricks.filter(
      piece => piece.id !== this.id
    );
  }
}

export default BreakPiece;
