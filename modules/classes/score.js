export default class Score {
  constructor(props) {
    this.props = props;
    const { canvas, state, brickHeight, record } = props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y: record.pos.y + brickHeight,
    };

    this.count = state?.score || 1;
  }

  draw() {
    const { c, brickHeight } = this.props;

    c.font = `2rem play`;
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.fillText(`SCORE: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }

  repoSize() {
    const { canvas, brickHeight, record } = this.props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y: record.pos.y + brickHeight,
    };
  }
}
