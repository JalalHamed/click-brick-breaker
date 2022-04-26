// Constructor Instances
import projectile from './Projectile.js';
import topBorder from './borders/topBorder.js';
import bottomBorder from './borders/bottomBorder.js';
// Functions
import { getAngle } from '../functions/helpers.js';
// Configs
import { MAX_ANGLE, MIN_ANGLE, COLORS, SIZES, CANVAS, C } from '../config.js';
// State
import state from '../state.js';

class Pointer {
  get calcEndPoint() {
    const arrowLength = (CANVAS.height - topBorder.heightFromTop * 2) / 4;
    let endpoint = [];

    const pointA = [projectile.pos.x, projectile.pos.y];
    const pointB = [state.mouseCoords.x, state.mouseCoords.y];

    // Calculate slope, y intercept (b) & the angle
    let slope = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
    if (Math.abs(slope) < 0.17) {
      let s = Math.abs(slope);
      if (slope > 0) slope = 0.17;
      else slope = -0.17;
    }
    const b = pointB[1] - slope * pointB[0];
    const angle = getAngle(state.mouseCoords);

    // Calculate x given the top border's height as y
    const x = (topBorder.heightFromTop - b) / slope;
    // Calculate y given the CANVAS' width as x
    const y = CANVAS.width * slope + b;

    const getX = basedOn => {
      const x = (basedOn - b) / slope;
      if (x > projectile.r && x < CANVAS.width - projectile.r) return x;
      // Prevent projectile from going over the CANVAS' width in the left corner
      if (x < projectile.r) return projectile.r;
      // Prevent projectile from going over the CANVAS' width in the right corner
      if (x > CANVAS.width - projectile.r) return CANVAS.width - projectile.r;
    };

    const getY = basedOn => {
      const y = basedOn * slope + b;
      if (angle > MIN_ANGLE && angle < MAX_ANGLE) {
        if (y > topBorder.heightFromTop + projectile.r) return y;
        // Prevent projectile from going over top border in the corners
        if (y < topBorder.heightFromTop + projectile.r)
          return topBorder.heightFromTop + projectile.r;
      }
      // Prevent projectile from going lower than 10 degrees
      if (angle === MIN_ANGLE)
        return (
          bottomBorder.pos.y -
          bottomBorder.height -
          Math.tan(angle) * (pointA[0] + projectile.r)
        );
      // Prevent projectile from surpassing 170 degrees
      if (angle === MAX_ANGLE)
        return (
          bottomBorder.pos.y -
          bottomBorder.height -
          Math.tan(Math.PI - angle) * (CANVAS.width - pointA[0] + projectile.r)
        );
    };

    const setEndPoint = (axis, value) => {
      if (axis === 'x') endpoint = [value, getY(value)];
      if (axis === 'y') endpoint = [getX(value), value];
    };

    // At 90 degree, slope is Infinite
    if (slope === Infinity)
      endpoint = [projectile.pos.x, topBorder.heightFromTop + projectile.r];
    // Pointer projectile touches top border
    if (x > 0 && x < CANVAS.width)
      setEndPoint('y', topBorder.heightFromTop + projectile.r);
    // Pointer projectile touches left side of CANVAS
    if (x < 0) setEndPoint('x', projectile.r);
    // Pointer projectile touches right side of CANVAS
    if (x > CANVAS.width) setEndPoint('x', CANVAS.width - projectile.r);
    // TODO: Change end point on colliding with bricks

    return {
      projectile: endpoint,
      dashedLine: [
        endpoint[0] + Math.cos(angle) * projectile.r * 2,
        endpoint[1] + Math.sin(angle) * projectile.r * 2,
      ],
      arrow: [
        pointA[0] - Math.cos(angle) * arrowLength,
        pointA[1] - Math.sin(angle) * arrowLength,
      ],
    };
  }

  draw() {
    // Dashed line
    C.beginPath();
    C.setLineDash([15, 10]);
    C.moveTo(projectile.pos.x, projectile.pos.y);
    C.lineTo(...this.calcEndPoint.dashedLine);
    C.lineDashOffset = -state.counter;
    C.strokeStyle = COLORS.pointer.line;
    C.lineWidth = projectile.r / 2.5;
    C.stroke();

    // Arrow
    C.beginPath();
    C.setLineDash([]);
    C.moveTo(projectile.pos.x, projectile.pos.y);
    C.lineTo(...this.calcEndPoint.arrow);
    C.strokeStyle = COLORS.pointer.arrow;
    C.lineWidth = projectile.r;
    C.stroke();
    // Arrow Head
    const [endpointX, endpointY] = this.calcEndPoint.arrow;
    const angle = Math.atan2(
      endpointY - projectile.pos.y,
      endpointX - projectile.pos.x
    );
    const x = endpointX + Math.cos(angle) * projectile.r * 1.4;
    const y = endpointY + Math.sin(angle) * projectile.r * 1.4;
    C.beginPath();
    C.moveTo(x, y);
    C.lineTo(
      x - projectile.r * Math.cos(angle - Math.PI / 7),
      y - projectile.r * Math.sin(angle - Math.PI / 7)
    );
    C.lineTo(
      x - projectile.r * Math.cos(angle + Math.PI / 7),
      y - projectile.r * Math.sin(angle + Math.PI / 7)
    );
    C.lineTo(x, y);
    C.lineTo(
      x - projectile.r * Math.cos(angle - Math.PI / 7),
      y - projectile.r * Math.sin(angle - Math.PI / 7)
    );
    C.stroke();

    // Ball
    C.beginPath();
    C.setLineDash([]);
    C.arc(...this.calcEndPoint.projectile, projectile.r, 0, 2 * Math.PI);
    C.fillStyle = COLORS.pointer.ball;
    C.fill();
  }
}

export default new Pointer();
