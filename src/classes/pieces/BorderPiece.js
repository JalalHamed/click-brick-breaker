// Classes
import Piece from './Piece.js';
// Configs
import { C, COLORS } from '../../config.js';

class BorderPiece extends Piece {
  constructor(props) {
    super(props);

    this.pos = { x: 0, y: 0 };
  }

  update() {
    this.pos.y -= 1;
  }

  draw() {
    // this.update();

    C.fillStyle = COLORS.border;
    C.fillRect(
      this.pos.x,
      this.pos.y,
      SIZES.pieces.border.width,
      SIZES.pieces.border.height
    );
  }
}

export default BorderPiece;
