const state = {
	isMouseInBorder: false,
	isFirstRound: true,

	mouseCoords: {},

	projectile: {},
	furthest: {
		bonus: {},
		borderPiece: {
			topBorder: { x: {}, y: {} },
			bottomBorder: { x: {}, y: {} },
		},
	},
	pieces: { bricks: [], bonuses: [], borders: [] },

	bricks: [],
	bonuses: [],
	projectiles: [],

	grid: { row: [], column: [] },

	innerWidth,
	counter: 1,
	ids: { projectile: 1, bonus: 1, brick: 1, piece: 1 },
	mergingBonusesCount: 0,
	bonusRingRadius: 0,
	gridRowIndexes: [],

	getLS(data) {
		const storage = JSON.parse(localStorage.getItem('cbb-state'));
		return storage && storage[data];
	},
	setLS(data) {
		localStorage.setItem(
			'cbb-state',
			JSON.stringify({
				...JSON.parse(localStorage.getItem('cbb-state')),
				...data,
			})
		);
	},
};

export default state;
