// Classes
import Piece from './Piece.js';
// Constructor Instances
import score from './statistics/score.js';
import topBorder from './borders/topBorder.js';
// Functions
import { getID } from '../functions/helpers.js';
// Configs
import { SIZES, C, COLORS } from '../config.js';
// State
import state from '../state.js';

const calcYPos = gCI => topBorder.heightFromTop + state.grid.column[gCI];

export default class Brick {
  constructor(props) {
    this.id = getID('brick');
    this.status = props.status || 'stable';
    this.weight = score.count;
    this.color = COLORS.brick.heaviest;
    this.goingDownStepsCount = 0;

    this.gridIndex = { row: props.gridRowIndex, column: 0 };
    this.velocity = { x: SIZES.brick.width / 50, y: SIZES.brick.height / 50 };

    this.dimensions = {
      width: this.status === 'zoom-in' ? 0 : SIZES.brick.width,
      height: this.status === 'zoom-in' ? 0 : SIZES.brick.height,
    };
    this.endPoint = {
      x: state.grid.row[this.gridIndex.row],
      y: calcYPos(this.gridIndex.column),
    };
    this.pos = {
      x:
        this.endPoint.x +
        (this.status === 'zoom-in' ? SIZES.brick.width / 2 : 0),
      y:
        this.endPoint.y +
        (this.status === 'zoom-in' ? SIZES.brick.height / 2 : 0),
      nextY: calcYPos(this.gridIndex.column + 1),
    };
  }

  zoomIn() {
    const isDone = { x: false, y: false };

    if (this.pos.x - this.velocity.x > this.endPoint.x) {
      this.pos.x -= this.velocity.x;
      this.dimensions.width += this.velocity.x * 2;
    } else {
      this.pos.x = this.endPoint.x;
      this.dimensions.width = SIZES.brick.width;
      isDone.x = true;
    }

    if (this.pos.y - this.velocity.y > this.endPoint.y) {
      this.pos.y -= this.velocity.y;
      this.dimensions.height += this.velocity.y * 2;
    } else {
      this.pos.y = this.endPoint.y;
      this.dimensions.height = SIZES.brick.height;
      isDone.y = true;
    }

    if (isDone.x && isDone.y) {
      this.status = 'stable';
      state.isBringingDown.bricks = true;
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
    this.gridIndex.column++;
    this.pos.y = calcYPos(this.gridIndex.column);
    this.pos.nextY = calcYPos(this.gridIndex.column + 1);
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
    if (this.status === 'zoom-in') this.zoomIn();

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
      this.status === 'zoom-in'
        ? calcYPos(this.gridIndex.column) + SIZES.brick.height / 2
        : this.pos.y + SIZES.brick.height / 2
    );
  }

  repoSize() {
    this.pos = {
      x: state.grid.row[this.gridIndex.row],
      y: calcYPos(this.gridIndex.column),
      nextY: calcYPos(this.gridIndex.column + 1),
    };

    this.dimensions.width = SIZES.brick.width;
    this.dimensions.height = SIZES.brick.height;
  }
}
