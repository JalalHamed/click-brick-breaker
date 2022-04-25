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
} from '../../config.js';

const shootProjectiles = () => {
  state.shotProjectiles.forEach(shotProjectile => {
    shotProjectile.draw();
    shotProjectile.update();
    coefficient.decreaseCount();

    // Reverse projectile's direction when hitting the left and right borders
    if (
      shotProjectile.pos.x - shotProjectile.r <= 0 ||
      shotProjectile.pos.x + shotProjectile.r >= CANVAS.width
    )
      shotProjectile.velocity.x = -shotProjectile.velocity.x;
    // Reverse projectile's direction when hitting the top border
    if (shotProjectile.pos.y <= topBorder.heightFromTop + shotProjectile.r) {
      shotProjectile.velocity.y = -shotProjectile.velocity.y;
    }

    // Change projectiles direction on colliding with bricks
    const { width, height } = SIZES.brick;
    state.bricks.forEach(brick => {
      // Hitting top and bottom sides
      if (
        ((shotProjectile.pos.y - shotProjectile.r <
          brick.pos.y + height + 0.001 &&
          shotProjectile.pos.y + shotProjectile.r > brick.pos.y + height) ||
          (shotProjectile.pos.y - shotProjectile.r < brick.pos.y + 0.001 &&
            shotProjectile.pos.y + shotProjectile.r > brick.pos.y)) &&
        shotProjectile.pos.x > brick.pos.x &&
        shotProjectile.pos.x < brick.pos.x + width
      ) {
        shotProjectile.velocity.y = -shotProjectile.velocity.y;
        brick.collide();
      }

      // Hitting left and right sides
      if (
        ((shotProjectile.pos.x + shotProjectile.r >
          brick.pos.x + width + 0.001 &&
          shotProjectile.pos.x - shotProjectile.r < brick.pos.x + width) ||
          (shotProjectile.pos.x + shotProjectile.r > brick.pos.x + 0.001 &&
            shotProjectile.pos.x - shotProjectile.r < brick.pos.x)) &&
        shotProjectile.pos.y < brick.pos.y + height &&
        shotProjectile.pos.y > brick.pos.y
      ) {
        shotProjectile.velocity.x = -shotProjectile.velocity.x;
        brick.collide();
      }
    });

    // Bonus collision
    state.bonuses.forEach(bonus => {
      const dist = Math.hypot(
        bonus.pos.x - shotProjectile.pos.x,
        bonus.pos.y - shotProjectile.pos.y
      );

      if (dist - B_R_M_R < 10) {
        bonus.displayRing = false;
        state.droppingBonuses.push(bonus);
        state.bonuses = state.bonuses.filter(item => item.id !== bonus.id);
      }
    });

    // Land projectile once hitting bottom border
    if (shotProjectile.pos.y > bottomBorder.pos.y - shotProjectile.r) {
      shotProjectile.velocity.x = 0;
      shotProjectile.velocity.y = 0;

      shotProjectile.pos.y = bottomBorder.pos.y - shotProjectile.r;

      // Prevent projectile from going over the canvas' left and right border when landing
      if (shotProjectile.pos.x < shotProjectile.r + S_M_F_B)
        shotProjectile.pos.x = shotProjectile.r + S_M_F_B;
      if (shotProjectile.pos.x > CANVAS.width - shotProjectile.r - S_M_F_B)
        shotProjectile.pos.x = CANVAS.width - shotProjectile.r - S_M_F_B;
    }
  });

  if (haveAllTheProjectilesLanded() && !state.droppingBonuses.length) {
    state.isProjectileMoving = false;
    state.setLS({ projectile: state.shotProjectiles[0].pos.x });
    coefficient.regainCount();
    state.shotProjectiles = [];

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
