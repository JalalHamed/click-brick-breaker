// Constructor Instances
import Projectile from '../../classes/Projectile.js';
import record from '../../classes/statistics/record.js';
import score from '../../classes/statistics/score.js';
import bottomBorder from '../../classes/borders/bottomBorder.js';
import topBorder from '../../classes/borders/topBorder.js';
import coefficient from '../../classes/coefficient.js';
// Functions
import {
  calcGrid,
  getBorderMargin,
  getFontSize,
  isAnythingMoving,
} from '../helpers.js';
// Configs
import {
  CANVAS,
  SIZES,
  MIN_PROJECTILE_RADIUS,
  CANVAS_MIN_WIDTH,
  CANVAS_MIN_HEIGHT,
} from '../../config.js';
// State
import state from '../../state.js';

const handleResize = () => {
  if (
    !isAnythingMoving() &&
    innerWidth >= CANVAS_MIN_WIDTH &&
    innerHeight >= CANVAS_MIN_HEIGHT
  ) {
    CANVAS.width = innerWidth;
    CANVAS.height = innerHeight;

    SIZES.projectile.radius =
      MIN_PROJECTILE_RADIUS + Math.round(CANVAS.width / 200);
    SIZES.bonus.radius = MIN_PROJECTILE_RADIUS + Math.round(CANVAS.width / 200);
    SIZES.bonus.maxRadius =
      MIN_PROJECTILE_RADIUS + Math.round(CANVAS.width / 200) * 3;
    SIZES.border.margin = getBorderMargin();
    SIZES.border.height = CANVAS.width / 150;
    SIZES.brick.width = (CANVAS.width - SIZES.brick.margin * 5) / 6;
    SIZES.brick.height =
      (CANVAS.height - getBorderMargin() * 2 - SIZES.border.height - 40) / 9;
    SIZES.font = getFontSize();
    calcGrid();

    [bottomBorder, topBorder].forEach(item => item.repoSize()); // bottom border should repoSize before projectile
    state.projectiles.forEach(projectile => projectile.repoSize()); // projectile should repoSize before coefficient
    [coefficient, record, score].forEach(item => item.repoSize());
    state.bricks.forEach(brick => brick.repoSize());
    state.bonuses.forEach(bonus => bonus.repoSize());
  }
};

export default handleResize;
