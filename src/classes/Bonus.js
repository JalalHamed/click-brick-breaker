// Constructor Instances
import topBorder from './borders/topBorder.js';
import bottomBorder from './borders/bottomBorder.js';
// Functions
import genID from '../functions/generators/genID.js';
// Configs
import { COLORS, SIZES, C, MERGING_VELOCITY as M_V } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI =>
  topBorder.heightFromTop + SIZES.brick.height / 2 + state.grid.column[gCI];

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.mode = 'regular';
    this.id = genID('bonus');
    this.steps = 0;
    this.color = COLORS.bonus;

    this.gridColumnIndex = 0;
    this.gridRowIndex = this.props.gridRowIndex;

    this.pos = {
      x: state.grid.row[this.gridRowIndex] + SIZES.brick.width / 2,
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.gridColumnIndex + 1),
    };

    this.velocity = { x: M_V, y: 10 };
  }

  calcSteps() {
    this.steps = Math.floor(
      Math.abs(this.pos.x - state.projectile.pos.x) / this.velocity.x
    );
  }

  updateYPos() {
    this.gridColumnIndex++;
    this.pos.y = calcYPos(this.gridColumnIndex);
    this.pos.nextY = calcYPos(this.gridColumnIndex + 1);
  }

  drop() {
    if (this.pos.y < bottomBorder.pos.y - SIZES.projectile.radius)
      this.pos.y += 10;
    else {
      this.pos.y = bottomBorder.pos.y - SIZES.projectile.radius;
      this.mode = 'merge';
      state.mergingBonuses.push(this);
      state.mergingBonusesCount++;
      this.selfDestruct();
    }
  }

  draw() {
    if (this.mode === 'drop') this.drop();

    // bonus particle
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, SIZES.bonus.radius, 0, 2 * Math.PI);
    C.fillStyle = this.color;
    C.fill();

    // bonus ring
    if (this.mode === 'regular') {
      C.beginPath();
      C.setLineDash([]);
      C.arc(
        this.pos.x,
        this.pos.y,
        state.bonusRingRadius + SIZES.border.height / 2, // ring's width will be drawn from the middle going half way in and half way out, so ring's radius plus half of it's width puts the ring right outside of the bonus particle.
        0,
        2 * Math.PI
      );
      C.lineWidth = SIZES.border.height;
      C.strokeStyle = this.color;
      C.stroke();
    }
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.gridRowIndex] + SIZES.brick.width / 2,
      y: calcYPos(this.gridColumnIndex),
      nextY: calcYPos(this.props.gridColumnIndex + 1),
    };
  }

  selfDestruct() {
    state.bonuses = state.bonuses.filter(item => item.id !== this.id);
  }
}
