function Node(label, x, y, w, h, color) {
  this.label = label;
  this.color = color || '#ABC'
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.moving = false;
  this.beingPulled = false;
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

Node.prototype.inputHit = function (x, y) { 
  var left = this.x - 5;
  var right = this.x + 5;
  var top = this.y + this.h / 2 - 5;
  var bottom = this.y + this.h / 2 + 5;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

Node.prototype.outputHit = function (x, y) { 
  var left = this.x + this.w - 5;
  var right = right = this.x + this.w + 5;
  var top = this.y + this.h / 2 - 5;
  var bottom = this.y + this.h / 2 + 5;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

Node.prototype.handleHit = function (x, y) { 
  var left = this.x - 5;
  var right = this.x + 5;
  var top = this.y + this.h / 2 - 5;
  var bottom = this.y + this.h / 2 + 5;

    if (x > left && x < right && y > top && y < bottom) {
    return true;
  }

  left = this.x + this.w - 5;
  right = this.x + this.w + 5;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

Node.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.fillStyle = '#447';
  ctx.fillRect(this.x - 5, this.y + this.h / 2 - 5, 10, 10);
  ctx.fillRect(this.x + this.w - 5, this.y + this.h / 2 - 5, 10, 10);
  ctx.font = "24px Arial";
  ctx.textAlign = "center";
  ctx.fillText(this.label, this.x + this.w / 2, this.y + this.h / 2 + 8);
}
