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

    // Calculate slope, y intercept (b) and the angle
    const pointA = [ball.pos.x, ball.pos.y];
    const pointB = [this.mouseCoords.x, this.mouseCoords.y];
    const slope = (pointA[1] - pointB[1]) / (pointA[0] - pointB[0]);
    const b = this.mouseCoords.y - slope * this.mouseCoords.x;
    const angle = Math.atan2(pointA[1] - pointB[1], pointA[0] - pointB[0]);
    // Calculate x given the top border's height as y
    const x = (topBorderHeight - b) / slope;
    // Calculate y given the canvas' width as x
    const y = canvas.width * slope + b;

    const getX = basedOn => {
      const x = (basedOn - b) / slope;
      if (x > ball.r && x < canvas.width - ball.r) return x;
      // Make sure ball won't go over the canvas' width in the left corner
      if (x < ball.r) return ball.r;
      // Make sure ball won't go over the canvas' width in the right corner
      if (x > canvas.width - ball.r) return canvas.width - ball.r;
    };

    const getY = basedOn => {
      const y = basedOn * slope + b;
      if (y > topBorderHeight + ball.r && y < maxY) return y;
      // Make sure ball won't go over top border in the corners
      if (y < topBorderHeight + ball.r) return topBorderHeight + ball.r;
      // Make sure ball is lower than the determined maximum value for y
      if (y > maxY) return maxY;
    };

    const setEndPoint = (axis, value) => {
      if (axis === 'x') endpoint = [value, getY(value)];
      else if (axis === 'y') endpoint = [getX(value), value];
    };

    // At 90 degree, slope is Infinite
    if (slope === Infinity) endpoint = [ball.pos.x, topBorderHeight + ball.r];
    // Pointer touches top border
    if (x > 0 && x < canvas.width) setEndPoint('y', topBorderHeight + ball.r);
    // Pointer touches left side of canvas
    if (x < 0) setEndPoint('x', ball.r);
    // Pointer touches right side of canvas
    if (x > canvas.width) setEndPoint('x', canvas.width - ball.r);

    // TODO: Change end point on colliding with bricks

    return {
      ball: endpoint,
      dashedLine: [
        endpoint[0] + Math.cos(angle) * ball.r * 2,
        endpoint[1] + Math.sin(angle) * ball.r * 2,
      ],
      // pointer: pointer,
    };
  }

  draw(offset) {
    const { c, colors, ball, sizes } = this.props;

    // Dashed line
    c.beginPath();
    c.setLineDash([15, 10]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint.dashedLine);
    c.lineDashOffset = offset;
    c.strokeStyle = colors.pointer.line;
    c.lineWidth = ball.r / 2.5;
    c.stroke();

    // Pointer
    // c.beginPath();
    // c.setLineDash([]);
    // c.moveTo(ball.pos.x, ball.pos.y);
    // c.lineTo(...this.calcEndPoint.pointer);
    // c.strokeStyle = colors.pointer.line;
    // c.lineWidth = ball.r;
    // c.stroke();

    // Ball
    c.beginPath();
    c.setLineDash([]);
    c.arc(...this.calcEndPoint.ball, ball.r, 0, 2 * Math.PI);
    c.fillStyle = colors.pointer.line;
    c.fill();
  }
}
