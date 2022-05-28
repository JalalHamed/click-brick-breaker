// Objects
import topBorder from './borders/topBorder.js';
// Functions
import { getAngle, getPointerXPos, getPointerYPos, getLineProps } from '../helpers.js';
// Configs
import { COLORS, SIZES, CANVAS, C } from '../config.js';
// State
import state from '../state.js';

class Pointer {
	constructor() {
		this.radius = SIZES.projectile.radius;
	}

	get calcEndPoint() {
		let endpoint = [];

		const pointA = [state.projectile.pos.x, state.projectile.pos.y];
		const pointB = [state.mouseCoords.x, state.mouseCoords.y];

		const [x, gradient, YAxisIntercept] = getLineProps(pointA, pointB);
		const angle = getAngle(state.mouseCoords);

		/* Pointer (general endpoint) colliding with borders */
		const setEndPoint = (axis, value) => {
			const props = { gradient, YAxisIntercept, angle };
			if (axis === 'x') endpoint = [value, getPointerYPos(value, props)];
			if (axis === 'y') endpoint = [getPointerXPos(value, props), value];
		};

		// At 90 degree, gradient is Infinite (or -Infinite)
		if (gradient === Infinity || gradient === -Infinity)
			endpoint = [state.projectile.pos.x, topBorder.heightFromTop + this.radius];
		// Top border
		if (x > 0 && x < CANVAS.width)
			setEndPoint('y', topBorder.heightFromTop + this.radius);
		// Left side of CANVAS
		if (x < 0) setEndPoint('x', this.radius);
		// Right side of CANVAS
		if (x > CANVAS.width) setEndPoint('x', CANVAS.width - this.radius);

		/* Pointer particle colliding with bricks */
		let particleEndPoint = endpoint;
		const setParticleEndPoint = (axis, value) => {
			if (axis === 'x') particleEndPoint = [value, gradient * value + YAxisIntercept];
			if (axis === 'y') particleEndPoint = [(value - YAxisIntercept) / gradient, value];
		};

		state.bricks.forEach(brick => {
			// Left side
			const [bTLC_x, bTLC_y] = brick.corner('top-left');
			const [bTLC_XPos] = getLineProps(pointA, [bTLC_x - this.radius, bTLC_y]);

			const [bBLC_x, bBLC_y] = brick.corner('bottom-left');
			const [bBLC_XPos] = getLineProps(pointA, [bBLC_x - this.radius, bBLC_y]);

			if (x >= bTLC_XPos && x < bBLC_XPos) setParticleEndPoint('x', bTLC_x - this.radius);

			// Right side
			const [bTRC_x, bTRC_y] = brick.corner('top-right');
			const [bTRC_XPos] = getLineProps(pointA, [bTRC_x + this.radius, bTRC_y]);

			const [bBRC_x, bBRC_y] = brick.corner('bottom-right');
			const [bBRC_XPos] = getLineProps(pointA, [bBRC_x + this.radius, bBRC_y]);

			if (x <= bTRC_XPos && x > bBRC_XPos) setParticleEndPoint('x', bTRC_x + this.radius);

			// Bottom side
			const [bBLC_XPos2] = getLineProps(pointA, brick.corner('bottom-left'));
			const [bBRC_XPos2] = getLineProps(pointA, brick.corner('bottom-right'));

			if (x > bBLC_XPos2 && x < bBRC_XPos2 && brick.couldCollide.bottom)
				setParticleEndPoint('y', brick.pos.y + SIZES.brick.height + this.radius);
		});

		return {
			particle: particleEndPoint,
			dashedLine: [
				endpoint[0] + Math.cos(angle) * this.radius * 2,
				endpoint[1] + Math.sin(angle) * this.radius * 2,
			],
			arrow: [
				pointA[0] - Math.cos(angle) * SIZES.pointer.arrow.length,
				pointA[1] - Math.sin(angle) * SIZES.pointer.arrow.length,
			],
		};
	}

	draw() {
		// Dashed line
		C.beginPath();
		C.setLineDash([15, 10]);
		C.moveTo(state.projectile.pos.x, state.projectile.pos.y);
		C.lineTo(...this.calcEndPoint.dashedLine);
		C.lineDashOffset = -state.counter;
		C.strokeStyle = COLORS.pointer.line;
		C.lineWidth = this.radius / 2.5;
		C.stroke();

		// Arrow
		C.beginPath();
		C.setLineDash([]);
		C.moveTo(state.projectile.pos.x, state.projectile.pos.y);
		C.lineTo(...this.calcEndPoint.arrow);
		C.strokeStyle = COLORS.pointer.arrow;
		C.lineWidth = this.radius;
		C.stroke();
		// Arrowhead
		const [endpointX, endpointY] = this.calcEndPoint.arrow;
		const angle = Math.atan2(
			endpointY - state.projectile.pos.y,
			endpointX - state.projectile.pos.x
		);
		const x = endpointX + Math.cos(angle) * this.radius * 1.4;
		const y = endpointY + Math.sin(angle) * this.radius * 1.4;
		C.beginPath();
		C.moveTo(x, y);
		C.lineTo(
			x - this.radius * Math.cos(angle - Math.PI / 7),
			y - this.radius * Math.sin(angle - Math.PI / 7)
		);
		C.lineTo(
			x - this.radius * Math.cos(angle + Math.PI / 7),
			y - this.radius * Math.sin(angle + Math.PI / 7)
		);
		C.lineTo(x, y);
		C.lineTo(
			x - this.radius * Math.cos(angle - Math.PI / 7),
			y - this.radius * Math.sin(angle - Math.PI / 7)
		);
		C.stroke();

		// Particle
		C.beginPath();
		C.setLineDash([]);
		C.arc(...this.calcEndPoint.particle, this.radius, 0, 2 * Math.PI);
		C.fillStyle = COLORS.pointer.particle;
		C.fill();
	}

	repoSize() {
		this.radius = SIZES.projectile.radius;
	}
}

export default new Pointer();
