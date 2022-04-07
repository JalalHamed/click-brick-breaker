export function getSizes(canvas) {
  return {
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
}

export function findIndex(indexes) {
  let index;
  do {
    index = Math.floor(Math.random() * 7);
  } while (indexes.includes(index));
  return index;
}
