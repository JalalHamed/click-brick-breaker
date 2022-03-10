export default class Bonus {
  constructor(props) {
    this.props = props;
    // prettier-ignore
    const { state, sizes: {_border, _ball, _brick}, canvas, yVelocity, index, grid } = props;

    this.r = _ball.radius;

    this.pos = {
      x: grid[index] + _brick.width / 2,
      y: _border.margin + _border.height + _brick.height + _brick.height / 2,
    };

    this.yVelocity = yVelocity || 0;
  }

  draw() {
    // prettier-ignore
    const { c, colors, sizes: {_border} } = this.props;

    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = colors.bonus;
    c.fill();

    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r * 2, 0, 2 * Math.PI);
    c.lineWidth = _border.height;
    c.strokeStyle = colors.bonus;
    c.stroke();
  }

  update() {
    this.pos.y += this.yVelocity;
  }

  repoSize({ sizes: { _border, _ball, _brick }, grid }) {
    this.pos = {
      x: grid[this.props.index] + _brick.width / 2,
      y: _border.margin + _border.height + _brick.height + _brick.height / 2,
    };

    this.r = _ball.radius;
  }
}
