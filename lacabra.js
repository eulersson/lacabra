function Node(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
}

Node.prototype.update = function() {

}

Node.prototype.isHit = function(x, y) {
  var left = this.x;
  var right = this.x + this.w;
  var top = this.y;
  var bottom = this.y + this.h;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  } else {
    return false;
  }
}

Node.prototype.draw = function(ctx) {
  ctx.fillStyle = "#00ff00";
  ctx.fillRect(this.x, this.y, this.w, this.h);
}

function Graph(id) {
  this.id = id

  this.mouseX = 0;
  this.mouseY = 0;
  this.mousePressed = false;
  this.dragging = false;

  this.nodes = [];
}

Graph.prototype.initialize = function() {

  var self = this;

  this.canvas = document.getElementById(this.id);

  this.canvas.addEventListener('mousemove', function(e) {
    self.mouseX = e.offsetX;
    self.mouseY = e.offsetY;
  })

  this.canvas.onmousedown = function() {
    self.mousePressed = true;
  }

  this.canvas.onmouseup = function() {
    self.mousePressed = false;
  }

  this.width = this.canvas.width;
  this.height = this.canvas.height;
  this.ctx = this.canvas.getContext("2d");
}

Graph.prototype.update = function() {
  if (this.mousePressed) {
    var self = this;
    console.log(this);
    this.nodes.forEach(function(node) {
      if (node.isHit(self.mouseX, self.mouseY)) {
        console.log(this);
        console.log("HIT!!!");
      }
    })
  }
}

Graph.prototype.draw = function() {
  this.ctx.fillStyle = "#ff0000";
  this.ctx.fillRect(0, 0, this.width, this.height);
  var ctx = this.ctx;

  this.nodes.forEach(function(node) {
    node.draw(ctx);
  });
}

Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
}

var graph = new Graph('graph');
graph.initialize();
var node = new Node(10, 10, 20, 20);
graph.addNode(node);

setInterval(function() {
  graph.update();
  graph.draw();
}, 30);

