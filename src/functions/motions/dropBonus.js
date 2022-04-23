// Constructor Instance
import bottomBorder from '../../classes/borders/bottomBorder.js';
// Configs
import { SIZES } from '../../config.js';
// State
import state from '../../state.js';

const dropBonus = () => {
  state.collidedBonuses.forEach(bonus => {
    if (bonus.pos.y < bottomBorder.pos.y) bonus.pos.y += 7;
    else {
      bonus.pos.y = bottomBorder.pos.y - SIZES.projectile.radius;
      state.isBonusMoving = false;
    }
  });
};

/*
Notes for my tomorrow self:
what if projectile hits more than one bonus? will they both drop? if so should I call this function 'dropBonuses' instead? and should the same go for the 'mergeBonus' function that I'm about to make?
*/

export default dropBonus;
