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
    this.border = props.location === 'top' ? topBorder : bottomBorder;

    this.pos = {
      x: props.index * SIZES.pieces.border.width + Math.random() * 100 - 50,
      y: this.border.pos.y + SIZES.brick.height * 1.5 + Math.random() * 50,
    };

    this.velocity = {
      x:
        Math.cos(
          Math.atan2(topBorder.pos.y - this.pos.y, topBorder.pos.x - this.pos.x)
        ) * VELOCITY.placing,
      y: -VELOCITY.placing,
    };
  }

  update() {
    const xEndPoint = this.props.index * SIZES.pieces.border.width;
    if (
      (this.velocity.x > 0 && this.pos.x + this.velocity.x < xEndPoint) ||
      (this.velocity.x < 0 && this.pos.x + this.velocity.x > xEndPoint)
    )
      this.pos.x += this.velocity.x;
    else this.pos.x = xEndPoint;

    if (this.pos.y + this.velocity.y > this.border.pos.y)
      this.pos.y += this.velocity.y;
    else this.pos.y = this.border.pos.y;
  }

  draw() {
    this.update();

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
