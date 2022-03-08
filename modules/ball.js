export default class Ball {
  constructor(props) {
    this.props = props;
    // prettier-ignore
    const { state, sizes: {_border, _ball}, canvas, velocity, delay } = props;

    this.r = _ball.radius;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: canvas.height - _border.margin - this.r,
    };

    this.velocity = {
      x: velocity?.x || 0,
      y: velocity?.y || 0,
    };

    this.delay = delay || 0;
  }

  draw(color) {
    const c = this.props.c;

    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = color;
    c.fill();
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  repoSize() {
    // prettier-ignore
    const { state, canvas, sizes: { _border, _ball } } = this.props;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: canvas.height - _border.margin - this.r,
    };

    this.r = _ball.radius;
  }
}
