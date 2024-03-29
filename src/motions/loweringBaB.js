// Objects
import score from '../classes/statistics/score.js';
import record from '../classes/statistics/record.js';
// Configs
import { BRICKS_AND_BONUSES_BOUNCE_SIZE as B_A_B_B_S } from '../config.js';
import { convertRGBtoArr, findDuplicates, getColorsDifferences } from '../helpers.js';
// State
import state from '../state.js';

let isGoingDown = true;
let differences = {};
let steps;

const loweringBricksAndBonuses = () => {
	const velocity = 5;
	const bricksAndBonuses = [...state.bricks, ...state.bonuses].filter(
		item => item.mode === 'lower'
	);

	if (!Object.keys(differences).length)
		state.bricks.forEach(brick => {
			differences[brick.id] = getColorsDifferences(brick.color, brick.updateColor());
		});

	bricksAndBonuses.forEach(item => {
		if (!steps && item.constructor.name === 'Brick')
			steps = Math.ceil((item.pos.nextY + B_A_B_B_S - item.pos.y) / velocity);

		if (item.pos.y < item.pos.nextY + B_A_B_B_S && isGoingDown) {
			item.pos.y += velocity;

			// Update color
			if (item.constructor.name === 'Brick') {
				const [red, green, blue] = convertRGBtoArr(item.color);
				item.color = `rgb(${red}, ${green + differences[item.id][1] / steps}, ${
					blue + differences[item.id][2] / steps
				})`;
			}
		} else if (item.pos.y - velocity > item.pos.nextY) {
			item.pos.y -= velocity;
			isGoingDown = false;
			state.bricks.forEach(brick => (brick.color = brick.updateColor()));
		} else bricksAndBonuses.forEach(item => (item.mode = 'stable'));
	});

	if (bricksAndBonuses.every(item => item.mode === 'stable')) {
		bricksAndBonuses.forEach(item => item.lower());
		isGoingDown = true;
		steps = null;
		differences = {};

		/* Check which brick's which side could collide */
		const columns = findDuplicates(state.bricks.map(brick => brick.gridIndex.column));

		// Bottom side
		if (columns.length)
			columns.forEach(column => {
				const bricks = state.bricks.filter(brick => brick.gridIndex.column === column);
				for (let i = 0; i < bricks.length - 1; i++) {
					if (bricks[i].gridIndex.row - bricks[i + 1].gridIndex.row === 1)
						bricks[i + 1].couldCollide.bottom = false;
				}
			});

		if (!state.isFirstRound) {
			score.addOne();
			if (record.count < score.count) record.addOne();
		}
	}
};

export default loweringBricksAndBonuses;
