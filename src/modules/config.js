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
  _ball: {
    radius: Math.round((canvas.width / 100) * 1.3),
  },
  _border: {
    margin: canvas.height / 5,
    height: canvas.width / 125,
  },
  _brick: {
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
