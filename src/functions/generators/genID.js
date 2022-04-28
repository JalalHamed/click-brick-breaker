// State
import state from '../../state.js';

const genID = status => {
  switch (status) {
    case 'projectile':
      return state.ids.projectile++;
    case 'bonus':
      return state.ids.bonus++;
    case 'brick':
      return state.ids.brick++;
    default:
      return;
  }
};

export default genID;
