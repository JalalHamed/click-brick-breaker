// Constructor Instance
import coefficient from '../../classes/coefficient.js';
// Functions
import genBonusColor from '../generators/genBonusColor.js';
// Configs
import { COLORS } from '../../config.js';
// State
import state from '../../state.js';

const mergeBonuses = () => {
  state.mergingBonuses.forEach(bonus => {
    bonus.color = genBonusColor(bonus);
    if (bonus.pos.x > state.projectiles[0].pos.x + bonus.velocity.x)
      bonus.pos.x -= bonus.velocity.x;
    else if (bonus.pos.x < state.projectiles[0].pos.x - bonus.velocity.x)
      bonus.pos.x += bonus.velocity.x;
    else {
      coefficient.increaseCount();
      state.isMoving.increscent = true;
      state.mergingBonuses = state.mergingBonuses.filter(
        item => item.id !== bonus.id
      ); // could even say `state.mergingBonuses = []` since all the bonuses arrive at the same time
    }
  });
};

export default mergeBonuses;
