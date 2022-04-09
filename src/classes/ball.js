// Config
import { COLORS, SIZES, CANVAS, C } from '../modules/config.js';
// Utils
import { storage } from '../modules/utils.js';

export default class Ball {
  constructor(props) {
    this.r = SIZES.ball.radius;

    this.pos = {
      x: storage.get()?.ball || CANVAS.width / 2,
      y: CANVAS.height - SIZES.border.margin - this.r,
    };

    this.velocity = {
      x: props?.velocity?.x || 0,
      y: props?.velocity?.y || 0,
    };

    this.delay = props?.delay || 0;

    this.canvasWidthTracker = CANVAS.width;
  }

  draw() {
    C.beginPath();
    C.setLineDash([]);
    C.arc(this.pos.x, this.pos.y, this.r, 0, 2 * Math.PI);
    C.fillStyle = COLORS.ball;
    C.fill();
  }

  update() {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  }

  repoSize() {
    this.pos = {
      ...this.pos,
      x: (CANVAS.width * this.pos.x) / this.canvasWidthTracker,
    };

    storage.set({ ball: this.pos.x });

    this.r = SIZES.ball.radius;
  }
}
