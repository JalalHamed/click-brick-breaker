// Class
import Projectile from './Projectile.js';
// Constructor Instances
import topBorder from './borders/topBorder.js';
import bottomBorder from './borders/bottomBorder.js';
import coefficient from './coefficient.js';
// Functions
import genBonusColor from '../functions/generators/genBonusColor.js';
import { haveAllTheProjectilesLanded, getID } from '../functions/helpers.js';
// Configs
import { COLORS, SIZES, C, MERGING_VELOCITY as M_V } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI =>
  topBorder.heightFromTop + SIZES.brick.height / 2 + state.grid.column[gCI];

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.id = getID('bonus');
    this.mode = props.mode || 'regular';
    this.color = COLORS.bonus;

    this.particleRadius = this.mode === 'zoom-in' ? 0 : SIZES.projectile.radius;

    this.radiusVelocity = SIZES.bonus.radius / 20;
    this.velocity = { x: M_V, y: 10 };
    this.gridIndex = { row: this.props.gridRowIndex, column: 0 };
    this.pos = {
      x: state.grid.row[this.gridIndex.row] + SIZES.brick.width / 2,
      y: calcYPos(this.gridIndex.column),
      nextY: calcYPos(this.gridIndex.column + 1),
    };
  }

  zoomIn() {
    if (this.particleRadius + this.radiusVelocity < SIZES.projectile.radius)
      this.particleRadius += this.radiusVelocity;
    else {
      this.particleRadius = SIZES.projectile.radius;
      this.mode = 'regular';
      state.isBringingDown.bonuses = true;
    }
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
    if (!Number.isInteger(this.steps)) this.calcSteps();
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
    if (this.mode === 'zoom-in') this.zoomIn();
    if (this.mode === 'drop') this.drop();
    if (this.mode === 'merge' && haveAllTheProjectilesLanded()) this.merge();

    // bonus particle
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.particleRadius, 0, 2 * Math.PI);
    C.fillStyle = this.color;
    C.fill();

    // bonus ring
    if (this.mode === 'regular') {
      C.beginPath();
      C.setLineDash([]);
      C.arc(
        this.pos.x,
        this.pos.y,
        state.bonusRingRadius + SIZES.border.height / 2,
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
