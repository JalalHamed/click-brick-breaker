// Classes
import Piece from './Piece.js';
// Functions
import { getBonusPiecePos } from '../../helpers.js';
// Configs
import { C, CANVAS, COLORS, SIZES } from '../../config.js';

class BonusPiece extends Piece {
  constructor(props) {
    super(props);

    this.pos = {
      x: props.pos.x + getBonusPiecePos(props.index).x,
      y: props.pos.y + getBonusPiecePos(props.index).y,
    };
  }

  draw() {
    this.update();
    if (this.transparency === 0) this.selfDestruct('bonuses', this.id);

    C.fillStyle = `${COLORS.bonus.slice(0, -1)}, ${this.transparency})`;
    C.fillRect(
      this.pos.x,
      this.pos.y,
      SIZES.pieces.bonus.width,
      SIZES.pieces.bonus.height
    );
  }
}

export default BonusPiece;
