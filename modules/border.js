export default class Border {
  constructor(props) {
    this.props = props;
    const { status, sizes, canvas } = props;
    const { border } = sizes;

    this.pos = {
      x: 0,
      y: status === 'top' ? border.margin : canvas.height - border.margin,
    };

    this.width = canvas.width;
    this.height = border.height;
  }

  draw() {
    const { c, canvas } = this.props;

    this.width = canvas.width;
    c.fillStyle = '#000';
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  repoSize({ canvas, border }) {
    this.width = canvas.width;
    this.height = border.height;
  }
}
