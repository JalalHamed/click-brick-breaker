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
    const arrowLength = (canvas.height - topBorderHeight * 2) / 4;
    let endpoint = [];

    // Calculate slope, y intercept (b) and the angle
    const pointA = [ball.pos.x, ball.pos.y];
    const pointB = [this.mouseCoords.x, this.mouseCoords.y];
    const slope = (pointA[1] - pointB[1]) / (pointA[0] - pointB[0]);
    const b = pointB[1] - slope * pointB[0];
    const angle = Math.atan2(pointA[1] - pointB[1], pointA[0] - pointB[0]);
    // Calculate x given the top border's height as y
    const x = (topBorderHeight - b) / slope;
    // Calculate y given the canvas' width as x
    const y = canvas.width * slope + b;

    const setEndPoint = (axis, value) => {
      if (axis === 'x') endpoint = [value, value * slope + b];
      else if (axis === 'y') endpoint = [(value - b) / slope, value];
    };

    // At 90 degree, slope is Infinite
    if (slope === Infinity) endpoint = [ball.pos.x, topBorderHeight + ball.r];
    // Pointer ball touches top border
    if (x > 0 && x < canvas.width) setEndPoint('y', topBorderHeight + ball.r);
    // Pointer ball touches left side of canvas
    if (x < 0) setEndPoint('x', ball.r);
    // Pointer ball touches right side of canvas
    if (x > canvas.width) setEndPoint('x', canvas.width - ball.r);
    // TODO: Change end point on colliding with bricks

    return {
      ball: endpoint,
      dashedLine: [
        endpoint[0] + Math.cos(angle) * ball.r * 2,
        endpoint[1] + Math.sin(angle) * ball.r * 2,
      ],
      arrow: [
        pointA[0] - Math.cos(angle) * arrowLength,
        pointA[1] - Math.sin(angle) * arrowLength,
      ],
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

    // Arrow
    c.beginPath();
    c.setLineDash([]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint.arrow);
    c.strokeStyle = colors.pointer.line;
    c.lineWidth = ball.r;
    c.stroke();
    // Arrow Head
    const [endpointX, endpointY] = this.calcEndPoint.arrow;
    const angle = Math.atan2(endpointY - ball.pos.y, endpointX - ball.pos.x);
    const x = endpointX + Math.cos(angle) * ball.r * 1.4;
    const y = endpointY + Math.sin(angle) * ball.r * 1.4;
    c.beginPath();
    c.moveTo(x, y);
    c.lineTo(
      x - ball.r * Math.cos(angle - Math.PI / 7),
      y - ball.r * Math.sin(angle - Math.PI / 7)
    );
    c.lineTo(
      x - ball.r * Math.cos(angle + Math.PI / 7),
      y - ball.r * Math.sin(angle + Math.PI / 7)
    );
    c.lineTo(x, y);
    c.lineTo(
      x - ball.r * Math.cos(angle - Math.PI / 7),
      y - ball.r * Math.sin(angle - Math.PI / 7)
    );
    c.stroke();

    // Ball
    c.beginPath();
    c.setLineDash([]);
    c.arc(...this.calcEndPoint.ball, ball.r, 0, 2 * Math.PI);
    c.fillStyle = colors.pointer.line;
    c.fill();
  }
}
