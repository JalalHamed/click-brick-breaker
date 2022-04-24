// Constructor Instance
import projectile from '../../classes/projectiles/projectile.js';
// Configs
import { COLORS } from '../../config.js';

const currBonusColors = COLORS.bonus.slice(4, -1).split(',');
const currProjectileColors = COLORS.projectile.slice(4, -1).split(',');

let colorsDifference = [];
for (let i = 0; i < 3; i++) {
  colorsDifference.push(Math.abs(currBonusColors[i] - currProjectileColors[i]));
}

let steps;
function calcSteps(bonus) {
  steps = Math.floor(
    Math.hypot(bonus.pos.x - projectile.pos.x) / bonus.velocity.x
  );
}

const genBonusColor = bonus => {
  calcSteps(bonus);
  const cBC = bonus.color.slice(4, -1).split(',');
  return `rgb(${+cBC[0] - colorsDifference[0] / steps}, ${
    +cBC[1] - colorsDifference[1] / steps
  }, ${+cBC[2] + colorsDifference[2] / steps})`;
};

export default genBonusColor;
