// Classes
import coefficient from '../classes/coefficient.js';
// Helpers
import { storage } from './helpers.js';
// Configs
import {
  SIZES,
  SAFE_MARGIN_FROM_BORDERS as S_M_F_B,
  CANVAS,
} from '../config.js';

let counter = 0;
let landedBallXPos;

const shoot = async props => {
  const { mainBall, shotBalls, setBalls, setIsBallMoving } = props;
  const topBorderHeight = SIZES.border.margin + SIZES.border.height;
  const bottomBorderSurface = CANVAS.height - SIZES.border.margin;

  shotBalls.forEach(mainBall => {
    const delay = mainBall.delay * mainBall.r;
    mainBall.draw();

    if (counter > delay) mainBall.update();
    if (counter === delay) coefficient.decreaseCount();

    if (
      mainBall.pos.x - mainBall.r <= 0 ||
      mainBall.pos.x + mainBall.r >= CANVAS.width
    )
      mainBall.velocity.x = -mainBall.velocity.x;
    if (mainBall.pos.y <= topBorderHeight + mainBall.r) {
      mainBall.velocity.y = -mainBall.velocity.y;
    }
    if (mainBall.pos.y > bottomBorderSurface - mainBall.r) {
      mainBall.velocity.x = 0;
      mainBall.velocity.y = 0;
      landedBallXPos = mainBall.pos.x;
      mainBall.pos.y = bottomBorderSurface - mainBall.r;
    }
  });

  counter++;

  if (
    shotBalls.every(
      mainBall => mainBall.velocity.x === 0 && mainBall.velocity.y === 0
    )
  ) {
    if (landedBallXPos < mainBall.r + S_M_F_B)
      landedBallXPos = mainBall.r + S_M_F_B;
    if (landedBallXPos > CANVAS.width - mainBall.r - S_M_F_B)
      landedBallXPos = CANVAS.width - mainBall.r - S_M_F_B;
    storage.set({ mainBall: landedBallXPos });
    mainBall.pos.x = landedBallXPos;
    coefficient.regainCount();
    coefficient.repoSize();
    counter = 0;
    setBalls([]);
    setIsBallMoving(false);
  }
};

export default shoot;
