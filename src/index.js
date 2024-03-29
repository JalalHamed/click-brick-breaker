// Handlers
import handleMouseMove from './handlers/handleMouseMove.js';
import handleResize from './handlers/handleResize.js';
import handleClick from './handlers/handleClick.js';
// Functions
import spawnBaB from './spawns/spawnBaB.js';
import spawnProjectile from './spawns/spawnProjectile.js';
import spawnBorderPieces from './spawns/spawnBorderPieces.js';
import draw from './draw.js';
import { calcGrid, increase } from './helpers.js';
// Configs
import {
	GAME_COUNTER_MIN_VALUE as G_C_MIN_V,
	GAME_COUNTER_MAX_VALUE as G_C_MAX_V,
} from './config.js';
// State
import state from './state.js';

const animate = () => {
	state.counter = increase(state.counter, 1, G_C_MAX_V, G_C_MIN_V);
	draw();
	requestAnimationFrame(animate);
};

const init = () => {
	document.querySelector('.loading').style.display = 'none';
	[calcGrid, spawnProjectile, spawnBorderPieces, spawnBaB, animate].forEach(item =>
		item()
	);
};

addEventListener('load', init);
addEventListener('resize', handleResize);
addEventListener('mousemove', handleMouseMove);
addEventListener('click', handleClick);
