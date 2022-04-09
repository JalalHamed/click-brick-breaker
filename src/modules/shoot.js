// Utils
import { storage } from './utils.js';
// Config
import {
  SIZES,
  SAFE_MARGIN_FROM_BORDERS as S_M_F_B,
  CANVAS,
} from './config.js';

let counter = 0;
let landedBallXPos;

const shoot = async props => {
  const { ball, balls, setBalls, coefficient, setIsBallMoving } = props;
  const topBorderHeight = SIZES.border.margin + SIZES.border.height;
  const bottomBorderSurface = CANVAS.height - SIZES.border.margin;

  balls.forEach(ball => {
    const delay = ball.delay * ball.r;
    ball.draw();

    if (counter > delay) ball.update();
    if (counter === delay) coefficient.decreaseCount();

    if (ball.pos.x - ball.r <= 0 || ball.pos.x + ball.r >= CANVAS.width)
      ball.velocity.x = -ball.velocity.x;
    if (ball.pos.y <= topBorderHeight + ball.r) {
      ball.velocity.y = -ball.velocity.y;
    }
    if (ball.pos.y > bottomBorderSurface - ball.r) {
      ball.velocity.x = 0;
      ball.velocity.y = 0;
      landedBallXPos = ball.pos.x;
      ball.pos.y = bottomBorderSurface - ball.r;
    }
  });

  counter++;

  if (balls.every(ball => ball.velocity.x === 0 && ball.velocity.y === 0)) {
    if (landedBallXPos < ball.r + S_M_F_B) landedBallXPos = ball.r + S_M_F_B;
    if (landedBallXPos > CANVAS.width - ball.r - S_M_F_B)
      landedBallXPos = CANVAS.width - ball.r - S_M_F_B;
    storage.set({ ball: landedBallXPos });
    ball.pos.x = landedBallXPos;
    coefficient.regainCount();
    coefficient.repoSize();
    counter = 0;
    setBalls([]);
    setIsBallMoving(false);
  }
};

export default shoot;
