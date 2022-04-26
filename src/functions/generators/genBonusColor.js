// Configs
import { COLORS } from '../../config.js';

const currBonusColors = COLORS.bonus.slice(4, -1).split(',');
const currProjectileColors = COLORS.projectile.slice(4, -1).split(',');

let colorsDifference = [];
for (let i = 0; i < 3; i++) {
  colorsDifference.push(Math.abs(currBonusColors[i] - currProjectileColors[i]));
}

const genBonusColor = bonus => {
  const cBC = bonus.color.slice(4, -1).split(',');
  return `rgb(${+cBC[0] + colorsDifference[0] / bonus.steps}, ${
    +cBC[1] - colorsDifference[1] / bonus.steps
  }, ${+cBC[2] + colorsDifference[2] / bonus.steps})`;
};

export default genBonusColor;
