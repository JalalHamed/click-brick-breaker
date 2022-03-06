export default class Pointer {
  constructor(props) {
    this.props = props;

    this.mouseCoords = {
      x: props.mouseX,
      y: props.mouseY,
    };
  }

  isColliding() {
    // console.log(this.endpoint);
  }

  get calcEndPoint() {
    const props = this.props;
    const canvas = props.canvas;
    const ball = props.ball;

    const topBorderHeight = props.topBorder.pos.y + props.topBorder.height;
    const maxY = props.bottomBorder.pos.y - 75;

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
    if (slope === Infinity) this.endpoint = [ball.pos.x, topBorderHeight];
    // Pointer touches top border
    if (x > 0 && x < canvas.width) this.endpoint = [x, topBorderHeight];
    // Pointer touches left side of canvas
    if (x < ball.r && b < maxY) this.endpoint = [ball.r, b];
    // Pointer touches right side of canvas
    if (x > canvas.width - ball.r && y < maxY)
      this.endpoint = [canvas.width - ball.r, y];
    // Pointer touches top left corner of the border
    if (x > 0 && x < ball.r) this.endpoint = [ball.r, topBorderHeight];
    // Pointer touches top right corner of the border
    if (x > canvas.width - ball.r && x < canvas.width)
      this.endpoint = [canvas.width - ball.r, topBorderHeight];
    // Surpassing y threshold
    if (x < ball.r && b > maxY) this.endpoint = [ball.r, maxY];
    if (x > canvas.width - ball.r && y > maxY)
      this.endpoint = [canvas.width - ball.r, maxY];

    // Change end point on bricks
    this.isColliding();

    return [this.endpoint[0], this.endpoint[1] + ball.r];
  }

  draw() {
    const c = this.props.c;
    const colors = this.props.colors;
    const ball = this.props.ball;

    // Dashed path
    c.beginPath();
    c.setLineDash([15, 10]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint);
    c.strokeStyle = colors.pointer;
    c.lineWidth = 5;
    c.stroke();

    // Pointer ball
    c.beginPath();
    c.setLineDash([]);
    c.arc(...this.calcEndPoint, ball.r, 0, 2 * Math.PI);
    c.fillStyle = colors.pointer;
    c.fill();
  }
}
