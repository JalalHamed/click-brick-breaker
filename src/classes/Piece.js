// Functions
import { decrease, getPiecePos } from '../functions/helpers.js';
// Configs
import {
  C,
  CANVAS,
  COLORS,
  SIZES,
  PIECE_DISTANCE_TO_TAKE_BEFORE_FADE as P_D_T_T_B_F,
} from '../config.js';
// State
import state from '../state.js';

class Piece {
  constructor(props) {
    this.props = props;

    this.id = props.id;
    this.transparency = 1;
    this.D_T_T_B_F = P_D_T_T_B_F; // distance to take before fade

    this.velocity = { x: Math.random() - 0.5, y: 5 };
    this.pos = {
      x: props.pos.x + getPiecePos(props.index).x,
      y: props.pos.y + getPiecePos(props.index).y,
    };

    console.log(this.id);
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    this.D_T_T_B_F = decrease(this.D_T_T_B_F, 1, 0);

    if (this.D_T_T_B_F <= 0)
      this.transparency = decrease(this.transparency, 0.02, 0);
  }

  draw() {
    this.update();
    if (this.pos.y > CANVAS.height) this.selfDestruct();

    C.fillStyle = `rgb(240, 160, 120, ${this.transparency})`;
    C.fillRect(this.pos.x, this.pos.y, SIZES.piece.width, SIZES.piece.height);
  }

  repoSize() {
    this.pos = {
      x: props.pos.x + getPieceRow(props.index),
      y: props.pos.y + getPieceColumn(props.index),
    };
  }

  selfDestruct() {
    state.pieces = state.pieces.filter(piece => piece.id !== this.id);
  }
}

export default Piece;
