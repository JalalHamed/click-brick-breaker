export default class Coefficient {
  constructor(props) {
    this.props = props;
    const { count, x, y } = props;

    this.count = count || 5;

    this.pos = { x, y };
  }

  draw() {
    const { c, color } = this.props;

    c.font = `1.5rem play`;
    c.fillStyle = color;
    c.textAlign = 'center';
    c.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  repoSize() {
    const { x, y } = this.props;

    this.pos = { x, y };
  }
}
