var myGameArea = {
  canvas: document.createElement("canvas"),

  start: function() {
    this.canvas.width = 500;
    this.canvas.height = 700;
    this.canvas.id = "myGameZone";
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
  },

  drawTree: function() {
    console.log(this);
    // Draw two lines to separate tree
    // this.context.moveTo(225, 0);
    // this.context.lineTo(225, 700);

    // this.context.moveTo(275, 0);
    // this.context.lineTo(275, 700);
    // this.context.stroke();
    // Rect to make the Tree
    this.context.fillStyle = "brown";
    this.context.fillRect(225, 0, 50, 700); // ( x inicial , y inicial, aancho, alto)
  }
};

myGameArea.start();
myGameArea.drawTree();
