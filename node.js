function Node(x, y, w, h, color) {
  this.color = color || '#ABC'
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
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
}