export default class Ball {
  constructor(props) {
    const { state, bottomBorder, canvas, c } = props;
    this.r = 12;
    this.c = c;

    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: bottomBorder.pos.y - this.r,
    };
  }

  draw(color) {
    this.c.beginPath();
    this.c.setLineDash([]);
    this.c.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    this.c.fillStyle = color;
    this.c.fill();
  }

  repoSize() {
    this.pos = {
      x: state?.ball || canvas.width / 2,
      y: bottomBorder.pos.y - this.r,
    };
  }
}
