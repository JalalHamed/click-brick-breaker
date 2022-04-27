// Constructor Instances
import coefficient from '../../classes/coefficient.js';
import topBorder from '../../classes/borders/topBorder.js';
import bottomBorder from '../../classes/borders/bottomBorder.js';
import score from '../../classes/statistics/score.js';
import record from '../../classes/statistics/record.js';
// Functions
import genBaB from '../generators/genBaB.js';
import genBonusVelocity from '../generators/genBonusVelocity.js';
import { haveAllTheProjectilesLanded } from '../helpers.js';
// State
import state from '../../state.js';
// Configs
import {
  CANVAS,
  SIZES,
  SAFE_MARGIN_FROM_BORDERS as S_M_F_B,
  BONUS_RING_MAX_RADIUS as B_R_M_R,
  PROJECTILE_SPEED_COEFFICIENT as P_S_C,
} from '../../config.js';

let counter = 0;

const shootProjectiles = () => {
  counter++;

  console.log(state.projectiles);

  state.projectiles.forEach(projectile => {
    if (((projectile.id - 1) * (3 * projectile.r)) / P_S_C <= counter) {
      projectile.update();
      coefficient.decreaseCount();
    }

    // Reverse projectile's direction when hitting the left and right borders
    if (
      projectile.pos.x - projectile.r <= 0 ||
      projectile.pos.x + projectile.r >= CANVAS.width
    )
      projectile.velocity.x = -projectile.velocity.x;
    // Reverse projectile's direction when hitting the top border
    if (projectile.pos.y <= topBorder.heightFromTop + projectile.r) {
      projectile.velocity.y = -projectile.velocity.y;
    }

    // Change projectiles direction on colliding with bricks
    const { width, height } = SIZES.brick;
    state.bricks.forEach(brick => {
      // Hitting top and bottom sides
      if (
        ((projectile.pos.y - projectile.r < brick.pos.y + height + 0.001 &&
          projectile.pos.y + projectile.r > brick.pos.y + height) ||
          (projectile.pos.y - projectile.r < brick.pos.y + 0.001 &&
            projectile.pos.y + projectile.r > brick.pos.y)) &&
        projectile.pos.x > brick.pos.x &&
        projectile.pos.x < brick.pos.x + width
      ) {
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Hitting left and right sides
      if (
        ((projectile.pos.x + projectile.r > brick.pos.x + width + 0.001 &&
          projectile.pos.x - projectile.r < brick.pos.x + width) ||
          (projectile.pos.x + projectile.r > brick.pos.x + 0.001 &&
            projectile.pos.x - projectile.r < brick.pos.x)) &&
        projectile.pos.y < brick.pos.y + height &&
        projectile.pos.y > brick.pos.y
      ) {
        projectile.velocity.x = -projectile.velocity.x;
        brick.collide();
      }
    });

    // Bonus collision
    state.bonuses.forEach(bonus => {
      const dist = Math.hypot(
        bonus.pos.x - projectile.pos.x,
        bonus.pos.y - projectile.pos.y
      );

      if (dist - B_R_M_R < 10) {
        bonus.displayRing = false;
        state.droppingBonuses.push(bonus);
        state.bonuses = state.bonuses.filter(item => item.id !== bonus.id);
      }
    });

    // Land projectile once hitting bottom border
    if (projectile.pos.y > bottomBorder.pos.y - projectile.r) {
      projectile.velocity.x = 0;
      projectile.velocity.y = 0;

      projectile.pos.y = bottomBorder.pos.y - projectile.r;

      // Prevent projectile from going over the canvas' left and right border when landing
      if (projectile.pos.x < projectile.r + S_M_F_B)
        projectile.pos.x = projectile.r + S_M_F_B;
      if (projectile.pos.x > CANVAS.width - projectile.r - S_M_F_B)
        projectile.pos.x = CANVAS.width - projectile.r - S_M_F_B;
    }
  });

  if (haveAllTheProjectilesLanded() && !state.droppingBonuses.length) {
    state.isProjectileMoving = false;
    counter = 0;
    state.setLS({ projectile: state.projectiles[0].pos.x });
    coefficient.regainCount();

    if (state.mergingBonuses.length) {
      state.mergingBonuses.forEach(bonus => bonus.calcSteps());
      genBonusVelocity();
    }

    score.addOne();
    if (record.count < score.count) record.addOne();
    genBaB();
    state.areBricksAndBonusesMoving = true;
  }
};

export default shootProjectiles;
