// Classes
import Statistics from './Statistics.js';
// Objects
import topBorder from '../borders/topBorder.js';
// Configs
import { C, CANVAS } from '../../config.js';
// State
import state from '../../state.js';

class Record extends Statistics {
	constructor() {
		super();
		this.name = 'Record';
		this.count = 1;
	}

	repoSize() {
		this.pos.x = CANVAS.width / 2;
	}
}

export default new Record();
