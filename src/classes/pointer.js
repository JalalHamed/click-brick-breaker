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

	get getEndPoint() {
		let endpoint = [];

		const coords = {
			projectile: [state.projectile.pos.x, state.projectile.pos.y],
			mouse: [state.mouseCoords.x, state.mouseCoords.y],
		};

		const [x, gradient, YAxisIntercept] = getLineProps(coords.projectile, coords.mouse);
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

		const leftYAxisIntercept =
			this.radius * Math.sqrt(gradient ** 2 + 1) + YAxisIntercept;

		const sideCoords = {
			left: {
				projectile: [
					state.projectile.pos.x - this.radius,
					(state.projectile.pos.x - this.radius) * gradient + leftYAxisIntercept,
				],
				pointerParticle: [
					endpoint[0] - this.radius,
					(endpoint[0] - this.radius) * gradient + leftYAxisIntercept,
				],
			},

			right: {
				projectile: [
					state.projectile.pos.x - this.radius,
					(state.projectile.pos.x - this.radius) * gradient + leftYAxisIntercept,
				],
				pointerParticle: [
					endpoint[0] - this.radius,
					(endpoint[0] - this.radius) * gradient + leftYAxisIntercept,
				],
			},
		};

		const [lx] = getLineProps(
			sideCoords.left.projectile,
			sideCoords.left.pointerParticle
		);

		state.bricks.forEach(brick => {
			const [tl_x, tl_y] = brick.getCornerPoint('top-left');
			const [tr_x, tr_y] = brick.getCornerPoint('top-right');
			const [bl_x, bl_y] = brick.getCornerPoint('bottom-left');
			const [br_x, br_y] = brick.getCornerPoint('bottom-right');

			const [tl_X] = getLineProps(coords.projectile, [tl_x - this.radius, tl_y]);
			const [tr_X] = getLineProps(sideCoords.left.projectile, [tr_x, tr_y]);
			const [bl_X] = getLineProps(coords.projectile, [bl_x - this.radius, bl_y]);
			const [br_X] = getLineProps(coords.projectile, [br_x + this.radius, br_y]);

			// Left side
			if (x >= tl_X && x <= bl_X) setParticleEndPoint('x', tl_x - this.radius);
			// Right side
			if (lx <= tr_X && lx >= br_X) setParticleEndPoint('x', tr_x + this.radius);
			// Bottom side
			if (x >= bl_X && x <= br_X && brick.couldCollide.bottom)
				setParticleEndPoint('y', brick.pos.y + SIZES.brick.height + this.radius);
		});

		return {
			sideCoords,
			particle: particleEndPoint,
			dashedLine: [
				endpoint[0] + Math.cos(angle) * this.radius * 2,
				endpoint[1] + Math.sin(angle) * this.radius * 2,
			],
			arrow: [
				coords.projectile[0] - Math.cos(angle) * SIZES.pointer.arrow.length,
				coords.projectile[1] - Math.sin(angle) * SIZES.pointer.arrow.length,
			],
		};
	}

	draw() {
		// Dashed line
		C.beginPath();
		C.setLineDash([15, 10]);
		C.moveTo(state.projectile.pos.x, state.projectile.pos.y);
		C.lineTo(...this.getEndPoint.dashedLine);
		C.lineDashOffset = -state.counter;
		C.strokeStyle = COLORS.pointer.line;
		C.lineWidth = this.radius / 2.5;
		C.stroke();

		// Right line
		// C.beginPath();
		// C.setLineDash([]);
		// C.moveTo(...this.getEndPoint.sideCoords.left.projectile);
		// C.lineTo(...this.getEndPoint.sideCoords.left.pointerParticle);
		// C.strokeStyle = 'green';
		// C.lineWidth = 2;
		// C.stroke();

		// Arrow
		C.beginPath();
		C.setLineDash([]);
		C.moveTo(state.projectile.pos.x, state.projectile.pos.y);
		C.lineTo(...this.getEndPoint.arrow);
		C.strokeStyle = COLORS.pointer.arrow;
		C.lineWidth = this.radius;
		C.stroke();
		// Arrowhead
		const [endpointX, endpointY] = this.getEndPoint.arrow;
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
		C.arc(...this.getEndPoint.particle, this.radius, 0, 2 * Math.PI);
		C.fillStyle = COLORS.pointer.particle;
		C.fill();
	}

	rePoSize() {
		this.radius = SIZES.projectile.radius;
	}
}

export default new Pointer();
