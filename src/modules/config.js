export const COLORS = {
  ball: 'rgb(31, 115, 242)',
  brick: 'rgb(239, 73, 33)',
  pointer: {
    line: 'rgb(31, 115, 242, 0.5)',
    ball: 'rgb(143, 185, 248)',
  },
  bonus: 'rgb(79, 234, 115)',
};

const canvas = document.querySelector('canvas');
canvas.height = innerHeight;
canvas.width = innerWidth;
export const SIZES = {
  ball: {
    radius: Math.round((canvas.width / 100) * 1.3),
  },
  border: {
    margin: canvas.height / 5,
    height: canvas.width / 125,
  },
  brick: {
    margin: canvas.width / 120,
    width: (canvas.width - (canvas.width / 120) * 6) / 7,
    height:
      (canvas.height -
        ((canvas.height / 5) * 2 + (canvas.width / 125) * 2) -
        (canvas.width / 120) * 8) /
      9,
  },
};

export const MAX_ANGLE = 2.96706; // 2.96706 radiance = 170 degrees
export const MIN_ANGLE = 0.174533; // 0.174533 radiance = 10 degrees

export const SAFE_MARGIN_FROM_BORDERS = 0.1; // if ball's x position is exactly equal to the ball's radius (which means it's completely in the screen yet tangent with the left side of the screen) it would get buggy and would not fly towards the correct direction after shooting. Same goes for the right side of the screen (if ball's x pos is exactly equal to canvas' width minus the ball's radius). So discoverd there has to be a tiny bit of a margin with the borders.
