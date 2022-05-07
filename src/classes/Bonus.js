// Class
import Projectile from './Projectile.js';
// Constructor Instances
import topBorder from './borders/topBorder.js';
import bottomBorder from './borders/bottomBorder.js';
import coefficient from './coefficient.js';
// Functions
import genID from '../functions/generators/genID.js';
import genBonusColor from '../functions/generators/genBonusColor.js';
import { haveAllTheProjectilesLanded } from '../functions/helpers.js';
// Configs
import { COLORS, SIZES, C, MERGING_VELOCITY as M_V } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI =>
  topBorder.heightFromTop + SIZES.brick.height / 2 + state.grid.column[gCI];

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.id = genID('bonus');
    this.mode = 'regular';
    this.color = COLORS.bonus;

    this.velocity = { x: M_V, y: 10 };
    this.gridIndex = { row: this.props.gridRowIndex, column: 0 };
    this.pos = {
      x: state.grid.row[this.gridIndex.row] + SIZES.brick.width / 2,
      y: calcYPos(this.gridIndex.column),
      nextY: calcYPos(this.gridIndex.column + 1),
    };
  }

  calcSteps() {
    this.steps = Math.floor(
      Math.abs(this.pos.x - state.projectile.pos.x) / this.velocity.x
    );
  }

  updateYPos() {
    this.gridIndex.column++;
    this.pos.y = calcYPos(this.gridIndex.column);
    this.pos.nextY = calcYPos(this.gridIndex.column + 1);
  }

  drop() {
    if (
      this.pos.y + SIZES.projectile.radius + this.velocity.y <
      bottomBorder.pos.y
    )
      this.pos.y += this.velocity.y;
    else {
      this.mode = 'merge';
      this.pos.y = bottomBorder.pos.y - SIZES.projectile.radius;
      state.mergingBonusesCount++;
    }
  }

  merge() {
    this.color = genBonusColor(this);
    if (this.pos.x - this.velocity.x > state.projectile.pos.x)
      this.pos.x -= this.velocity.x;
    else if (this.pos.x + this.velocity.x < state.projectile.pos.x)
      this.pos.x += this.velocity.x;
    else {
      coefficient.increaseCount();
      state.isMoving.increscent = true;
      state.projectiles.push(new Projectile());
      this.selfDestruct();
    }
  }

  draw() {
    if (this.mode === 'drop') this.drop();
    if (this.mode === 'merge' && haveAllTheProjectilesLanded())
      if (this.steps) this.merge();
      else this.calcSteps();

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
      x: state.grid.row[this.gridIndex.row] + SIZES.brick.width / 2,
      y: calcYPos(this.gridIndex.column),
      nextY: calcYPos(this.gridIndex.column + 1),
    };
  }

  selfDestruct() {
    state.bonuses = state.bonuses.filter(bonus => bonus.id !== this.id);
  }
}
