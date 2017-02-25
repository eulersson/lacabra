function Node(x, y, w, h) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.moving = false;
}

Node.prototype.move = function(dx, dy) {
  this.x += dx;
  this.y += dy;
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
  this.id = id;
  this.startX = 0;
  this.startY = 0;
  this.mouseX = 0;
  this.mouseY = 0;
  this.mousePressed = false;
  this.dragging = false;
  this.nodes = [];
}

Graph.prototype.initialize = function() {

  this.canvas = document.getElementById(this.id);
  this.width  = this.canvas.width;
  this.height = this.canvas.height;
  this.ctx    = this.canvas.getContext("2d");

  var mouseMoveCallback = function(e) {
    this.mouseX = e.offsetX;
    this.mouseY = e.offsetY;
  }

  var mouseDownCallback = function() {
    this.mousePressed = true;
  }

  var mouseUpCallback = function() {
    this.mousePressed = false;
    this.dragging = false;
  }

  this.canvas.addEventListener('mousemove', mouseMoveCallback.bind(this));
  this.canvas.onmousedown = mouseDownCallback.bind(this);
  this.canvas.onmouseup   = mouseUpCallback.bind(this);
}

Graph.prototype.update = function() {
  if (this.mousePressed) {
    if (!this.dragging) {
      this.startX = this.mouseX;
      this.startY = this.mouseY;
    }
    this.dragging = true;
    this.nodes.forEach(function(node) {
      if (node.isHit(this.mouseX, this.mouseY)) {
        if (!node.moving) {
          console.log("Start dragging node.");
          node.moving = true;
        } else {
          console.log("Keep moving the node.");
          console.log(this.mouseX - this.startX);
          var dx = this.mouseX - this.startX;
          var dy = this.mouseY - this.startY;
          node.move(dx, dy);
          this.startX = this.mouseX;
          this.startY = this.mouseY;
        }
      } else {
        console.log("Did not hit anything.");
      } 
    }, this);
  } else {
    console.log("Stop dragging everything");
    this.nodes.forEach(function(node) {
      node.moving = false;
    });
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
var node = new Node(10, 10, 70, 70);
graph.addNode(node);
var node1 = new Node ( 100, 100, 30, 30);
graph.addNode(node1);

setInterval(function() {
  graph.update();
  graph.draw();
}, 30);

