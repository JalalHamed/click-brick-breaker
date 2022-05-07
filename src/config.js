// Functions
import { getBorderMargin, getFontSize } from './functions/helpers.js';

export const CANVAS = document.querySelector('CANVAS');
export const C = CANVAS.getContext('2d');

export const CANVAS_MIN_WIDTH = 350;
export const CANVAS_MIN_HEIGHT = 600;

CANVAS.height =
  innerHeight >= CANVAS_MIN_HEIGHT ? innerHeight : CANVAS_MIN_HEIGHT;
CANVAS.width = innerWidth >= CANVAS_MIN_WIDTH ? innerWidth : CANVAS_MIN_WIDTH;

// NOTE: colors MUST be in RGB format
export const COLORS = {
  projectile: 'rgb(93, 167, 239)',
  bonus: 'rgb(79, 234, 115)',
  pointer: {
    line: 'rgb(93, 167, 239, 0.5)',
    arrow: 'rgb(93, 167, 239, 0.5)',
    particle: 'rgb(93, 167, 239, 0.5)',
  },
};

export const MIN_PARTICLE_RADIUS = 6;
export const BRICKS_MARGIN = 3;

export const SIZES = {
  border: {
    margin: getBorderMargin(),
    height: CANVAS.width / 150,
  },
  projectile: {
    radius: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200),
  },
  brick: {
    width: (CANVAS.width - BRICKS_MARGIN * 5) / 6,
    // prettier-ignore
    height: (CANVAS.height - getBorderMargin() * 2 - CANVAS.width / 150 - BRICKS_MARGIN * 8) / 9,
  },
  bonus: {
    radius: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200),
    ring: {
      min: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200),
      max: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200) * 2.5,
    },
  },
  font: getFontSize(),
};

export const MAX_ANGLE = 2.96706; // 2.96706 radiance = 170 degrees
export const MIN_ANGLE = 0.174533; // 0.174533 radiance = 10 degrees
export const SAFE_MARGIN_FROM_CANVAS_SIDES = 0.1; // so it won't get buggy and stuck.
export const BRICK_AND_BONUS_BOUNCE_SIZE = SIZES.brick.height / 2;
export const INCRESCENT_DISTANCE_TO_TAKE = 150;
export const PROJECTILE_VELOCITY_COEFFICIENT = 15;
export const MERGING_VELOCITY = 15;
export const BONUS_RING_MIN_ADD = 0.4;
export const EMITTED_PROJECTILES_MARGIN = innerWidth < 700 ? 2 : 3;
