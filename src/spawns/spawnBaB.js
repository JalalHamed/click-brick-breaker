// Classes
import Brick from '../classes/Brick.js';
import Bonus from '../classes/Bonus.js';
// Objects
import score from '../classes/statistics/score.js';
// Functions
import { genRndUniqueGridColumnIndex } from '../helpers.js';
// State
import state from '../state.js';

const spawnBricksAndBonus = () => {
	let gridColumnIndexes = [];

	// Spawn brick(s)
	const maxBricksCount =
		score.count > 3 ? (score.count < 25 ? Math.floor(Math.sqrt(score.count)) : 5) : 2; // Gradually increase the maximum number of bricks that can be spawned (up to 5, need at least one free spot for the bonus) starting at 2.
	const bricksCount = Math.floor(Math.random() * maxBricksCount) + 1;

	for (let i = 0; i < bricksCount; i++) {
		const gridColumnIndex = genRndUniqueGridColumnIndex(gridColumnIndexes);
		gridColumnIndexes.push(gridColumnIndex);
		state.bricks.push(new Brick({ gridColumnIndex, mode: 'zoom-in' }));
	}

	// Spawn bonus
	state.bonuses.push(
		new Bonus({
			gridColumnIndex: genRndUniqueGridColumnIndex(gridColumnIndexes),
			mode: 'zoom-in',
		})
	);
};

export default spawnBricksAndBonus;
