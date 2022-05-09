// Functions
import { getID, getPieceColumn, getPieceRow } from '../functions/helpers.js';
// Configs
import { C, CANVAS, SIZES } from '../config.js';
// State
import state from '../state.js';

class Piece {
  constructor(props) {
    this.props = props;

    this.id = getID('piece');

    this.velocity = { x: Math.random() - 0.5, y: 5 };
    this.pos = {
      x: props.pos.x + getPieceRow(props.index),
      y: props.pos.y + getPieceColumn(props.index),
    };
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  draw() {
    this.update();
    if (this.pos.y > CANVAS.height) this.selfDestruct();

    C.fillStyle = 'rgb(240, 160, 120)';
    C.fillRect(this.pos.x, this.pos.y, SIZES.piece.width, SIZES.piece.height);
  }

  repoSize() {}

  selfDestruct() {
    state.pieces = state.pieces.filter(piece => piece.id !== this.id);
  }
}

export default Piece;
