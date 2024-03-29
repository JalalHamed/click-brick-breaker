// Functions
import { isAnythingMoving, isInBorder } from '../helpers.js';
// Configs
import { CANVAS } from '../config.js';
// State
import state from '../state.js';

const handleMouseMove = e => {
	if (!isAnythingMoving()) {
		if (isInBorder(e.y)) {
			state.mouseCoords = { x: e.x, y: e.y };
			if (CANVAS.style.cursor !== 'pointer') CANVAS.style.cursor = 'pointer';
			if (!state.isMouseInBorder) state.isMouseInBorder = true;
		}
		if (!isInBorder(e.y) && CANVAS.style.cursor !== 'auto') {
			state.mouseCoords = {};
			CANVAS.style.cursor = 'auto';
			if (state.isMouseInBorder) state.isMouseInBorder = false;
		}
	}
};

export default handleMouseMove;
