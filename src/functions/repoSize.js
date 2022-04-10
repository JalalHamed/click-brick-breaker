// Classes
import record from '../classes/statistics/record.js';
import score from '../classes/statistics/score.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import topBorder from '../classes/borders/topBorder.js';
import mainBall from '../classes/balls/mainBall.js';
import coefficient from '../classes/coefficient.js';
// Functions
import { calcGrid } from './helpers.js';
// Configs
import { CANVAS, SIZES } from '../config.js';
// State
import { state } from '../storage.js';

const repoSize = () => /* re-position and re-size */ {
  CANVAS.width = innerWidth;
  CANVAS.height = innerHeight;
  SIZES.ball.radius = Math.round((CANVAS.width / 100) * 1.3);
  SIZES.border.margin = CANVAS.height / 5;
  SIZES.border.height = CANVAS.width / 125;
  SIZES.brick.margin = CANVAS.width / 120;
  SIZES.brick.width = (CANVAS.width - SIZES.brick.margin * 6) / 7;
  SIZES.brick.height =
    (CANVAS.height -
      (SIZES.border.margin * 2 + SIZES.border.height * 2) -
      SIZES.brick.margin * 8) /
    9;
  calcGrid();

  [bottomBorder, topBorder, coefficient].forEach(c => c.repoSize()); // "c" for "class"
  record.repoSize();
  score.repoSize();
  state.bricks.forEach(brick => brick.repoSize());
  state.bonuses.forEach(bonus => bonus.repoSize());
};

export default repoSize;
