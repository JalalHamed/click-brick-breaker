// Objects
import pointer from './classes/pointer.js';
import topBorder from './classes/borders/topBorder.js';
import bottomBorder from './classes/borders/bottomBorder.js';
import record from './classes/statistics/record.js';
import score from './classes/statistics/score.js';
import increscent from './classes/increscent.js';
import coefficient from './classes/coefficient.js';
import fps from './classes/fps.js';
// Functions
import swingBonusRing from './motions/swingBonusRing.js';
import loweringBaB from './motions/loweringBaB.js';
import emitProjectiles from './motions/emitProjectiles.js';
import { isAnythingMoving } from './helpers.js';
// Configs
import { C, CANVAS } from './config.js';
// State
import state from './state.js';

const draw = () => {
	C.clearRect(0, 0, CANVAS.width, CANVAS.height);

	[fps, score, record, coefficient].forEach(item => item.draw());
	[...state.bricks, ...state.bonuses].forEach(item => item.draw());
	if (state.isMouseInBorder && !isAnythingMoving()) pointer.draw();
	if (state.projectiles.some(projectile => projectile.mode !== 'stable'))
		state.projectiles.forEach(projectile => projectile.draw());
	else state.projectile.draw();
	if (increscent.mode === 'rise') increscent.draw();
	if (state.pieces.borders.length) state.pieces.borders.forEach(piece => piece.draw());
	else [topBorder, bottomBorder].forEach(border => border.draw());
	if (state.pieces.bricks.length) state.pieces.bricks.forEach(piece => piece.draw());
	if (state.pieces.bonuses.length) state.pieces.bonuses.forEach(piece => piece.draw());

	// Motions
	if (state.counter % 2 === 0) swingBonusRing();
	if (state.projectiles.some(projectile => projectile.mode === 'emit')) emitProjectiles();
	if (
		state.bricks.every(item => item.mode === 'lower') &&
		state.bonuses.some(item => item.mode === 'lower') // some bonuses might be in drop/merge mode
	)
		loweringBaB();
};

export default draw;
