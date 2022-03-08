export default class Pointer {
  constructor(props) {
    this.props = props;
    const { e } = props;

    this.mouseCoords = {
      x: e.x,
      y: e.y,
    };
  }

  get calcEndPoint() {
    // prettier-ignore
    const { canvas, ball, sizes: {_border} } = this.props;

    const topBorderHeight = _border.margin + _border.height;
    const maxY = canvas.height - _border.margin - 75;
    let endpoint = [];

    // Calculate slope and y intercept (b)
    const pointA = [ball.pos.x, ball.pos.y];
    const pointB = [this.mouseCoords.x, this.mouseCoords.y];
    const slope = (pointA[1] - pointB[1]) / (pointA[0] - pointB[0]);
    const b = this.mouseCoords.y - slope * this.mouseCoords.x;
    // Calculate x given the top border as y
    const x = (topBorderHeight - b) / slope;
    // Calculate y given the canvas width as x
    const y = canvas.width * slope + b;

    // At 90 degree, slope is Infinite
    if (slope === Infinity) endpoint = [ball.pos.x, topBorderHeight];
    // Pointer touches top border
    if (x > 0 && x < canvas.width) endpoint = [x, topBorderHeight];
    // Pointer touches left side of canvas
    if (x < ball.r && b < maxY) endpoint = [ball.r, b];
    // Pointer touches right side of canvas
    if (x > canvas.width - ball.r && y < maxY)
      endpoint = [canvas.width - ball.r, y];
    // Pointer touches top left corner of the border
    if (x > 0 && x < ball.r) endpoint = [ball.r, topBorderHeight];
    // Pointer touches top right corner of the border
    if (x > canvas.width - ball.r && x < canvas.width)
      endpoint = [canvas.width - ball.r, topBorderHeight];
    // Surpassing y threshold
    if (x < ball.r && b > maxY) endpoint = [ball.r, maxY];
    if (x > canvas.width - ball.r && y > maxY)
      endpoint = [canvas.width - ball.r, maxY];

    // TODO: Change end point on colliding with bricks

    return [endpoint[0], endpoint[1] + ball.r];
  }

  draw() {
    const { c, colors, ball, sizes } = this.props;

    // Dashed line
    c.beginPath();
    c.setLineDash([15, 10]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint);
    c.strokeStyle = colors.pointer.line;
    c.lineWidth = sizes._ball.radius / 2;
    c.stroke();

    // Pointer ball
    c.beginPath();
    c.setLineDash([]);
    c.arc(...this.calcEndPoint, ball.r, 0, 2 * Math.PI);
    c.fillStyle = colors.pointer.ball;
    c.fill();
  }
}
