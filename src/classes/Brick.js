// Constructor Instances
import score from './statistics/score.js';
import topBorder from './borders/topBorder.js';
// Functions
import { getID } from '../functions/helpers.js';
// Configs
import { SIZES, C } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI => topBorder.heightFromTop + state.grid.column[gCI];

export default class Brick {
  constructor(props) {
    this.id = getID('brick');
    this.mode = props.mode || 'regular';
    this.weight = score.count;

    this.gridIndex = { row: props.gridRowIndex, column: 0 };
    this.velocity = { x: SIZES.brick.width / 50, y: SIZES.brick.height / 50 };

    this.dimensions = {
      width: this.mode === 'zoom-in' ? 0 : SIZES.brick.width,
      height: this.mode === 'zoom-in' ? 0 : SIZES.brick.height,
    };
    this.pos = {
      x:
        state.grid.row[this.gridIndex.row] +
        (this.mode === 'zoom-in' ? SIZES.brick.width / 2 : 0),
      y:
        calcYPos(this.gridIndex.column) +
        (this.mode === 'zoom-in' ? SIZES.brick.height / 2 : 0),
      nextY: calcYPos(this.gridIndex.column + 1),
    };
  }

  zoomIn() {
    const isDone = { x: false, y: false };

    if (this.pos.x - this.velocity.x > state.grid.row[this.gridIndex.row]) {
      this.pos.x -= this.velocity.x;
      this.dimensions.width += this.velocity.x * 2;
    } else {
      this.pos.x = state.grid.row[this.gridIndex.row];
      this.dimensions.width = SIZES.brick.width;
      isDone.x = true;
    }

    if (this.pos.y - this.velocity.y > calcYPos(this.gridIndex.column)) {
      this.pos.y -= this.velocity.y;
      this.dimensions.height += this.velocity.y * 2;
    } else {
      this.pos.y = calcYPos(this.gridIndex.column);
      this.dimensions.height = SIZES.brick.height;
      isDone.y = true;
    }

    if (isDone.x && isDone.y) {
      this.mode = 'regular';
      state.isBringingDown.bricks = true;
    }
  }

  collide() {
    this.weight--;
    if (this.weight === 0)
      state.bricks = state.bricks.filter(brick => brick.id !== this.id);
  }

  updateYPos() {
    this.gridIndex.column++;
    this.pos.y = calcYPos(this.gridIndex.column);
    this.pos.nextY = calcYPos(this.gridIndex.column + 1);
  }

  getRGB(color) {
    // heaviest: 'rgb(240, 80, 80)' & lightest: 'rgb(240, 160, 120)'
    const difference = score.count - this.weight;
    const LightestMinusHeaviest = color === 'green' ? 80 : 40;
    const x = LightestMinusHeaviest / (score.count - 1);
    if (difference > 0) return 80 + difference * x;
    else return 80;
  }

  get posY() {
    let posY = 0;
    if (this.mode === 'zoom-in')
      posY = calcYPos(this.gridIndex.column) + SIZES.brick.height / 2;
    else posY = this.pos.y + SIZES.brick.height / 2;
    return posY;
  }

  draw() {
    if (this.mode === 'zoom-in') this.zoomIn();

    C.fillStyle = `rgb(240, ${this.getRGB('green')}, ${this.getRGB('red')})`;
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
      this.posY
    );
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.gridIndex.row],
      y: calcYPos(this.gridIndex.column),
      nextY: calcYPos(this.gridIndex.column + 1),
    };
  }
}
