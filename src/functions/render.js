// State
import { state } from '../state.js';

const render = () => {
  state.bonuses.forEach(bonus => bonus.render());
};

export default render;
