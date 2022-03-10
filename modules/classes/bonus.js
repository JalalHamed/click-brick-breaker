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
    const { c, colors } = this.props;

    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = colors.bonus;
    c.fill();
  }

  update() {
    this.pos.y += this.yVelocity;
  }

  repoSize() {
    // prettier-ignore
    const { canvas, sizes: { _border, _ball } } = this.props;

    this.pos = {
      x: grid[index] + canvas.width / 14,
      y: canvas.height - _border.margin - this.r,
    };

    this.r = _ball.radius;
  }
}
