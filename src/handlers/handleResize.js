// Constructor Instances
import record from '../classes/statistics/record.js';
import score from '../classes/statistics/score.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import topBorder from '../classes/borders/topBorder.js';
import mainBall from '../classes/balls/mainBall.js';
import coefficient from '../classes/coefficient.js';
// Functions
import { calcGrid } from '../functions/helpers.js';
// Configs
import { CANVAS, SIZES, MIN_BALL_RADIUS, CANVAS_MIN_WIDTH } from '../config.js';
// State
import { state } from '../state.js';

const handleResize = () => {
  if (!state.isBallMoving && innerWidth >= CANVAS_MIN_WIDTH) {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;
    SIZES.ball.radius = MIN_BALL_RADIUS + Math.round(CANVAS.width / 200);
    SIZES.border.height = CANVAS.width / 150;
    SIZES.brick.width = (CANVAS.width - SIZES.brick.margin * 6) / 7;
    SIZES.brick.height =
      (bottomBorder.pos.y - topBorder.heightFromTop - SIZES.brick.margin * 8) /
      9;
    calcGrid();

    [bottomBorder, topBorder, mainBall, coefficient, record, score].forEach(
      item => item.repoSize()
    );
    state.bricks.forEach(brick => brick.repoSize());
    state.bonuses.forEach(bonus => bonus.repoSize());
  }
};

export default handleResize;
