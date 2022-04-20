// Constructor Instances
import coefficient from '../classes/coefficient.js';
import mainBall from '../classes/balls/mainBall.js';
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
// State
import state from '../state.js';
// Configs
import {
  SIZES,
  CANVAS,
  SAFE_MARGIN_FROM_BORDERS as S_M_F_B,
} from '../config.js';

let counter = 0;

const shoot = () => {
  state.shotBalls.forEach(shotBall => {
    const delay = shotBall.delay * shotBall.r;
    shotBall.draw();

    if (counter > delay) shotBall.update();
    if (counter === delay) coefficient.decreaseCount();

    // Reverse ball's direction when hitting the left and right borders.
    if (
      shotBall.pos.x - shotBall.r <= 0 ||
      shotBall.pos.x + shotBall.r >= CANVAS.width
    )
      shotBall.velocity.x = -shotBall.velocity.x;
    // Reverse ball's direction when hitting the top border.
    if (shotBall.pos.y <= topBorder.heightFromTop + shotBall.r) {
      shotBall.velocity.y = -shotBall.velocity.y;
    }

    // Stop the ball when hitting the bottom border.
    if (shotBall.pos.y > bottomBorder.pos.y - shotBall.r) {
      shotBall.velocity.x = 0;
      shotBall.velocity.y = 0;

      shotBall.pos.y = bottomBorder.pos.y - shotBall.r;

      // Prevent ball from going over the canvas' left and right border when landing.
      if (shotBall.pos.x < mainBall.r + S_M_F_B)
        shotBall.pos.x = mainBall.r + S_M_F_B;
      if (shotBall.pos.x > CANVAS.width - mainBall.r - S_M_F_B)
        shotBall.pos.x = CANVAS.width - mainBall.r - S_M_F_B;
    }
  });

  counter++;

  if (
    state.shotBalls.every(
      shotBall => shotBall.velocity.x === 0 && shotBall.velocity.y === 0
    )
  ) {
    state.setLS({ mainBall: state.shotBalls[0].pos.x });
    coefficient.regainCount();
    coefficient.repoSize();
    counter = 0;
    state.shotBalls = [];
    state.isBallMoving = false;
    state.isSettingNewRound = true;
  }
};

export default shoot;
