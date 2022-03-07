export default class Detail {
  constructor(props) {
    this.props = props;
    const { canvas, state, sizes, status } = props;
    const { height } = sizes.brick;

    this.pos = {
      x: canvas.width / 2 + 80,
      y: status === 'RECORD' ? height * 1.5 : height * 1.5 + height,
    };

    const count = status === 'RECORD' ? state?.record : state?.score;
    this.count = count || 1;

    this.height = height;
  }

  draw() {
    const { c, status } = this.props;

    c.font = `2rem play`;
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.fillText(`${status}: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }

  repoSize() {
    const { canvas } = this.props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y:
        status === 'RECORD'
          ? this.height * 1.5
          : this.height * 1.5 + this.height,
    };
  }
}
