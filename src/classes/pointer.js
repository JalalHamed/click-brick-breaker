// Objects
import topBorder from './borders/topBorder.js';
import bottomBorder from './borders/bottomBorder.js';
// Functions
import { getAngle, getPointerXPos, getPointerYPos } from '../helpers.js';
// Configs
import { MAX_ANGLE, MIN_ANGLE, COLORS, SIZES, CANVAS, C } from '../config.js';
// State
import state from '../state.js';

class Pointer {
  constructor() {
    this.radius = SIZES.projectile.radius;
  }

  get calcEndPoint() {
    const arrowLength = (CANVAS.height - topBorder.heightFromTop * 2) / 4;
    let endpoint = [];

    const pointA = [state.projectile.pos.x, state.projectile.pos.y];
    const pointB = [state.mouseCoords.x, state.mouseCoords.y];

    // Calculate slope, y intercept (b) & the angle
    let slope = (pointB[1] - pointA[1]) / (pointB[0] - pointA[0]);
    const b = pointB[1] - slope * pointB[0];
    const angle = getAngle(state.mouseCoords);

    // Calculate x given the top border's height as y
    const x = (topBorder.heightFromTop - b) / slope;

    const setEndPoint = (axis, value) => {
      const props = { slope, b, angle, radius: this.radius };
      if (axis === 'x') endpoint = [value, getPointerYPos(value, props)];
      if (axis === 'y') endpoint = [getPointerXPos(value, props), value];
    };

    // At 90 degree, slope is Infinite (or -Infinite)
    if (slope === Infinity || slope === -Infinity)
      endpoint = [state.particle.pos.x, topBorder.heightFromTop + this.radius];
    // Pointer particle touches top border
    if (x > 0 && x < CANVAS.width)
      setEndPoint('y', topBorder.heightFromTop + this.radius);
    // Pointer particle touches left side of CANVAS
    if (x < 0) setEndPoint('x', this.radius);
    // Pointer particle touches right side of CANVAS
    if (x > CANVAS.width) setEndPoint('x', CANVAS.width - this.radius);

    return {
      particle: endpoint,
      dashedLine: [
        endpoint[0] + Math.cos(angle) * this.radius * 2,
        endpoint[1] + Math.sin(angle) * this.radius * 2,
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
    C.moveTo(state.projectile.pos.x, state.projectile.pos.y);
    C.lineTo(...this.calcEndPoint.dashedLine);
    C.lineDashOffset = -state.counter;
    C.strokeStyle = COLORS.pointer.line;
    C.lineWidth = this.radius / 2.5;
    C.stroke();

    // Arrow
    C.beginPath();
    C.setLineDash([]);
    C.moveTo(state.projectile.pos.x, state.projectile.pos.y);
    C.lineTo(...this.calcEndPoint.arrow);
    C.strokeStyle = COLORS.pointer.arrow;
    C.lineWidth = this.radius;
    C.stroke();
    // Arrowhead
    const [endpointX, endpointY] = this.calcEndPoint.arrow;
    const angle = Math.atan2(
      endpointY - state.projectile.pos.y,
      endpointX - state.projectile.pos.x
    );
    const x = endpointX + Math.cos(angle) * this.radius * 1.4;
    const y = endpointY + Math.sin(angle) * this.radius * 1.4;
    C.beginPath();
    C.moveTo(x, y);
    C.lineTo(
      x - this.radius * Math.cos(angle - Math.PI / 7),
      y - this.radius * Math.sin(angle - Math.PI / 7)
    );
    C.lineTo(
      x - this.radius * Math.cos(angle + Math.PI / 7),
      y - this.radius * Math.sin(angle + Math.PI / 7)
    );
    C.lineTo(x, y);
    C.lineTo(
      x - this.radius * Math.cos(angle - Math.PI / 7),
      y - this.radius * Math.sin(angle - Math.PI / 7)
    );
    C.stroke();

    // Particle
    C.beginPath();
    C.setLineDash([]);
    C.arc(...this.calcEndPoint.particle, this.radius, 0, 2 * Math.PI);
    C.fillStyle = COLORS.pointer.particle;
    C.fill();
  }

  repoSize() {
    this.radius = SIZES.projectile.radius;
  }
}

export default new Pointer();
