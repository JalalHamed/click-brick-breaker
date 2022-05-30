// Objects
import coefficient from '../classes/coefficient.js';
import topBorder from '../classes/borders/topBorder.js';
import bottomBorder from '../classes/borders/bottomBorder.js';
import score from '../classes/statistics/score.js';
import record from '../classes/statistics/record.js';
// Functions
import spawnBaB from '../spawns/spawnBaB.js';
import { getXDist } from '../helpers.js';
// Configs
import {
	CANVAS,
	SIZES,
	SAFE_MARGIN_FROM_CANVAS_SIDES as S_M_F_C_S,
	EMITTED_PROJECTILES_MARGIN as E_P_M,
} from '../config.js';
// State
import state from '../state.js';

let counter = 0;
let isFirstOneToLand = true;

const emitProjectiles = () => {
	counter++;

	state.projectiles.forEach(projectile => {
		const delay = projectile.id * E_P_M;
		const ratio = {
			XtoY: Math.abs(projectile.velocity.x / projectile.velocity.y),
			YtoX: Math.abs(projectile.velocity.y / projectile.velocity.x),
		};

		if (delay <= counter) projectile.update();
		if (delay === counter) coefficient.decreaseCount();

		/* Colliding with borders */
		// Canvas' left side
		if (projectile.perimeter('left') + projectile.velocity.x < 0) {
			const shortage = projectile.perimeter('left');

			projectile.pos.x -= shortage;
			if (projectile.velocity.y < 0) projectile.pos.y -= shortage * ratio.YtoX;
			else projectile.pos.y += shortage * ratio.YtoX;

			projectile.velocity.x *= -1;
		}

		// Canvas' right side
		if (projectile.perimeter('right') + projectile.velocity.x > CANVAS.width) {
			const shortage = CANVAS.width - projectile.perimeter('right');

			projectile.pos.x += shortage;
			if (projectile.velocity.y < 0) projectile.pos.y -= shortage * ratio.YtoX;
			else projectile.pos.y += shortage * ratio.YtoX;

			projectile.velocity.x *= -1;
		}

		// Top-border
		if (projectile.perimeter('top') + projectile.velocity.y < topBorder.heightFromTop) {
			const shortage = projectile.perimeter('top') - topBorder.heightFromTop;

			projectile.pos.y -= shortage;
			if (projectile.velocity.x > 0) projectile.pos.x += shortage * ratio.XtoY;
			else projectile.pos.x -= shortage * ratio.XtoY;

			projectile.velocity.y *= -1;
		}

		// Bottom-border
		if (projectile.perimeter('bottom') + projectile.velocity.y > bottomBorder.pos.y) {
			const shortage = bottomBorder.pos.y - projectile.perimeter('bottom');
			projectile.pos.y += shortage;
			if (projectile.velocity.x > 0) projectile.pos.x += shortage * ratio.XtoY;
			else projectile.pos.x -= shortage * ratio.XtoY;

			projectile.velocity.x = projectile.velocity.y = 0;

			// Prevent projectile from going over the canvas' left and right side on land
			if (projectile.pos.x < SIZES.projectile.radius + S_M_F_C_S)
				projectile.pos.x = SIZES.projectile.radius + S_M_F_C_S;
			if (projectile.pos.x > CANVAS.width - SIZES.projectile.radius - S_M_F_C_S)
				projectile.pos.x = CANVAS.width - SIZES.projectile.radius - S_M_F_C_S;

			// Save the first one to land as the main projectile and merge the rest
			if (isFirstOneToLand) {
				projectile.mode = 'stable';
				state.projectile = projectile;
				isFirstOneToLand = false;
			} else if (projectile.pos.x !== state.projectile.pos.x) projectile.mode = 'merge';
			else projectile.mode = 'stable';
		}

		/* Colliding with brick */
		const { width, height } = SIZES.brick;
		const diagonalRadius = SIZES.projectile.radius / Math.sqrt(2);

		state.bricks.forEach(brick => {
			// Bottom side
			if (
				projectile.perimeter('top') + projectile.velocity.y < brick.pos.y + height &&
				projectile.perimeter('top') > brick.pos.y + height &&
				projectile.pos.x > brick.pos.x &&
				projectile.pos.x < brick.pos.x + width
			) {
				const shortage = projectile.perimeter('top') - (brick.pos.y + height);

				projectile.pos.y -= shortage;
				if (projectile.velocity.x > 0) projectile.pos.x += shortage * ratio.XtoY;
				else projectile.pos.x -= shortage * ratio.XtoY;

				projectile.velocity.y *= -1;

				brick.collide();
			}

			// Top side
			if (
				projectile.perimeter('bottom') + projectile.velocity.y > brick.pos.y &&
				projectile.perimeter('bottom') < brick.pos.y &&
				projectile.pos.x > brick.pos.x &&
				projectile.pos.x < brick.pos.x + width
			) {
				const shortage = brick.pos.y - projectile.perimeter('bottom');

				projectile.pos.y += shortage;
				if (projectile.velocity.x > 0) projectile.pos.x += shortage * ratio.XtoY;
				else projectile.pos.x -= shortage * ratio.XtoY;

				projectile.velocity.y *= -1;

				brick.collide();
			}

			// Left side
			if (
				projectile.perimeter('right') + projectile.velocity.x > brick.pos.x &&
				projectile.perimeter('right') < brick.pos.x &&
				projectile.pos.y > brick.pos.y &&
				projectile.pos.y < brick.pos.y + height
			) {
				const shortage = brick.pos.x - projectile.perimeter('right');

				projectile.pos.x += shortage;
				if (projectile.velocity.y < 0) projectile.pos.y -= shortage * ratio.YtoX;
				else projectile.pos.y += shortage * ratio.YtoX;

				projectile.velocity.x *= -1;

				brick.collide();
			}

			// Right side
			if (
				projectile.perimeter('left') + projectile.velocity.x < brick.pos.x + width &&
				projectile.perimeter('left') > brick.pos.x + width &&
				projectile.pos.y > brick.pos.y &&
				projectile.pos.y < brick.pos.y + height
			) {
				const shortage = projectile.perimeter('left') - (brick.pos.x + width);

				projectile.pos.x -= shortage;
				if (projectile.velocity.y < 0) projectile.pos.y -= shortage * ratio.YtoX;
				else projectile.pos.y += shortage * ratio.YtoX;

				projectile.velocity.x *= -1;

				brick.collide();
			}

			// Bottom-left corner
			if (
				projectile.perimeter('right') + projectile.velocity.x > brick.pos.x &&
				projectile.perimeter('right') < brick.pos.x &&
				projectile.perimeter('top') + projectile.velocity.y < brick.pos.y + height &&
				projectile.perimeter('top') > brick.pos.y + height
			) {
				projectile.pos.x = brick.pos.x - diagonalRadius;
				projectile.pos.y = brick.pos.y + height + diagonalRadius;

				projectile.velocity.x *= -1;
				projectile.velocity.y *= -1;

				brick.collide();
			}

			// Bottom-right corner
			if (
				projectile.perimeter('left') + projectile.velocity.x < brick.pos.x + width &&
				projectile.perimeter('left') > brick.pos.x + width &&
				projectile.perimeter('top') + projectile.velocity.y < brick.pos.y + height &&
				projectile.perimeter('top') > brick.pos.y + height
			) {
				projectile.pos.x = brick.pos.x + width + diagonalRadius;
				projectile.pos.y = brick.pos.y + height + diagonalRadius;

				projectile.velocity.x *= -1;
				projectile.velocity.y *= -1;

				brick.collide();
			}

			// Top-right corner
			if (
				projectile.perimeter('left') + projectile.velocity.x < brick.pos.x + width &&
				projectile.perimeter('left') > brick.pos.x + width &&
				projectile.perimeter('bottom') + projectile.velocity.y > brick.pos.y &&
				projectile.perimeter('bottom') < brick.pos.y
			) {
				projectile.pos.x = brick.pos.x + width + diagonalRadius;
				projectile.pos.y = brick.pos.y - diagonalRadius;

				projectile.velocity.x *= -1;
				projectile.velocity.y *= -1;

				brick.collide();
			}

			// Top-left corner
			if (
				projectile.perimeter('right') + projectile.velocity.x > brick.pos.x &&
				projectile.perimeter('right') < brick.pos.x &&
				projectile.perimeter('bottom') + projectile.velocity.y > brick.pos.y &&
				projectile.perimeter('bottom') < brick.pos.y
			) {
				projectile.pos.x = brick.pos.x + diagonalRadius;
				projectile.pos.y = brick.pos.y - diagonalRadius;

				projectile.velocity.x *= -1;
				projectile.velocity.y *= -1;

				brick.collide();
			}
		});

		/* Colliding with bonus */
		state.bonuses.forEach(bonus => {
			const dist = Math.hypot(
				bonus.pos.x - projectile.pos.x,
				bonus.pos.y - projectile.pos.y
			);

			if (
				dist - SIZES.projectile.radius - SIZES.bonus.ring.max < 0 &&
				bonus.mode === 'stable'
			)
				bonus.collide();
		});
	});

	if (state.projectiles.every(projectile => projectile.mode !== 'emit')) {
		isFirstOneToLand = true;
		counter = 0;
		state.setLS({ projectile: state.projectile.pos.x });
		coefficient.regainCount();

		if (state.bonuses.some(bonus => bonus.mode === 'merge')) {
			const bonuses = state.bonuses.filter(bonus => bonus.mode === 'merge');
			bonuses.forEach(bonus => {
				if (!state.furthest.bonus.id) state.furthest.bonus = bonus;
				else if (
					getXDist(bonus, state.projectile) >
					getXDist(state.furthest.bonus, state.projectile)
				)
					state.furthest.bonus = bonus;
			});
			bonuses.forEach(bonus => bonus.calcXVelocity());
		}

		spawnBaB();
	}
};

export default emitProjectiles;