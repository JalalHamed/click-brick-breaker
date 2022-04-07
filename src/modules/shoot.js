// Config
import { SIZES } from './config.js';

let counter = 0;
let landedBallXPos;

const shoot = props => {
  // prettier-ignore
  const { ball, balls, setBalls, canvas, state, setState, coefficient, setIsBallMoving } = props;
  const topBorderHeight = SIZES.border.margin + SIZES.border.height;
  const bottomBorderSurface = canvas.height - SIZES.border.margin;

  balls.forEach(ball => {
    const delay = ball.delay * ball.r;
    ball.draw();

    if (counter > delay) ball.update();
    if (counter === delay) coefficient.decreaseCount();

    if (ball.pos.x - ball.r <= 0 || ball.pos.x + ball.r >= canvas.width)
      ball.velocity.x = -ball.velocity.x;
    if (ball.pos.y <= topBorderHeight + ball.r) {
      ball.velocity.y = -ball.velocity.y;
    }
    if (ball.pos.y > bottomBorderSurface - ball.r) {
      ball.velocity.x = 0;
      ball.velocity.y = 0;
      landedBallXPos = ball.pos.x;
      ball.pos.y = bottomBorderSurface - ball.r;
    }
  });

  counter++;

  if (balls.every(ball => ball.velocity.x === 0 && ball.velocity.y === 0)) {
    setState({ ...state, ball: landedBallXPos });
    ball.pos.x = landedBallXPos;
    coefficient.regainCount();
    coefficient.repoSize();
    counter = 0;
    setBalls([]);
    setIsBallMoving(false);
  }
};

export default shoot;
