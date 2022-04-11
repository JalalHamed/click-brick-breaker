// Constructor Instances
import bottomBorder from '../borders/bottomBorder.js';
// Configs
import { COLORS, SIZES, CANVAS, C } from '../../config.js';
// State
import { state } from '../../state.js';

export default class Ball {
  constructor(props) {
    this.r = SIZES.ball.radius;

    this.pos = {
      x: state.getLocalStorage()?.mainBall || CANVAS.width / 2,
      y: bottomBorder.heightFromTop - this.r,
    };

    this.velocity = {
      x: props?.velocity?.x || 0,
      y: props?.velocity?.y || 0,
    };

    this.delay = props?.delay || 0;
  }

  draw() {
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    C.fillStyle = COLORS.ball.main;
    C.fill();
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }
}
