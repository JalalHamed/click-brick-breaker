// Configs
import { COLORS, SIZES, C } from '../config.js';

export default class Brick {
  constructor(props) {
    this.props = props;
    const { grid, index, topBorder, score } = props;
    const { width, height } = SIZES.brick;

    this.width = width;
    this.height = height;

    this.pos = {
      x: grid[index],
      y: SIZES.border.margin + SIZES.border.height + this.height, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
    };

    this.weight = score.count;
  }

  draw() {
    C.fillStyle = COLORS.brick;
    C.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    C.font = `1.5rem play`;
    C.fillStyle = '#fff';
    C.textAlign = 'center';
    C.textBaseline = 'middle';
    C.fillText(
      this.weight,
      this.pos.x + this.width / 2,
      this.pos.y + this.height / 2
    );
  }

  repoSize({ grid }) {
    this.width = SIZES.brick.width;
    this.height = SIZES.brick.height;

    this.pos = {
      ...this.pos,
      x: grid[this.props.index],
    };
  }
}
