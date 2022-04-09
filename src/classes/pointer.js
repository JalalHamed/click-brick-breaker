// Config
import { MAX_ANGLE, MIN_ANGLE, COLORS, SIZES } from '../modules/config.js';

export default class Pointer {
  constructor(props) {
    this.props = props;
  }

  get calcEndPoint() {
    const { canvas, ball, e } = this.props;
    const { border } = SIZES;

    const topBorderHeight = border.margin + border.height;
    const bottomBorderHeight = canvas.height - border.margin - border.height;
    const arrowLength = (canvas.height - topBorderHeight * 2) / 4;
    let endpoint = [];

    const pointA = [ball.pos.x, ball.pos.y];
    const pointB = [e.x, e.y];

    // Calculate slope, y intercept (b) & the angle
    let slope = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
    if (Math.abs(slope) < 0.17) {
      let s = Math.abs(slope);
      if (slope > 0) slope = 0.17;
      else slope = -0.17;
    }
    const b = pointB[1] - slope * pointB[0];
    let angle = Math.atan2(pointA[1] - pointB[1], pointA[0] - pointB[0]);
    // Prevent angle from being lower than 10 degrees
    if (angle < MIN_ANGLE) angle = MIN_ANGLE;
    // Prevent angle from surpassing 170 degrees
    if (angle > MAX_ANGLE) angle = MAX_ANGLE;

    // Calculate x given the top border's height as y
    const x = (topBorderHeight - b) / slope;
    // Calculate y given the canvas' width as x
    const y = canvas.width * slope + b;
    // Calculate the angle

    const getX = basedOn => {
      const x = (basedOn - b) / slope;
      if (x > ball.r && x < canvas.width - ball.r) return x;
      // Prevent ball from going over the canvas' width in the left corner
      if (x < ball.r) return ball.r;
      // Prevent ball from going over the canvas' width in the right corner
      if (x > canvas.width - ball.r) return canvas.width - ball.r;
    };

    const getY = basedOn => {
      const y = basedOn * slope + b;
      if (angle > MIN_ANGLE && angle < MAX_ANGLE) {
        if (y > topBorderHeight + ball.r) return y;
        // Prevent ball from going over top border in the corners
        if (y < topBorderHeight + ball.r) return topBorderHeight + ball.r;
      }
      // Prevent ball from going lower than 10 degrees
      if (angle === MIN_ANGLE)
        return bottomBorderHeight - Math.tan(angle) * (pointA[0] + ball.r);
      // Prevent ball from surpassing 170 degrees
      if (angle === MAX_ANGLE)
        return (
          bottomBorderHeight -
          Math.tan(Math.PI - angle) * (canvas.width - pointA[0] + ball.r)
        );
    };

    const setEndPoint = (axis, value) => {
      if (axis === 'x') endpoint = [value, getY(value)];
      if (axis === 'y') endpoint = [getX(value), value];
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
    const { c, ball } = this.props;

    // Dashed line
    c.beginPath();
    c.setLineDash([15, 10]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint.dashedLine);
    c.lineDashOffset = offset;
    c.strokeStyle = COLORS.pointer.line;
    c.lineWidth = ball.r / 2.5;
    c.stroke();

    // Arrow
    c.beginPath();
    c.setLineDash([]);
    c.moveTo(ball.pos.x, ball.pos.y);
    c.lineTo(...this.calcEndPoint.arrow);
    c.strokeStyle = COLORS.pointer.line;
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
    c.fillStyle = COLORS.pointer.line;
    c.fill();
  }
}
