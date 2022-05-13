// Class
import Projectile from './Projectile.js';
import increscent from './increscent.js';
// Constructor Instances
import topBorder from './borders/topBorder.js';
import bottomBorder from './borders/bottomBorder.js';
import coefficient from './coefficient.js';
// Functions
import {
  getID,
  convertRGBtoArr,
  getColorsDifferences,
  getBonusYPos,
} from '../functions/helpers.js';
// Configs
import {
  COLORS,
  SIZES,
  C,
  MERGING_VELOCITY as M_V,
  DROPPING_VELOCITY as D_V,
} from '../config.js';
// State
import state from '../state.js';

const colorsDifference = getColorsDifferences(COLORS.bonus, COLORS.projectile);

export default class Bonus {
  constructor(props) {
    this.props = props;

    this.id = getID('bonus');
    this.mode = props.mode || 'stable';
    this.color = COLORS.bonus;
    this.steps = null;

    this.particleRadius = this.mode === 'zoom-in' ? 0 : SIZES.projectile.radius;

    this.radiusVelocity = SIZES.bonus.radius / 20;
    this.velocity = { x: M_V, y: D_V };
    this.gridIndex = { row: this.props.gridRowIndex, column: 0 };
    this.pos = {
      x: state.grid.row[this.gridIndex.row] + SIZES.brick.width / 2,
      y: getBonusYPos(this.gridIndex.column),
      nextY: getBonusYPos(this.gridIndex.column + 1),
    };
  }

  zoomIn() {
    if (this.particleRadius + this.radiusVelocity < SIZES.projectile.radius)
      this.particleRadius += this.radiusVelocity;
    else {
      this.particleRadius = SIZES.projectile.radius;
      this.mode = 'lower';
      if (state.bonuses.some(bonus => bonus.mode === 'stable'))
        state.bonuses
          .filter(bonus => bonus.mode === 'stable')
          .forEach(bonus => (bonus.mode = 'lower'));
    }
  }

  calcSteps() {
    this.steps = Math.floor(
      Math.abs(this.pos.x - state.projectile.pos.x) / this.velocity.x
    );
  }

  updateYPos() {
    this.gridIndex.column++;
    this.pos.y = getBonusYPos(this.gridIndex.column);
    this.pos.nextY = getBonusYPos(this.gridIndex.column + 1);
  }

  getColor() {
    const cBC = convertRGBtoArr(this.color);
    const getRGB = index => +cBC[index] + colorsDifference[index] / this.steps;
    return `rgb(${getRGB(0)}, ${
      +cBC[1] - colorsDifference[1] / this.steps
    }, ${getRGB(2)})`;
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
    this.color = this.getColor();
    if (this.pos.x - this.velocity.x > state.projectile.pos.x)
      this.pos.x -= this.velocity.x;
    else if (this.pos.x + this.velocity.x < state.projectile.pos.x)
      this.pos.x += this.velocity.x;
    else {
      coefficient.increaseCount();
      increscent.mode = 'rise';
      state.projectiles.push(new Projectile());
      this.selfDestruct();
    }
  }

  draw() {
    if (this.mode === 'zoom-in') this.zoomIn();
    if (this.mode === 'drop') this.drop();
    if (
      this.mode === 'merge' &&
      state.projectiles.every(projectile => projectile.mode === 'stable')
    )
      this.merge();

    // bonus particle
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.particleRadius, 0, 2 * Math.PI);
    C.fillStyle = this.color;
    C.fill();

    // bonus ring
    if (this.mode !== 'drop' && this.mode !== 'merge') {
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
      y: getBonusYPos(this.gridIndex.column),
      nextY: getBonusYPos(this.gridIndex.column + 1),
    };
  }

  selfDestruct() {
    state.bonuses = state.bonuses.filter(bonus => bonus.id !== this.id);
  }
}
