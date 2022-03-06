export default class Ball {
  constructor(props) {
    this.props = props;
    const { state, bottomBorder, canvas } = props;

    this.r = 12;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: bottomBorder.pos.y - this.r,
    };
  }

  draw(color) {
    const c = this.props.c;

    c.beginPath();
    c.setLineDash([]);
    c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    c.fillStyle = color;
    c.fill();
  }

  repoSize() {
    const { state, canvas, bottomBorder } = this.props;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: bottomBorder.pos.y - this.r,
    };
  }
}
