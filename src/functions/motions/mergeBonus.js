// Constructor Instance
import projectile from '../../classes/projectiles/projectile.js';
// Functions
import genBonusColor from '../generators/genBonusColor.js';
// Configs
import { COLORS } from '../../config.js';
// State
import state from '../../state.js';

const mergeBonus = () => {
  state.mergingBonuses.forEach(bonus => {
    bonus.color = genBonusColor(bonus);
    if (bonus.pos.x > projectile.pos.x + bonus.velocity.x)
      bonus.pos.x -= bonus.velocity.x;
    else if (bonus.pos.x < projectile.pos.x - bonus.velocity.x)
      bonus.pos.x += bonus.velocity.x;
    else
      state.mergingBonuses = state.mergingBonuses.filter(
        item => item.id !== bonus.id
      );
  });
};

export default mergeBonus;
