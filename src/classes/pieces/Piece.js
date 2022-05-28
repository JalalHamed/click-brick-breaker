// Functions
import { decrease } from '../../helpers.js';
// Configs
import { PIECE_DISTANCE_TO_TAKE_BEFORE_FADE as P_D_T_T_B_F } from '../../config.js';
// State
import state from '../../state.js';

class Piece {
  constructor(props) {
    this.id = props.id;
    this.transparency = 1;
    this.D_T_T_B_F = P_D_T_T_B_F; // distance to take before fade

    this.pos = { x: 0, y: 0 };

    this.velocity = { x: Math.random() * 2 - 1, y: Math.random() * 3 + 2 };
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;

    this.D_T_T_B_F = decrease(this.D_T_T_B_F, 1, 0);

    if (this.D_T_T_B_F === 0)
      this.transparency = decrease(this.transparency, 0.02, 0);
  }

  selfDestruct(arr, id) {
    state.pieces[arr] = state.pieces[arr].filter(piece => piece.id !== id);
  }
}

export default Piece;
