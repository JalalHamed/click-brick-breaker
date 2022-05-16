// Classes
import Projectile from './Projectile.js';
import BonusPiece from './pieces/BonusPiece.js';
// Objects
import increscent from './increscent.js';
import bottomBorder from './borders/bottomBorder.js';
import coefficient from './coefficient.js';
// Functions
import {
  getID,
  convertRGBtoArr,
  getColorsDifferences,
  getBonusYPos,
  getXDist,
} from '../helpers.js';
// Configs
import { COLORS, SIZES, C, VELOCITY } from '../config.js';
// State
import state from '../state.js';

const colorsDifference = getColorsDifferences(COLORS.bonus, COLORS.projectile);

export default class Bonus {
  constructor(props) {
    this.id = getID('bonus');
    this.mode = props.mode || 'stable';
    this.color = COLORS.bonus;
    this.steps = null;
    this.radius = this.mode === 'zoom-in' ? 0 : SIZES.projectile.radius;
    this.hasCollapsed = false;

    this.gridIndex = { row: props.gridRowIndex, column: 0 };
    this.velocity = {
      x: VELOCITY.merging,
      y: VELOCITY.dropping,
      radius: SIZES.bonus.radius / 20,
    };

    this.pos = {
      x: state.grid.row[this.gridIndex.row] + SIZES.brick.width / 2,
      y: getBonusYPos(this.gridIndex.column),
      nextY: getBonusYPos(this.gridIndex.column + 1),
    };
  }

  calcSteps() {
    this.steps = Math.floor(
      Math.abs(this.pos.x - state.projectile.pos.x) / this.velocity.x
    );
  }

  calcXVelocity() {
    if (this.id !== state.furthestBonus.id)
      this.velocity.x /=
        getXDist(state.furthestBonus, state.projectile) /
        getXDist(this, state.projectile);
  }

  updateYPos() {
    this.gridIndex.column++;
    this.pos.y = getBonusYPos(this.gridIndex.column);
    this.pos.nextY = getBonusYPos(this.gridIndex.column + 1);
  }

  getColor() {
    const cBC = convertRGBtoArr(this.color);
    const getRGB = index => cBC[index] + colorsDifference[index] / this.steps;
    return `rgb(${getRGB(0)}, ${
      cBC[1] - colorsDifference[1] / this.steps
    }, ${getRGB(2)})`;
  }

  zoomIn() {
    if (this.radius + this.velocity.radius < SIZES.projectile.radius)
      this.radius += this.velocity.radius;
    else {
      this.radius = SIZES.projectile.radius;
      this.mode = 'lower';
      if (state.bonuses.some(bonus => bonus.mode === 'stable'))
        state.bonuses
          .filter(bonus => bonus.mode === 'stable')
          .forEach(bonus => (bonus.mode = 'lower'));
    }
  }

  collide() {
    this.collapse();
    this.mode = 'drop';
  }

  collapse() {
    for (let i = 0; i < 24; i++)
      state.pieces.bonuses.push(
        new BonusPiece({ index: i, id: this.id, pos: this.pos })
      );
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
      state.furthestBonus = {};
      state.projectiles.push(new Projectile());
      this.selfDestruct();
    }
  }

  straightMerge() {
    if (!this.hasCollapsed) {
      this.collapse();
      this.hasCollapsed = true;
    }

    const angle = Math.atan2(
      state.projectile.pos.y - this.pos.y,
      state.projectile.pos.x - this.pos.x
    );
    this.velocity.x = Math.cos(angle) * VELOCITY.merging;
    this.velocity.y = Math.sin(angle) * VELOCITY.merging;

    if (this.pos.y + this.velocity.y < state.projectile.pos.y)
      this.pos.y += this.velocity.y;
    else this.pos.y = state.projectile.pos.y;
    if (
      this.pos.x + this.velocity.x < state.projectile.pos.x ||
      this.pos.x + this.velocity.x > state.projectile.pos.x + SIZES.bonus.radius
    )
      this.pos.x += this.velocity.x;
    else this.pos.x = state.projectile.pos.x;

    if (
      this.pos.y === state.projectile.pos.y &&
      this.pos.x === state.projectile.pos.x
    ) {
      coefficient.increaseCount();
      state.mergingBonusesCount++;
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
    if (this.mode === 'straight-merge') this.straightMerge();

    // Particle
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
    C.fillStyle = this.color;
    C.fill();

    // Ring
    if (
      this.mode !== 'drop' &&
      this.mode !== 'merge' &&
      this.mode !== 'straight-merge'
    ) {
      C.beginPath();
      C.setLineDash([]);
      C.arc(
        this.pos.x,
        this.pos.y,
        state.bonusRingRadius + SIZES.bonus.ring.lineWidth / 2,
        0,
        2 * Math.PI
      );
      C.lineWidth = SIZES.bonus.ring.lineWidth;
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
