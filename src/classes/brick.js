import { COLORS } from '../modules/config.js';

export default class Brick {
  constructor(props) {
    this.props = props;
    // prettier-ignore
    const { grid, index, topBorder, sizes: {_border, _brick}, score } = props;
    const { width, height } = _brick;

    this.width = width;
    this.height = height;

    this.pos = {
      x: grid[index],
      y: _border.margin + _border.height + this.height, // must be greater/less than the topBorder/bottomBorder's y pos +/- the border height
    };

    this.weight = score.count;
  }

  draw() {
    const { c } = this.props;

    c.fillStyle = COLORS.brick;
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
    c.font = `1.5rem play`;
    c.fillStyle = '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(
      this.weight,
      this.pos.x + this.width / 2,
      this.pos.y + this.height / 2
    );
  }

  repoSize({ sizes: { _brick }, grid }) {
    this.width = _brick.width;
    this.height = _brick.height;

    this.pos = {
      ...this.pos,
      x: grid[this.props.index],
    };
  }
}
