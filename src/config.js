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

export const SIZES = {
  border: {
    margin: getBorderMargin(),
    height: CANVAS.width / 150,
  },
  projectile: {
    radius: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200),
  },
  brick: {
    margin: 5,
    width: (CANVAS.width - 25) / 6, // 30 = SIZES.brick.margin * 5 (the maximum number of bricks in a row is 5)
    height:
      (CANVAS.height - getBorderMargin() * 2 - CANVAS.width / 150 - 40) / 9, // 40 = SIZES.brick.margin * 8 (the maximum number of bricks in a column is 8)
  },
  bonus: {
    radius: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200),
    ring: {
      min: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200),
      max: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200) * 2.5,
      radius: MIN_PARTICLE_RADIUS + Math.round(CANVAS.width / 200),
    },
  },
  font: getFontSize(),
};

export const MAX_ANGLE = 2.96706; // 2.96706 radiance = 170 degrees
export const MIN_ANGLE = 0.174533; // 0.174533 radiance = 10 degrees
export const SAFE_MARGIN_FROM_BORDERS = 0.1; // so it won't get buggy and stuck.
export const BRICK_AND_BONUS_BOUNCE_SIZE = 15;
export const INCRESCENT_DISTANCE_TO_TAKE = 150;
export const PROJECTILE_VELOCITY_COEFFICIENT = 15;
export const MERGING_VELOCITY = 15;
export const BONUS_RING_MIN_ADD = 0.4;
