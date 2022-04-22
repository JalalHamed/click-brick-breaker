// Classes
import Ball from '../classes/balls/Ball.js';
// Constructor Instances
import mainBall from '../classes/balls/mainBall.js';
import coefficient from '../classes/coefficient.js';
// Functions
import { getAngle, isInBorder } from '../functions/helpers.js';
// Configs
import { CANVAS } from '../config.js';
// State
import state from '../state.js';

const handleClick = e => {
  if (
    isInBorder(e.y) &&
    !state.isBallMoving &&
    !state.areBricksAndBonusesMoving
  ) {
    state.isBallMoving = true;
    state.isMouseInBorder = false; // without this, the pointer will be drawn after the balls land even if the mouse is outside of the borders.
    CANVAS.style.cursor = 'auto';
    const angle = getAngle(e);
    const velocity = { x: -Math.cos(angle) * 10, y: -Math.sin(angle) * 10 };
    mainBall.velocity = velocity;
    state.shotBalls.push(mainBall);
    for (let i = 1; i < coefficient.count; i++) {
      state.shotBalls.push(new Ball({ velocity, delay: i }));
    }
  }
};

export default handleClick;
