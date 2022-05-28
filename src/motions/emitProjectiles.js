// Objects
import coefficient from '../classes/coefficient.js';
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import score from '../classes/statistics/score.js';
import record from '../classes/statistics/record.js';
// Functions
import spawnBaB from '../spawns/spawnBaB.js';
import { getXDist } from '../helpers.js';
// Configs
import {
  CANVAS,
  SIZES,
  SAFE_MARGIN_FROM_CANVAS_SIDES as S_M_F_C_S,
  EMITTED_PROJECTILES_MARGIN as E_P_M,
} from '../config.js';
// State
import state from '../state.js';

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
      projectile.velocity.x *= -1;
    }

    // Colliding with canvas' right side
    if (projectile.perimeter('right') + projectile.velocity.x > CANVAS.width) {
      projectile.pos.x = CANVAS.width - SIZES.projectile.radius - S_M_F_C_S;
      projectile.velocity.x *= -1;
    }

    // Colliding with top-border
    // prettier-ignore
    if (projectile.perimeter('top') + projectile.velocity.y < topBorder.heightFromTop) { 
      projectile.pos.y = topBorder.heightFromTop + SIZES.projectile.radius;
      projectile.velocity.y *= -1;
    }

    // Colliding with brick
    const { width, height } = SIZES.brick;
    const diagonalRadius = SIZES.projectile.radius / Math.sqrt(2);
    state.bricks.forEach(brick => {
      // Bottom side
      if (
        // prettier-ignore
        projectile.perimeter('top') + projectile.velocity.y < brick.pos.y + height &&
        projectile.perimeter('top') > brick.pos.y + height &&
        projectile.pos.x > brick.pos.x &&
        projectile.pos.x < brick.pos.x + width
      ) {
        projectile.pos.y = brick.pos.y + height + SIZES.projectile.radius;
        projectile.velocity.y *= -1;
        brick.collide();
      }

      // Top side
      if (
        // prettier-ignore
        projectile.perimeter('bottom') + projectile.velocity.y > brick.pos.y &&
        projectile.perimeter('bottom') < brick.pos.y &&
        projectile.pos.x > brick.pos.x &&
        projectile.pos.x < brick.pos.x + width
      ) {
        projectile.pos.y = brick.pos.y - SIZES.projectile.radius;
        projectile.velocity.y *= -1;
        brick.collide();
      }

      // Left side
      if (
        // prettier-ignore
        projectile.perimeter('right') + projectile.velocity.x > brick.pos.x &&
        projectile.perimeter('right') < brick.pos.x &&
        projectile.pos.y > brick.pos.y &&
        projectile.pos.y < brick.pos.y + height
      ) {
        projectile.pos.x = brick.pos.x - SIZES.projectile.radius;
        projectile.velocity.x *= -1;
        brick.collide();
      }

      // Right side
      if (
        // prettier-ignore
        projectile.perimeter('left') + projectile.velocity.x < brick.pos.x + width &&
        projectile.perimeter('left') > brick.pos.x + width &&
        projectile.pos.y > brick.pos.y &&
        projectile.pos.y < brick.pos.y + height
      ) {
        projectile.pos.x = brick.pos.x + width + SIZES.projectile.radius;
        projectile.velocity.x *= -1;
        brick.collide();
      }

      // Bottom-left corner
      if (
        // prettier-ignore
        projectile.perimeter('right') + projectile.velocity.x > brick.pos.x && 
        projectile.perimeter('right') < brick.pos.x &&
        projectile.perimeter('top') + projectile.velocity.y < brick.pos.y + height &&
        projectile.perimeter('top') > brick.pos.y + height
      ) {
        projectile.pos.x = brick.pos.x - diagonalRadius;
        projectile.pos.y = brick.pos.y + height + diagonalRadius;
        projectile.velocity.x *= -1;
        projectile.velocity.y *= -1;
        brick.collide();
      }

      // Bottom-right corner
      if (
        // prettier-ignore
        projectile.perimeter('left') + projectile.velocity.x < brick.pos.x + width &&
        projectile.perimeter('left') > brick.pos.x + width &&
        projectile.perimeter('top') + projectile.velocity.y < brick.pos.y + height &&
        projectile.perimeter('top') > brick.pos.y + height
      ) {
        projectile.pos.x = brick.pos.x + width + diagonalRadius;
        projectile.pos.y = brick.pos.y + height + diagonalRadius;
        projectile.velocity.x *= -1;
        projectile.velocity.y *= -1;
        brick.collide();
      }

      // Top-right corner
      if (
        // prettier-ignore
        projectile.perimeter('left') + projectile.velocity.x < brick.pos.x + width &&
        projectile.perimeter('left') > brick.pos.x + width &&
        projectile.perimeter('bottom') + projectile.velocity.y > brick.pos.y &&
        projectile.perimeter('bottom') < brick.pos.y
      ) {
        projectile.pos.x = brick.pos.x + width + diagonalRadius;
        projectile.pos.y = brick.pos.y - diagonalRadius;
        projectile.velocity.x *= -1;
        projectile.velocity.y *= -1;
        brick.collide();
      }

      // Top-left corner
      if (
        // prettier-ignore
        projectile.perimeter('right') + projectile.velocity.x > brick.pos.x && 
        projectile.perimeter('right') < brick.pos.x &&
        projectile.perimeter('bottom') + projectile.velocity.y > brick.pos.y &&
        projectile.perimeter('bottom') < brick.pos.y
      ) {
        projectile.pos.x = brick.pos.x + diagonalRadius;
        projectile.pos.y = brick.pos.y - diagonalRadius;
        projectile.velocity.x *= -1;
        projectile.velocity.y *= -1;
        brick.collide();
      }
    });

    // Colliding with bonus
    state.bonuses.forEach(bonus => {
      const dist = Math.hypot(
        bonus.pos.x - projectile.pos.x,
        bonus.pos.y - projectile.pos.y
      );

      if (
        dist - SIZES.projectile.radius - SIZES.bonus.ring.max < 0 &&
        bonus.mode === 'stable'
      )
        bonus.collide();
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
        projectile.mode = 'stable';
        state.projectile = projectile;
        isFirstOneToLand = false;
      } else if (projectile.pos.x !== state.projectile.pos.x) projectile.mode = 'merge';
      else projectile.mode = 'stable';
    }
  });

  if (state.projectiles.every(projectile => projectile.mode !== 'emit')) {
    isFirstOneToLand = true;
    counter = 0;
    state.setLS({ projectile: state.projectile.pos.x });
    coefficient.regainCount();

    if (state.bonuses.some(bonus => bonus.mode === 'merge')) {
      const bonuses = state.bonuses.filter(bonus => bonus.mode === 'merge');
      bonuses.forEach(bonus => {
        if (!state.furthest.bonus.id) state.furthest.bonus = bonus;
        else if (
          getXDist(bonus, state.projectile) >
          getXDist(state.furthest.bonus, state.projectile)
        )
          state.furthest.bonus = bonus;
      });
      bonuses.forEach(bonus => bonus.calcXVelocity());
    }

    spawnBaB();
  }
};

export default emitProjectiles;
