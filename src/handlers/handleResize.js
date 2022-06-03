// Objects
import record from '../classes/statistics/record.js';
import score from '../classes/statistics/score.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import topBorder from '../classes/borders/topBorder.js';
import coefficient from '../classes/coefficient.js';
import pointer from '../classes/pointer.js';
// Functions
import {
	calcGrid,
	getBorderHeight,
	getBorderMargin,
	getBrickHeight,
	getBrickWidth,
	getFontSize,
	getParticleRadius,
	getPointerArrowLength,
	isAnythingMoving,
} from '../helpers.js';
// Configs
import { CANVAS, SIZES, CANVAS_MIN_WIDTH, CANVAS_MIN_HEIGHT } from '../config.js';
// State
import state from '../state.js';

const handleResize = () => {
	if (
		!isAnythingMoving() &&
		innerWidth >= CANVAS_MIN_WIDTH &&
		innerHeight >= CANVAS_MIN_HEIGHT
	) {
		CANVAS.width = innerWidth;
		CANVAS.height = innerHeight;

		SIZES.border.margin = getBorderMargin();
		SIZES.border.height = getBorderHeight();
		SIZES.projectile.radius = getParticleRadius();
		SIZES.brick.width = getBrickWidth();
		SIZES.brick.height = getBrickHeight();
		SIZES.bonus.radius = getParticleRadius();
		SIZES.bonus.ring.min = getParticleRadius();
		SIZES.bonus.ring.max = getParticleRadius() * 1.8;
		SIZES.bonus.ring.lineWidth = getBorderHeight();
		SIZES.pieces.brick.width = getBrickWidth() / 6;
		SIZES.pieces.brick.height = getBrickHeight() / 4;
		SIZES.pieces.bonus.width = getBorderHeight() * 1.5;
		SIZES.pieces.bonus.height = getBorderHeight() * 1.5;
		SIZES.pieces.border.width = CANVAS.width / 40;
		SIZES.pieces.border.height = getBorderHeight();
		SIZES.pointer.arrow.length = getPointerArrowLength();
		SIZES.font = getFontSize();

		calcGrid();

		[bottomBorder, topBorder].forEach(item => item.rePoSize()); // bottom border should rePoSize before projectile
		state.projectiles.forEach(projectile => projectile.rePoSize()); // projectiles should rePoSize before coefficient
		[coefficient, record, score, pointer].forEach(item => item.rePoSize());
		[...state.bricks, ...state.bonuses].forEach(item => item.rePoSize());

		state.innerWidth = innerWidth;
	}
};

export default handleResize;
