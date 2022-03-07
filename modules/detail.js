export default class Detail {
  constructor(props) {
    this.props = props;
    // prettier-ignore
    const { canvas, state, sizes: {brick: {height}}, status } = props;

    this.pos = {
      x: canvas.width / 2 + 80,
      y: status === 'RECORD' ? height * 1.3 : height * 1.3 + height,
    };

    const count = status === 'RECORD' ? state?.record : state?.score;
    this.count = count || 1;
  }

  draw() {
    const { c, status } = this.props;

    c.font = `2rem play`;
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.textBaseline = 'middle';
    c.fillText(`${status}: ${this.count}`, this.pos.x, this.pos.y);
  }

  addOne() {
    this.count++;
  }

  // prettier-ignore
  repoSize({ sizes: {brick: {height}}, status }) {
    const { canvas } = this.props;
    
    this.pos = {
      x: canvas.width / 2 + 75,
      y: status === 'record' ? height * 1.3 : height * 1.3 + height,
    };
  }
}
