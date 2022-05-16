// Classes
import Piece from './Piece.js';
// Functions
import { getBrickPiecePos } from '../../helpers.js';
// Configs
import { C, CANVAS, COLORS, SIZES } from '../../config.js';

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

    C.fillStyle = `rgb(240, 160, 120, ${this.transparency})`;
    C.fillRect(this.pos.x, this.pos.y, SIZES.piece.width, SIZES.piece.height);
  }
}

export default BreakPiece;
