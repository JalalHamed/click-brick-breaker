// Constructor Instances
import record from '../classes/statistics/record.js';
import score from '../classes/statistics/score.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import topBorder from '../classes/borders/topBorder.js';
import mainBall from '../classes/balls/mainBall.js';
import coefficient from '../classes/coefficient.js';
// Functions
import {
  calcGrid,
  getBorderMargin,
  getFontSize,
} from '../functions/helpers.js';
// Configs
import {
  CANVAS,
  SIZES,
  MIN_BALL_RADIUS,
  CANVAS_MIN_WIDTH,
  CANVAS_MIN_HEIGHT,
} from '../config.js';
// State
import state from '../state.js';

const handleResize = () => {
  if (
    !state.isBallMoving &&
    innerWidth >= CANVAS_MIN_WIDTH &&
    innerHeight >= CANVAS_MIN_HEIGHT
  ) {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
    SIZES.ball.radius = MIN_BALL_RADIUS + Math.round(CANVAS.width / 200);
    SIZES.border.margin = getBorderMargin();
    SIZES.border.height = CANVAS.width / 150;
    SIZES.brick.width = (CANVAS.width - SIZES.brick.margin * 5) / 6;
    SIZES.brick.height =
      (CANVAS.height - getBorderMargin() * 2 - SIZES.border.height - 40) / 9;
    SIZES.font = getFontSize();
    calcGrid();

    [bottomBorder, topBorder, mainBall, coefficient, record, score].forEach(
      item => item.repoSize()
    );
    state.bricks.forEach(brick => brick.repoSize());
    state.bonuses.forEach(bonus => bonus.repoSize());
  }
};

export default handleResize;
