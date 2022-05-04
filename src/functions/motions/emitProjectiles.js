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
  MERGING_VELOCITY as M_V,
} from '../../config.js';
// State
import state from '../../state.js';

let counter = 0;
let isFirstOneToLand = true;

const emitProjectiles = () => {
  counter++;

  state.projectiles.forEach(projectile => {
    const delay = Math.floor(
      ((projectile.id - 1) * SIZES.projectile.radius * 3) / P_V_C + 1
    );
    if (delay <= counter) projectile.update();
    if (delay === counter) coefficient.decreaseCount();

    // Colliding with canvas' left side (projectile's x velocity is negative while it's going left)
    if (projectile.perimeter('left') + projectile.velocity.x < 0) {
      projectile.pos.x = SIZES.projectile.radius + S_M_F_C_S;
      projectile.velocity.x = -projectile.velocity.x;
    }

    // Colliding with canvas' right side (projectile's x velocity is positive while it's going right)
    if (projectile.perimeter('right') + projectile.velocity.y > CANVAS.width) {
      projectile.pos.x = CANVAS.width - SIZES.projectile.radius - S_M_F_C_S;
      projectile.velocity.x = -projectile.velocity.x;
    }

    // Colliding with top-border (projectile's y velocity is negative while it's going up)
    // prettier-ignore
    if (projectile.perimeter('top') - topBorder.heightFromTop + projectile.velocity.y < 0) { 
      projectile.pos.y = topBorder.heightFromTop + SIZES.projectile.radius;
      projectile.velocity.y = -projectile.velocity.y;
    }

    // Colliding with brick
    const { width, height } = SIZES.brick;
    state.bricks.forEach(brick => {
      // Colliding with brick's bottom side (projectile's y velocity is negative while it's going up)
      if (
        // prettier-ignore
        projectile.perimeter('top') - (brick.pos.y + height) + projectile.velocity.y < 0 &&
        projectile.perimeter('top') > brick.pos.y + height && // so it don't detect collision when it's above the brick but has not collided with the bottom side
        projectile.perimeter('right') > brick.pos.x &&
        projectile.perimeter('left') < brick.pos.x + width
      ) {
        console.log('bottom');
        projectile.pos.y = brick.pos.y + height + SIZES.projectile.radius;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Colliding with brick's top side (projectile's y velocity is positive while it's going down)
      if (
        // prettier-ignore
        brick.pos.y - projectile.perimeter('bottom') - projectile.velocity.y < 0 &&
        projectile.perimeter('bottom') < brick.pos.y && // so it don't detect collision when it's behind the brick but has not collided with the top side
        projectile.perimeter('right') > brick.pos.x &&
        projectile.perimeter('left') < brick.pos.x + width
      ) {
        console.log('top');
        projectile.pos.y = brick.pos.y - SIZES.projectile.radius;
        projectile.velocity.y = -projectile.velocity.y;
        brick.collide();
      }

      // Colliding with left and right sides
      if (
        ((projectile.perimeter('right') > brick.pos.x + width + 0.001 &&
          projectile.perimeter('left') < brick.pos.x + width) ||
          (projectile.perimeter('right') > brick.pos.x + 0.001 &&
            projectile.perimeter('left') < brick.pos.x)) &&
        projectile.perimeter('bottom') < brick.pos.y + height &&
        projectile.perimeter('top') > brick.pos.y
      ) {
        projectile.velocity.x = -projectile.velocity.x;
        brick.collide();
      }
    });

    // Colliding with bonus
    state.bonuses.forEach(bonus => {
      const dist = Math.hypot(
        bonus.pos.x - projectile.pos.x,
        bonus.pos.y - projectile.pos.y
      );

      // prettier-ignore
      if (dist - SIZES.bonus.ring.max < 10) { // Why the hell 10? Look into this...
        bonus.displayRing = false;
        state.droppingBonuses.push(bonus);
        state.bonuses = state.bonuses.filter(item => item.id !== bonus.id);
      }
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

  if (haveAllTheProjectilesLanded() && !state.droppingBonuses.length) {
    isFirstOneToLand = true;
    state.isMoving.projectiles = false;
    counter = 0;
    state.setLS({ projectile: state.projectile.pos.x });
    coefficient.regainCount();

    if (state.mergingBonuses.length) {
      state.mergingBonuses.forEach(bonus => bonus.calcSteps());
      genBonusVelocity();
    }

    score.addOne();
    state.projectile;
    if (record.count < score.count) record.addOne();
    genBaB();
    state.isMoving.BaB = true;
  }
};

export default emitProjectiles;
