// Constructor Instances
import mainBall from '../classes/balls/mainBall.js';
import pointer from '../classes/pointer.js';
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import record from '../classes/statistics/record.js';
import score from '../classes/statistics/score.js';
import coefficient from '../classes/coefficient.js';
import fps from '../classes/fps.js';
// Configs
import { C, CANVAS, SIZES } from '../config.js';
// State
import state from '../state.js';

let isGoingDown = false;
const swingRing = () => {
  const { radius } = SIZES.ball;
  if (state.bonusRing > radius && isGoingDown) state.bonusRing--;
  if (state.bonusRing < Math.floor(radius * 1.7) && !isGoingDown)
    state.bonusRing++;
  if (state.bonusRing === radius) isGoingDown = false;
  if (state.bonusRing === Math.floor(radius * 1.7)) isGoingDown = true;
};

const draw = () => {
  C.clearRect(0, 0, CANVAS.width, CANVAS.height);
  [fps, score, record, topBorder, bottomBorder, mainBall, coefficient].forEach(
    item => item.draw()
  );
  state.bricks.forEach(brick => brick.draw());
  state.bonuses.forEach(bonus => bonus.draw());
  if (state.isMouseInBorder && !state.isBallMoving) pointer.draw();
  if (state.counter % 3 === 0) swingRing();
};

export default draw;
