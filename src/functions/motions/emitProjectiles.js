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
// Configs
import {
  CANVAS,
  SIZES,
  SAFE_MARGIN_FROM_CANVAS_SIDES as S_M_F_C_S,
  PROJECTILE_VELOCITY_COEFFICIENT as P_V_C,
  EMITTED_PROJECTILES_MARGIN as E_P_M,
} from '../../config.js';
// State
import state from '../../state.js';

let counter = 0;
let isFirstOneToLand = true;

const emitProjectiles = () => {
  counter++;

  state.projectiles.forEach(projectile => {
    const delay = projectile.id * E_P_M;
    if (delay <= counter) projectile.update();
    if (delay === counter) coefficient.decreaseCount();

    // Colliding with canvas' left side
    if (projectile.perimeter('left') + projectile.velocity.x < 0) {
      projectile.pos.x = SIZES.projectile.radius + S_M_F_C_S;
      projectile.velocity.x = -projectile.velocity.x;
    }

    // Colliding with canvas' right side
    if (projectile.perimeter('right') + projectile.velocity.x > CANVAS.width) {
      projectile.pos.x = CANVAS.width - SIZES.projectile.radius - S_M_F_C_S;
      projectile.velocity.x = -projectile.velocity.x;
    }

    // Colliding with top-border
    // prettier-ignore
    if (projectile.perimeter('top') - topBorder.heightFromTop + projectile.velocity.y < 0) { 
      projectile.pos.y = topBorder.heightFromTop + SIZES.projectile.radius;
      projectile.velocity.y = -projectile.velocity.y;
    }

    // Colliding with brick
    const { width, height } = SIZES.brick;
    state.bricks.forEach(brick => {
      // Bottom side
      if (
        // prettier-ignore
        projectile.perimeter('top') - (brick.pos.y + height) + projectile.velocity.y < 0 &&
        projectile.perimeter('top') > brick.pos.y + height &&
        projectile.perimeter('right') > brick.pos.x &&
        projectile.perimeter('left') < brick.pos.x + width
      ) {
        projectile.pos.y = brick.pos.y + height + SIZES.projectile.radius;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Top side
      if (
        // prettier-ignore
        brick.pos.y - projectile.perimeter('bottom') - projectile.velocity.y < 0 &&
        projectile.perimeter('bottom') < brick.pos.y &&
        projectile.perimeter('right') > brick.pos.x &&
        projectile.perimeter('left') < brick.pos.x + width
      ) {
        projectile.pos.y = brick.pos.y - SIZES.projectile.radius;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Left side
      if (
        // prettier-ignore
        brick.pos.x - projectile.perimeter('right') - projectile.velocity.x < 0 &&
        projectile.perimeter('right') < brick.pos.x &&
        projectile.perimeter('bottom') > brick.pos.y &&
        projectile.perimeter('top') < brick.pos.y + height
      ) {
        projectile.pos.x = brick.pos.x - SIZES.projectile.radius;
        projectile.velocity.x = -projectile.velocity.x;
        brick.collide();
      }

      // Right side
      if (
        // prettier-ignore
        projectile.perimeter('left') - (brick.pos.x + width) + projectile.velocity.x < 0 &&
        projectile.perimeter('left') > brick.pos.x + width &&
        projectile.perimeter('bottom') > brick.pos.y &&
        projectile.perimeter('top') < brick.pos.y + height
      ) {
        projectile.pos.x = brick.pos.x + width + SIZES.projectile.radius;
        projectile.velocity.x = -projectile.velocity.x;
        brick.collide();
      }

      // Bottom-left corner
      if (
        // prettier-ignore
        brick.pos.x - projectile.perimeter('right') - projectile.velocity.x < 0 && 
        projectile.perimeter('right') < brick.pos.x &&
        projectile.perimeter('top') - (brick.pos.y + height) + projectile.velocity.y < 0 &&
        projectile.perimeter('top') > brick.pos.y + height
      ) {
        projectile.pos.x = brick.pos.x - SIZES.projectile.radius / Math.sqrt(2);
        projectile.pos.y =
          brick.pos.y + height + SIZES.projectile.radius / Math.sqrt(2);
        projectile.velocity.x = -projectile.velocity.x;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Bottom-right corner
      if (
        // prettier-ignore
        projectile.perimeter('left') - (brick.pos.x + width) + projectile.velocity.x < 0 && 
        projectile.perimeter('left') > brick.pos.x + width &&
        projectile.perimeter('top') - (brick.pos.y + height) + projectile.velocity.y < 0 &&
        projectile.perimeter('top') > brick.pos.y + height
      ) {
        projectile.pos.x =
          brick.pos.x + width + SIZES.projectile.radius / Math.sqrt(2);
        projectile.pos.y =
          brick.pos.y + height + SIZES.projectile.radius / Math.sqrt(2);
        projectile.velocity.x = -projectile.velocity.x;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Top-right corner
      if (
        // prettier-ignore
        projectile.perimeter('left') - (brick.pos.x + width) + projectile.velocity.x < 0 &&
        projectile.perimeter('left') > brick.pos.x + width &&
        brick.pos.y - projectile.perimeter('bottom') - projectile.velocity.y < 0 &&
        projectile.perimeter('bottom') < brick.pos.y
      ) {
        projectile.pos.x =
          brick.pos.x + width + SIZES.projectile.radius / Math.sqrt(2);
        projectile.pos.y = brick.pos.y - SIZES.projectile.radius / Math.sqrt(2);
        projectile.velocity.x = -projectile.velocity.x;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Top-left corner
      if (
        // prettier-ignore
        brick.pos.x - projectile.perimeter('right') - projectile.velocity.x < 0 &&
        projectile.perimeter('right') < brick.pos.x &&
        brick.pos.y - projectile.perimeter('bottom') - projectile.velocity.y < 0 &&
        projectile.perimeter('bottom') < brick.pos.y
      ) {
        projectile.pos.x = brick.pos.x + SIZES.projectile.radius / Math.sqrt(2);
        projectile.pos.y = brick.pos.y - SIZES.projectile.radius / Math.sqrt(2);
        projectile.velocity.x = -projectile.velocity.x;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }
    });

    // Colliding with bonus
    state.bonuses.forEach(bonus => {
      const dist = Math.hypot(
        bonus.pos.x - projectile.pos.x,
        bonus.pos.y - projectile.pos.y
      );

      // Why the hell 10? Look into this...
      if (dist - SIZES.bonus.ring.max < 10 && bonus.mode === 'regular')
        bonus.mode = 'drop';
    });

    // Colliding with bottom-border
    if (projectile.perimeter('bottom') > bottomBorder.pos.y) {
      projectile.velocity.x = 0;
      projectile.velocity.y = 0;

      projectile.pos.y = bottomBorder.pos.y - SIZES.projectile.radius;

      // Prevent projectile from going over the canvas' left and right side when landing
      if (projectile.pos.x < SIZES.projectile.radius + S_M_F_C_S)
        projectile.pos.x = SIZES.projectile.radius + S_M_F_C_S;
      if (projectile.pos.x > CANVAS.width - SIZES.projectile.radius - S_M_F_C_S)
        projectile.pos.x = CANVAS.width - SIZES.projectile.radius - S_M_F_C_S;

      // Save the first one to land as the main projectile and merge the rest
      if (isFirstOneToLand) {
        state.projectile = projectile;
        isFirstOneToLand = false;
      } else if (projectile.pos.x !== state.projectile.pos.x)
        state.mergingProjectiles.push(projectile);
    }
  });

  if (
    haveAllTheProjectilesLanded() &&
    state.bonuses.every(bonus => bonus.mode !== 'drop')
  ) {
    isFirstOneToLand = true;
    state.isMoving.projectiles = false;
    counter = 0;
    state.setLS({ projectile: state.projectile.pos.x });
    coefficient.regainCount();

    if (state.bonuses.some(bonus => bonus.mode === 'merge')) {
      genBonusVelocity();
    }

    score.addOne();
    if (record.count < score.count) record.addOne();
    genBaB();
    state.isMoving.BaB = true;
  }
};

export default emitProjectiles;
