export default class Detail {
  constructor(props) {
    this.props = props;
    const { canvas, count, brickHeight, status } = props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y:
        status === 'RECORD'
          ? brickHeight * 1.5
          : brickHeight * 1.5 + brickHeight,
    };

    this.count = count || 1;
  }

  draw() {
    const { c, brickHeight, status } = this.props;

    c.font = `2rem play`;
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.fillText(`${status}: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }

  repoSize() {
    const { canvas, brickHeight } = this.props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y:
        status === 'RECORD'
          ? brickHeight * 1.5
          : brickHeight * 1.5 + brickHeight,
    };
  }
}
