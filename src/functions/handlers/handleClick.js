// Classes
import Projectile from '../../classes/Projectile.js';
// Constructor Instances
import coefficient from '../../classes/coefficient.js';
// Functions
import {
  getAngle,
  isAnythingMoving,
  isInBorder,
} from '../../functions/helpers.js';
// Configs
import { CANVAS, PROJECTILE_SPEED_COEFFICIENT as P_S_C } from '../../config.js';
// State
import state from '../../state.js';

const handleClick = e => {
  if (isInBorder(e.y) && !isAnythingMoving()) {
    state.isProjectileMoving = true;
    state.isMouseInBorder = false; // without this, the pointer will be drawn after the projectiles land on the same spot it was when the click event happened whether the mouse is inside or outside of the borders.
    CANVAS.style.cursor = 'auto';
    const angle = getAngle(e);
    const velocity = {
      x: -Math.cos(angle) * P_S_C,
      y: -Math.sin(angle) * P_S_C,
    };
    state.projectiles.forEach(projectile => {
      projectile.velocity = velocity;
    });
    if (state.projectiles.length < coefficient.count) {
      const shortage = coefficient.count - state.projectiles.length;
      for (let i = 0; i < shortage; i++) {
        state.projectiles.push(new Projectile({ velocity }));
      }
    }
  }
};

export default handleClick;
