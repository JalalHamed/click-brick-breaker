// Classes
import Piece from './Piece.js';
// Objects
import topBorder from '../borders/topBorder.js';
import bottomBorder from '../borders/bottomBorder.js';
// Configs
import { C, COLORS, SIZES, VELOCITY } from '../../config.js';

class BorderPiece extends Piece {
  constructor(props) {
    super(props);
    this.props = props;
    this.border = this.id === 'top' ? topBorder : bottomBorder;

    this.endpoint = {
      x: this.props.index * SIZES.pieces.border.width,
      y: this.border.pos.y,
    };

    this.pos = {
      x: this.endpoint.x + props.rndXPos,
      y: this.endpoint.y + props.rndYPos,
    };

    this.velocity = { x: VELOCITY.placing, y: -VELOCITY.placing };
  }

  calcXVelocity(furthestDist) {
    if (furthestDist !== this.props.rndXPos)
      this.velocity.x *= Math.abs(this.props.rndXPos) / furthestDist;
  }

  calcYVelocity(furthestDist) {
    if (furthestDist !== this.props.rndYPos)
      this.velocity.y *= this.props.rndYPos / furthestDist;
  }

  update() {
    if (
      this.pos.x > this.endpoint.x &&
      this.pos.x - this.velocity.x > this.endpoint.x
    )
      this.pos.x -= this.velocity.x;
    else if (
      this.pos.x < this.endpoint.x &&
      this.pos.x + this.velocity.x < this.endpoint.x
    )
      this.pos.x += this.velocity.x;
    else this.pos.x = this.endpoint.x;

    if (this.pos.y + this.velocity.y > this.endpoint.y)
      this.pos.y += this.velocity.y;
    else this.pos.y = this.endpoint.y;
  }

  draw() {
    this.update();
    if (this.pos.x === this.endpoint.x && this.pos.y === this.endpoint.y)
      this.selfDestruct('borders', this.id);

    C.fillStyle = COLORS.border;
    C.fillRect(
      this.pos.x,
      this.pos.y,
      SIZES.pieces.border.width,
      SIZES.pieces.border.height
    );
  }
}

export default BorderPiece;
