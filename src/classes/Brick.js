// Classes
import Piece from './Piece.js';
// Objects
import score from './statistics/score.js';
import topBorder from './borders/topBorder.js';
// Functions
import { getID, getBrickYPos } from '../functions/helpers.js';
// Configs
import { SIZES, C, COLORS } from '../config.js';
// State
import state from '../state.js';

export default class Brick {
  constructor(props) {
    this.id = getID('brick');
    this.mode = props.mode || 'stable';
    this.weight = score.count;
    this.color = COLORS.brick.heaviest;

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

  collide() {
    this.weight--;
    this.updateColor();
    if (this.weight === 0) {
      for (let i = 0; i < 24; i++)
        state.pieces.push(new Piece({ index: i, id: this.id, pos: this.pos }));
      state.bricks = state.bricks.filter(brick => brick.id !== this.id);
    }
  }

  updateYPos() {
    this.updateColor();
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
      this.color = `rgb(255, ${80 + difference * g}, ${80 + difference * b})`;
    else this.color = COLORS.brick.heaviest;
  }

  draw() {
    if (this.mode === 'zoom-in') this.zoomIn();

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
}
