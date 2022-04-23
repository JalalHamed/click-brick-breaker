// Constructor Instances
import coefficient from '../../classes/coefficient.js';
import topBorder from '../../classes/borders/topBorder.js';
import bottomBorder from '../../classes/borders/bottomBorder.js';
import score from '../../classes/statistics/score.js';
import record from '../../classes/statistics/record.js';
// Functions
import genBricksAndBonus from '../generators/genBricksAndBonus.js';
// State
import state from '../../state.js';
// Configs
import {
  CANVAS,
  SAFE_MARGIN_FROM_BORDERS as S_M_F_B,
  SIZES,
} from '../../config.js';

const shootBalls = () => {
  state.shotBalls.forEach(shotBall => {
    shotBall.draw();
    shotBall.update();
    coefficient.decreaseCount();

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

    // Change balls direction on colliding with bricks
    const { width, height } = SIZES.brick;
    state.bricks.forEach(brick => {
      // Hitting top and bottom sides
      if (
        ((shotBall.pos.y - shotBall.r < brick.pos.y + height + 0.001 &&
          shotBall.pos.y + shotBall.r > brick.pos.y + height) ||
          (shotBall.pos.y - shotBall.r < brick.pos.y + 0.001 &&
            shotBall.pos.y + shotBall.r > brick.pos.y)) &&
        shotBall.pos.x > brick.pos.x &&
        shotBall.pos.x < brick.pos.x + width
      ) {
        shotBall.velocity.y = -shotBall.velocity.y;
        brick.collide();
      }

      // Hitting left and right sides
      if (
        ((shotBall.pos.x + shotBall.r > brick.pos.x + width + 0.001 &&
          shotBall.pos.x - shotBall.r < brick.pos.x + width) ||
          (shotBall.pos.x + shotBall.r > brick.pos.x + 0.001 &&
            shotBall.pos.x - shotBall.r < brick.pos.x)) &&
        shotBall.pos.y < brick.pos.y + height &&
        shotBall.pos.y > brick.pos.y
      ) {
        shotBall.velocity.x = -shotBall.velocity.x;
        brick.collide();
      }
    });

    if (shotBall.pos.y > bottomBorder.pos.y - shotBall.r) {
      shotBall.velocity.x = 0;
      shotBall.velocity.y = 0;

      shotBall.pos.y = bottomBorder.pos.y - shotBall.r;

      // Prevent ball from going over the canvas' left and right border when landing.
      if (shotBall.pos.x < shotBall.r + S_M_F_B)
        shotBall.pos.x = shotBall.r + S_M_F_B;
      if (shotBall.pos.x > CANVAS.width - shotBall.r - S_M_F_B)
        shotBall.pos.x = CANVAS.width - shotBall.r - S_M_F_B;
    }
  });

  if (
    state.shotBalls.every(
      shotBall => shotBall.velocity.x === 0 && shotBall.velocity.y === 0
    )
  ) {
    state.isBallMoving = false;
    state.setLS({ mainBall: state.shotBalls[0].pos.x });
    coefficient.regainCount();
    state.shotBalls = [];
    score.addOne();
    if (record.count < score.count) record.addOne();
    genBricksAndBonus();
    state.areBricksAndBonusesMoving = true;
  }
};

export default shootBalls;
