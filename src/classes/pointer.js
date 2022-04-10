// Object Instances
import mainBall from './balls/mainBall.js';
import topBorder from './borders/topBorder.js';
import bottomBorder from './borders/bottomBorder.js';
// Configs
import { MAX_ANGLE, MIN_ANGLE, COLORS, SIZES, CANVAS, C } from '../config.js';
// State
import { state } from '../state.js';

class Pointer {
  constructor(props) {
    this.props = props;
  }

  get calcEndPoint() {
    const topBorderHeight = topBorder.pos.y + SIZES.border.height;
    const bottomBorderHeight = bottomBorder.pos.y - SIZES.border.height;
    const arrowLength = (CANVAS.height - topBorderHeight * 2) / 4;
    let endpoint = [];

    const pointA = [mainBall.pos.x, mainBall.pos.y];
    const pointB = [state.mouseCoords.x, state.mouseCoords.y];

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
    // Calculate y given the CANVAS' width as x
    const y = CANVAS.width * slope + b;
    // Calculate the angle

    const getX = basedOn => {
      const x = (basedOn - b) / slope;
      if (x > mainBall.r && x < CANVAS.width - mainBall.r) return x;
      // Prevent ball from going over the CANVAS' width in the left corner
      if (x < mainBall.r) return mainBall.r;
      // Prevent ball from going over the CANVAS' width in the right corner
      if (x > CANVAS.width - mainBall.r) return CANVAS.width - mainBall.r;
    };

    const getY = basedOn => {
      const y = basedOn * slope + b;
      if (angle > MIN_ANGLE && angle < MAX_ANGLE) {
        if (y > topBorderHeight + mainBall.r) return y;
        // Prevent mainBall from going over top border in the corners
        if (y < topBorderHeight + mainBall.r)
          return topBorderHeight + mainBall.r;
      }
      // Prevent mainBall from going lower than 10 degrees
      if (angle === MIN_ANGLE)
        return bottomBorderHeight - Math.tan(angle) * (pointA[0] + mainBall.r);
      // Prevent mainBall from surpassing 170 degrees
      if (angle === MAX_ANGLE)
        return (
          bottomBorderHeight -
          Math.tan(Math.PI - angle) * (CANVAS.width - pointA[0] + mainBall.r)
        );
    };

    const setEndPoint = (axis, value) => {
      if (axis === 'x') endpoint = [value, getY(value)];
      if (axis === 'y') endpoint = [getX(value), value];
    };

    // At 90 degree, slope is Infinite
    if (slope === Infinity)
      endpoint = [mainBall.pos.x, topBorderHeight + mainBall.r];
    // Pointer mainBall touches top border
    if (x > 0 && x < CANVAS.width)
      setEndPoint('y', topBorderHeight + mainBall.r);
    // Pointer mainBall touches left side of CANVAS
    if (x < 0) setEndPoint('x', mainBall.r);
    // Pointer mainBall touches right side of CANVAS
    if (x > CANVAS.width) setEndPoint('x', CANVAS.width - mainBall.r);
    // TODO: Change end point on colliding with bricks

    return {
      mainBall: endpoint,
      dashedLine: [
        endpoint[0] + Math.cos(angle) * mainBall.r * 2,
        endpoint[1] + Math.sin(angle) * mainBall.r * 2,
      ],
      arrow: [
        pointA[0] - Math.cos(angle) * arrowLength,
        pointA[1] - Math.sin(angle) * arrowLength,
      ],
    };
  }

  draw(offset) {
    // Dashed line
    C.beginPath();
    C.setLineDash([15, 10]);
    C.moveTo(mainBall.pos.x, mainBall.pos.y);
    C.lineTo(...this.calcEndPoint.dashedLine);
    C.lineDashOffset = offset;
    C.strokeStyle = COLORS.pointer.line;
    C.lineWidth = mainBall.r / 2.5;
    C.stroke();

    // Arrow
    C.beginPath();
    C.setLineDash([]);
    C.moveTo(mainBall.pos.x, mainBall.pos.y);
    C.lineTo(...this.calcEndPoint.arrow);
    C.strokeStyle = COLORS.pointer.arrow;
    C.lineWidth = mainBall.r;
    C.stroke();
    // Arrow Head
    const [endpointX, endpointY] = this.calcEndPoint.arrow;
    const angle = Math.atan2(
      endpointY - mainBall.pos.y,
      endpointX - mainBall.pos.x
    );
    const x = endpointX + Math.cos(angle) * mainBall.r * 1.4;
    const y = endpointY + Math.sin(angle) * mainBall.r * 1.4;
    C.beginPath();
    C.moveTo(x, y);
    C.lineTo(
      x - mainBall.r * Math.cos(angle - Math.PI / 7),
      y - mainBall.r * Math.sin(angle - Math.PI / 7)
    );
    C.lineTo(
      x - mainBall.r * Math.cos(angle + Math.PI / 7),
      y - mainBall.r * Math.sin(angle + Math.PI / 7)
    );
    C.lineTo(x, y);
    C.lineTo(
      x - mainBall.r * Math.cos(angle - Math.PI / 7),
      y - mainBall.r * Math.sin(angle - Math.PI / 7)
    );
    C.stroke();

    // Ball
    C.beginPath();
    C.setLineDash([]);
    C.arc(...this.calcEndPoint.mainBall, mainBall.r, 0, 2 * Math.PI);
    C.fillStyle = COLORS.ball.pointer;
    C.fill();
  }
}

export default new Pointer();