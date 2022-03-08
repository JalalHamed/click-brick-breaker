export default class Coefficient {
  constructor(props) {
    this.props = props;
    // prettier-ignore
    const { state, ball, sizes: { _border } } = props;

    this.count = state?.coefficient || 2;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + _border.height + ball.r * 2.5,
    };
  }

  draw() {
    const { c, colors } = this.props;

    c.font = `1.5rem play`;
    c.fillStyle = this.count > 0 ? colors.ball : '#fff';
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  decreaseCount() {
    this.count--;
  }

  repoSize() {
    // prettier-ignore
    const { ball, sizes: { _border } } = this.props;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + _border.height + ball.r * 3.5,
    };
  }
}
