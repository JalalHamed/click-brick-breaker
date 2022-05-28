// Classes
import Projectile from '../classes/Projectile.js';
// Objects
import coefficient from '../classes/coefficient.js';
// Functions
import { getAngle, isAnythingMoving, isInBorder } from '../helpers.js';
// Configs
import { CANVAS, VELOCITY } from '../config.js';
// State
import state from '../state.js';

const handleClick = e => {
	if (isInBorder(e.y) && !isAnythingMoving()) {
		const angle = getAngle(e);
		const velocity = {
			x: -Math.cos(angle) * VELOCITY.projectile,
			y: -Math.sin(angle) * VELOCITY.projectile,
		};

		state.projectiles.forEach(projectile => {
			projectile.mode = 'emit';
			projectile.velocity.x = velocity.x;
			projectile.velocity.y = velocity.y;
		});

		state.isMouseInBorder = false; // without this, the pointer will be drawn after the projectiles land on the same spot it was when the click event happened whether the mouse is inside or outside the borders.
		CANVAS.style.cursor = 'auto';

		if (state.isFirstRound) state.isFirstRound = false;
	}
};

export default handleClick;
