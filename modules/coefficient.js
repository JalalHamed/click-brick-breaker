export default class Coefficient {
  constructor(props) {
    this.props = props;
    const { state, ball, bottomBorder } = props;

    this.count = state?.coefficient || 5;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + bottomBorder.height + ball.r * 3.5,
    };
  }

  draw() {
    const { c, brickHeight, colors } = this.props;

    c.font = `1.5rem play`;
    c.fillStyle = colors.ball;
    c.textAlign = 'center';
    c.fillText(`x${this.count}`, this.pos.x, this.pos.y);
  }

  repoSize() {
    const { ball, bottomBorder } = this.props;

    this.pos = {
      x: ball.pos.x,
      y: ball.pos.y + bottomBorder.height + ball.r * 3.5,
    };
  }
}
