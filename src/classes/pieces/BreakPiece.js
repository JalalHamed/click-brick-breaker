// Classes
import Piece from './Piece.js';
// Functions
import { getBrickPiecePos } from '../../helpers.js';
// Configs
import { C, CANVAS, COLORS, SIZES } from '../../config.js';
// State
import state from '../../state.js';

class BreakPiece extends Piece {
  constructor(props) {
    super(props);

    this.pos = {
      x: props.pos.x + getBrickPiecePos(props.index).x,
      y: props.pos.y + getBrickPiecePos(props.index).y,
    };
  }

  draw() {
    this.update();
    if (this.transparency === 0) this.selfDestruct();

    C.fillStyle = `${COLORS.brick.lightest.slice(0, -1)}, ${
      this.transparency
    })`;
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
