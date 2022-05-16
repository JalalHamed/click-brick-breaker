// Classes
import BreakPiece from './pieces/BreakPiece.js';
// Objects
import score from './statistics/score.js';
import topBorder from './borders/topBorder.js';
// Functions
import { getID, getBrickYPos, convertRGBtoArr } from '../helpers.js';
// Configs
import {
  SIZES,
  C,
  COLORS,
  BRICK_COLOR_RETRIEVE_DELAY as B_C_R_D,
  GAME_COUNTER_MAX_VALUE as G_C_M_V,
} from '../config.js';
// State
import state from '../state.js';

export default class Brick {
  constructor(props) {
    this.id = getID('brick');
    this.mode = props.mode || 'stable';
    this.weight = score.count;
    this.color = COLORS.brick.heaviest;
    this.counter = 0;

    this.gridIndex = { row: props.gridRowIndex, column: 0 };
    this.velocity = { x: SIZES.brick.width / 50, y: SIZES.brick.height / 50 };

    this.dimensions = {
      width: this.mode === 'zoom-in' ? 0 : SIZES.brick.width,
      height: this.mode === 'zoom-in' ? 0 : SIZES.brick.height,
    };
    this.endPos = {
      x: state.grid.row[this.gridIndex.row],
      y: getBrickYPos(this.gridIndex.column),
    };

    this.pos = {
      x: this.endPos.x + (this.mode === 'zoom-in' ? SIZES.brick.width / 2 : 0),
      y: this.endPos.y + (this.mode === 'zoom-in' ? SIZES.brick.height / 2 : 0),
      nextY: getBrickYPos(this.gridIndex.column + 1),
    };
  }

  updateYPos() {
    this.gridIndex.column++;
    this.pos.y = getBrickYPos(this.gridIndex.column);
    this.pos.nextY = getBrickYPos(this.gridIndex.column + 1);
  }

  updateColor() {
    const difference = score.count - this.weight;
    const GreenLightestMinusHeaviest = 80;
    const BlueLightestMinusHeaviest = 40;
    const g = GreenLightestMinusHeaviest / (score.count - 1);
    const b = BlueLightestMinusHeaviest / (score.count - 1);
    if (difference > 0)
      return `rgb(255, ${80 + difference * g}, ${80 + difference * b})`;
    else return COLORS.brick.heaviest;
  }

  retrieveColor() {
    this.color = this.updateColor();
    this.counter = 0;
  }

  collide() {
    this.weight--;

    // Change color displaying the hit
    if (!convertRGBtoArr(this.color)[3] && state.counter < G_C_M_V - B_C_R_D) {
      this.color = `${this.color.slice(0, -1)}, 0.6)`;
      this.counter = state.counter;
    }

    if (this.weight === 0) {
      this.collapse();
      this.selfDestruct();
    }
  }

  collapse() {
    for (let i = 0; i < 24; i++)
      state.pieces.bricks.push(
        new BreakPiece({ index: i, id: this.id, pos: this.pos })
      );
  }

  zoomIn() {
    const isDone = { x: false, y: false };

    const update = (coord, dimension) => {
      if (this.pos[coord] - this.velocity[coord] > this.endPos[coord]) {
        this.pos[coord] -= this.velocity[coord];
        this.dimensions[dimension] += this.velocity[coord] * 2;
      } else {
        this.pos[coord] = this.endPos[coord];
        this.dimensions[dimension] = SIZES.brick[dimension];
        isDone[coord] = true;
      }
    };

    update('x', 'width');
    update('y', 'height');

    if (isDone.x && isDone.y) {
      this.mode = 'lower';
      if (state.bricks.some(brick => brick.mode === 'stable'))
        state.bricks
          .filter(brick => brick.mode === 'stable')
          .forEach(brick => (brick.mode = 'lower'));
    }
  }

  draw() {
    if (this.mode === 'zoom-in') this.zoomIn();
    if (this.counter && this.counter + B_C_R_D < state.counter)
      this.retrieveColor();

    C.fillStyle = this.color;
    C.fillRect(
      this.pos.x,
      this.pos.y,
      this.dimensions.width,
      this.dimensions.height
    );
    C.font = `${SIZES.font}rem play`;
    C.fillStyle = '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(
      this.weight,
      state.grid.row[this.gridIndex.row] + SIZES.brick.width / 2,
      this.mode === 'zoom-in'
        ? getBrickYPos(this.gridIndex.column) + SIZES.brick.height / 2
        : this.pos.y + SIZES.brick.height / 2
    );
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.gridIndex.row],
      y: getBrickYPos(this.gridIndex.column),
      nextY: getBrickYPos(this.gridIndex.column + 1),
    };

    this.dimensions.width = SIZES.brick.width;
    this.dimensions.height = SIZES.brick.height;
  }

  selfDestruct() {
    state.bricks = state.bricks.filter(brick => brick.id !== this.id);
  }
}
