export const CANVAS = document.querySelector('CANVAS');
export const C = CANVAS.getContext('2d');
CANVAS.height = innerHeight;
CANVAS.width = innerWidth;

export const COLORS = {
  ball: {
    main: 'rgb(31, 115, 242)',
    bonus: 'rgb(79, 234, 115)',
    pointer: 'rgb(143, 185, 248)',
  },
  brick: 'rgb(239, 73, 33)',
  pointer: {
    line: 'rgb(31, 115, 242, 0.5)',
    arrow: 'rgb(31, 115, 242, 0.5)',
  },
};

export const SIZES = {
  ball: {
    radius: Math.round((CANVAS.width / 100) * 1.3),
  },
  border: {
    margin: CANVAS.height / 5,
    height: CANVAS.width / 125,
  },
  brick: {
    margin: CANVAS.width / 120,
    width: (CANVAS.width - (CANVAS.width / 120) * 6) / 7,
    height:
      (CANVAS.height -
        ((CANVAS.height / 5) * 2 + (CANVAS.width / 125) * 2) -
        (CANVAS.width / 120) * 8) /
      9,
  },
};

export const MAX_ANGLE = 2.96706; // 2.96706 radiance = 170 degrees
export const MIN_ANGLE = 0.174533; // 0.174533 radiance = 10 degrees

export const SAFE_MARGIN_FROM_BORDERS = 0.1; // if ball's x position is exactly equal to the ball's radius (which means it's completely in the screen yet tangent with the left side of the screen) it would get buggy and would not fly towards the correct direction after shooting. Same goes for the right side of the screen (if ball's x pos is exactly equal to CANVAS' width minus the ball's radius). So discoverd there has to be a tiny bit of a margin with the borders.
