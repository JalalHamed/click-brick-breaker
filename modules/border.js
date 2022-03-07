export default class Border {
  constructor(props) {
    this.props = props;
    const { status, borderMargin, canvas, borderHeight } = props;

    this.pos = {
      x: 0,
      y: status === 'top' ? borderMargin : canvas.height - borderMargin,
    };

    this.width = canvas.width;
    this.height = borderHeight;
  }

  draw() {
    const { c, canvas } = this.props;

    this.width = canvas.width;
    c.fillStyle = '#000';
    c.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }

  repoSize({ canvas, borderHeight }) {
    this.width = canvas.width;
    this.height = borderHeight;
  }
}
