export default class Record {
  constructor(props) {
    this.props = props;
    const { canvas, state } = props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y: 50, // must convert to responsive
    };

    this.count = state?.record || 1;
  }

  draw() {
    const { c, brickHeight } = this.props;

    c.font = `${brickHeight / 2}px play`;
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.fillText(`RECORD: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }

  repoSize() {
    const { canvas, brickHeight } = this.props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y: brickHeight * 1.5,
    };
  }
}
