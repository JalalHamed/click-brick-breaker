// Classes
import Piece from './Piece.js';
// Functions
import { getBonusPiecePos } from '../../helpers.js';
// Configs
import { C, CANVAS, COLORS, SIZES } from '../../config.js';
// State
import state from '../../state.js';

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
    if (this.transparency === 0) this.selfDestruct();

    C.fillStyle = `${COLORS.bonus.slice(0, -1)}, ${this.transparency})`;
    C.fillRect(
      this.pos.x,
      this.pos.y,
      SIZES.pieces.bonus.width,
      SIZES.pieces.bonus.height
    );
  }

  selfDestruct() {
    state.pieces.bonuses = state.pieces.bonuses.filter(
      piece => piece.id !== this.id
    );
  }
}

export default BonusPiece;
