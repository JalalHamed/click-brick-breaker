// Functions
import { getBorderMargin, getFontSize } from './functions/helpers.js';

export const CANVAS_MIN_WIDTH = 350;
export const CANVAS_MIN_HEIGHT = 600;
export const CANVAS = document.querySelector('CANVAS');
CANVAS.height =
  innerHeight >= CANVAS_MIN_HEIGHT ? innerHeight : CANVAS_MIN_HEIGHT;
CANVAS.width = innerWidth >= CANVAS_MIN_WIDTH ? innerWidth : CANVAS_MIN_WIDTH;
export const C = CANVAS.getContext('2d');

// NOTE: colors MUST be in RGB format
export const COLORS = {
  projectile: 'rgb(93, 167, 239)',
  bonus: 'rgb(79, 234, 115)',
  pointer: {
    line: 'rgb(93, 167, 239, 0.5)',
    arrow: 'rgb(93, 167, 239, 0.5)',
    ball: 'rgb(93, 167, 239, 0.5)',
  },
};

export const MIN_PROJECTILE_RADIUS = 7;

export const SIZES = {
  projectile: {
    radius: MIN_PROJECTILE_RADIUS + Math.round(CANVAS.width / 200),
  },
  border: {
    margin: getBorderMargin(),
    height: CANVAS.width / 150,
  },
  brick: {
    margin: 5,
    width: (CANVAS.width - 25) / 6, // 30 = SIZES.brick.margin * 5 (the maximum number of bricks in a row is 5)
    height:
      (CANVAS.height - getBorderMargin() * 2 - CANVAS.width / 150 - 40) / 9, // 40 = SIZES.brick.margin * 8 (the maximum number of bricks in a column is 8)
  },
  font: getFontSize(),
};

export const MAX_ANGLE = 2.96706; // 2.96706 radiance = 170 degrees
export const MIN_ANGLE = 0.174533; // 0.174533 radiance = 10 degrees

export const SAFE_MARGIN_FROM_BORDERS = 0.1; // so it won't get buggy and stuck.

export const BRICK_AND_BONUS_BOUNCE_SIZE = 10;

export const BONUS_RING_MAX_RADIUS = SIZES.projectile.radius * 1.7;
