export default class Detail {
  constructor(props) {
    this.props = props;
    const { y, count, canvas } = props;

    this.pos = { x: canvas.width / 2 + 75, y };

    this.count = count || 1;
  }

  draw() {
    const { c, title } = this.props;

    c.font = `2rem play`;
    c.fillStyle = '#000';
    c.textAlign = 'right';
    c.fillText(`${title}: ${this.count}`, this.pos.x, this.pos.y);
  }

  repoSize() {
    const { repoY, canvas } = this.props;

    this.pos = {
      x: canvas.width / 2 + 75,
      y: repoY,
    };
  }
}
