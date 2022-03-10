export default class Pointer {
  constructor(props) {
    this.props = props;
    // prettier-ignore
    const { e: {x, y} } = props;

    this.mouseCoords = { x, y };
  }

  get calcEndPoint() {
    // prettier-ignore
    const { canvas, ball, sizes: {_border}, maxY } = this.props;

    const topBorderHeight = _border.margin + _border.height;
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
    if (x < 0 && b < maxY) endpoint = [0, b];
    // Pointer touches right side of canvas
    if (x > canvas.width && y < maxY) endpoint = [canvas.width, y];
    // Pointer touches top left corner of the border
    // if (x > 0 && x < ball.r) endpoint = [0, topBorderHeight];
    // Pointer touches top right corner of the border
    // if (x > canvas.width - ball.r && x < canvas.width)
    //   endpoint = [canvas.width, topBorderHeight];
    // Surpassing y threshold
    if (x < ball.r && b > maxY) endpoint = [0, maxY];
    if (x > canvas.width - ball.r && y > maxY) endpoint = [canvas.width, maxY];

    // TODO: Change end point on colliding with bricks

    return endpoint;
  }

  draw(offset) {
    const { c, colors, ball, sizes } = this.props;

    // Dashed line
    c.beginPath();
    c.setLineDash([15, 10]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint);
    c.lineDashOffset = offset;
    c.strokeStyle = colors.pointer.line;
    c.lineWidth = ball.r / 2.5;
    c.stroke();

    // Pointer
    c.beginPath();
    c.setLineDash([]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(this.mouseCoords.x, this.mouseCoords.y);
    c.strokeStyle = colors.pointer.line;
    c.lineWidth = ball.r;
    c.stroke();

    // Ball
    // c.beginPath();
    // c.setLineDash([]);
    // c.arc(...this.calcEndPoint, ball.r, 0, 2 * Math.PI);
    // c.fillStyle = colors.pointer.ball;
    // c.fill();
  }
}
