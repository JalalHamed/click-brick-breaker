import { getBorderMargin } from './functions/helpers.js';

export const CANVAS_MIN_WIDTH = 350;
export const CANVAS = document.querySelector('CANVAS');
export const C = CANVAS.getContext('2d');
CANVAS.height = innerHeight;
CANVAS.width = innerWidth >= CANVAS_MIN_WIDTH ? innerWidth : CANVAS_MIN_WIDTH;

export const COLORS = {
  ball: {
    main: 'rgb(31, 115, 242)',
    bonus: 'rgb(79, 234, 115)',
    pointer: 'rgb(31, 115, 242, 0.5)',
  },
  brick: 'rgb(239, 73, 33)',
  pointer: {
    line: 'rgb(31, 115, 242, 0.5)',
    arrow: 'rgb(31, 115, 242, 0.5)',
  },
};

export const MIN_BALL_RADIUS = 7;

export const SIZES = {
  ball: {
    radius: MIN_BALL_RADIUS + Math.round(CANVAS.width / 200),
  },
  border: {
    margin: getBorderMargin(),
    height: CANVAS.width / 150,
  },
  brick: {
    margin: 5,
    width: (CANVAS.width - 30) / 7,
    height: (CANVAS.height - getBorderMargin() * 2 - 40) / 9,
  },
};

export const MAX_ANGLE = 2.96706; // 2.96706 radiance = 170 degrees
export const MIN_ANGLE = 0.174533; // 0.174533 radiance = 10 degrees

export const SAFE_MARGIN_FROM_BORDERS = 0.1; // so it won't get buggy and stuck.

export const MAX_COEFFICIENT_FONT_SIZE = 2;
