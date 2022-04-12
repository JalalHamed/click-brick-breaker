// Classes
import Ball from './Ball.js';
// Constructor Instances
import bottomBorder from '../borders/bottomBorder.js';
// State
import { state } from '../../state.js';
// Configs
import { SIZES } from '../../config.js';

class MainBall extends Ball {
  constructor() {
    super();
  }

  repoSize() {
    this.r = SIZES.ball.radius;

    this.pos.y = bottomBorder.heightFromTop - this.r;

    this.pos.x = (this.pos.x * innerWidth) / state.innerWidth;
    state.setLS({ mainBall: this.pos.x });
    state.innerWidth = innerWidth;
  }
}

export default new MainBall();
