// Functions
import {
  getBorderHeight,
  getBorderMargin,
  getBrickHeight,
  getBrickWidth,
  getFontSize,
  getParticleRadius,
} from './helpers.js';

export const CANVAS = document.querySelector('CANVAS');
export const C = CANVAS.getContext('2d');

export const CANVAS_MIN_WIDTH = 350;
export const CANVAS_MIN_HEIGHT = 600;
CANVAS.height =
  innerHeight >= CANVAS_MIN_HEIGHT ? innerHeight : CANVAS_MIN_HEIGHT;
CANVAS.width = innerWidth >= CANVAS_MIN_WIDTH ? innerWidth : CANVAS_MIN_WIDTH;

export const MIN_PARTICLE_RADIUS = 6;
export const BRICKS_MARGIN = 3;
export const MAX_ANGLE = 2.96706; // 2.96706 radiance = 170 degrees
export const MIN_ANGLE = 0.174533; // 0.174533 radiance = 10 degrees
export const SAFE_MARGIN_FROM_CANVAS_SIDES = 0.1; // so it won't get buggy and stuck.
export const INCRESCENT_DISTANCE_TO_TAKE = 150;
export const BONUS_RING_MIN_ADD = 0.4;
export const BRICK_COLOR_RETRIEVE_DELAY = 6;
export const GAME_COUNTER_MAX_VALUE = 999;
export const EMITTED_PROJECTILES_MARGIN = innerWidth < 700 ? 2 : 3;
export const PIECE_DISTANCE_TO_TAKE_BEFORE_FADE = getBorderMargin() / 3;
export const BRICKS_AND_BONUSES_BOUNCE_SIZE = getBrickHeight() / 2;

export const VELOCITY = Object.freeze({
  projectile: 15,
  merging: 20,
  dropping: 20,
});

// NOTE: colors MUST be in RGB format
export const COLORS = Object.freeze({
  projectile: 'rgb(93, 167, 239)',
  bonus: 'rgb(79, 234, 115)',
  pointer: {
    line: 'rgb(93, 167, 239, 0.5)',
    arrow: 'rgb(93, 167, 239, 0.5)',
    particle: 'rgb(93, 167, 239, 0.5)',
  },
  brick: { heaviest: 'rgb(255, 80, 80)', lightest: 'rgb(255, 160, 120)' },
});

export const SIZES = {
  border: { margin: getBorderMargin(), height: getBorderHeight() },
  projectile: { radius: getParticleRadius() },
  brick: { width: getBrickWidth(), height: getBrickHeight() },
  bonus: {
    radius: getParticleRadius(),
    ring: {
      min: getParticleRadius(),
      max: getParticleRadius() * 1.8,
      lineWidth: getBorderHeight(),
    },
  },
  pieces: {
    brick: { width: getBrickWidth() / 6, height: getBrickHeight() / 4 },
    bonus: { width: getBorderHeight() * 1.5, height: getBorderHeight() * 1.5 },
  },
  font: getFontSize(),
};
