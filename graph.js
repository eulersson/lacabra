function Graph(id, color) {
  this.color = color || '#ddd';
  this.activeNode = null;
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

  this.canvas.style.width = '100%';
  this.canvas.style.height = '100%';
  this.canvas.width = this.canvas.offsetWidth;
  this.canvas.height = this.canvas.offsetHeight;

  this.width  = this.canvas.width;
  this.height = this.canvas.height;
  this.ctx    = this.canvas.getContext("2d");

  var resizeCallback = function() {
    this.canvas.width = this.canvas.offsetWidth;
    this.canvas.height = this.canvas.offsetHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

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

  var newNodeCallback = function() {
    var newNode = new Node('C', 500, 200, 75, 35);
    this.addNode(newNode);
  }

  this.canvas.addEventListener('mousemove', mouseMoveCallback.bind(this));
  document.getElementById('add-node').addEventListener('click', newNodeCallback.bind(this));
  window.onresize = resizeCallback.bind(this);
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

    if (this.activeNode !== null) {
      this.activeNode.move(this.mouseX - this.startX, this.mouseY - this.startY);
      this.startX = this.mouseX;
      this.startY = this.mouseY;
    } else {
      this.nodes.forEach(function(node) {
        node.isPulling(this.mouseX, this.mouseY);
        if (node.isHit(this.mouseX, this.mouseY)) {
          console.log("shit, i hit something!");
          this.activeNode = node;
        }
      }, this);
    }
  } else {
    this.activeNode = null;
  }
}

Graph.prototype.draw = function() {
  this.ctx.fillStyle = this.color;
  this.ctx.fillRect(0, 0, this.width, this.height);
  var ctx = this.ctx;

  this.nodes.forEach(function(node) {
    node.draw(ctx);
  });
}

Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
  var newDiv = document.createElement("div"); 
  var newContent = document.createTextNode("Hi"); 
  newDiv.appendChild(newContent);
  document.getElementById('properties').appendChild(newDiv);
}