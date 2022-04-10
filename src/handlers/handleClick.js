// Classes
import Ball from '../classes/balls/Ball.js';
// Constructor Instances
import mainBall from '../classes/balls/mainBall.js';
import coefficient from '../classes/coefficient.js';
// Functions
import { isInBorder } from '../functions/helpers.js';
// Configs
import { CANVAS, MIN_ANGLE, MAX_ANGLE } from '../config.js';
// State
import { state } from '../state.js';

const handleClick = e => {
  if (isInBorder(e.y) && !state.isBallMoving) {
    state.isBallMoving = true;
    state.isMouseInBorder = false;
    CANVAS.style.cursor = 'auto';
    let angle = Math.atan2(e.y - mainBall.pos.y, e.x - mainBall.pos.x);
    if (angle > -MIN_ANGLE) angle = -MIN_ANGLE;
    if (angle < -MAX_ANGLE) angle = -MAX_ANGLE;
    const velocity = { x: Math.cos(angle) * 15, y: Math.sin(angle) * 15 };
    mainBall.velocity = velocity;
    state.shotBalls.push(mainBall);
    for (let i = 1; i < coefficient.count; i++) {
      state.shotBalls.push(new Ball({ velocity, delay: i }));
    }
  }
};

export default handleClick;
