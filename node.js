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

Node.prototype.resize = function(w, h) {
  this.w = w;
  this.h = h;
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
  var inputW = this.h / 3.5;
  var inputH = this.h / 3.5;
  var left = this.x - inputW / 2;
  var right = this.x + inputW / 2;
  var top = this.y + this.h / 2 - inputH / 2;
  var bottom = this.y + this.h / 2 + inputH / 2;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

Node.prototype.outputHit = function (x, y) {
  var outputW = this.h / 3.5;
  var outputH = this.h / 3.5;
  var left = this.x + this.w - outputW / 2;
  var right = right = this.x + this.w + outputW / 2;
  var top = this.y + this.h / 2 - outputH / 2;
  var bottom = this.y + this.h / 2 + outputH / 2;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

Node.prototype.handleHit = function (x, y) {
  var handleW = this.h / 3.5;
  var handleH = this.h / 3.5;
  var left = this.x - handleW / 2;
  var right = this.x + handleW / 2;
  var top = this.y + this.h / 2 - handleH / 2;
  var bottom = this.y + this.h / 2 + handleH / 2;

    if (x > left && x < right && y > top && y < bottom) {
    return true;
  }

  left = this.x + this.w - handleW / 2;
  right = this.x + this.w + handleW / 2;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

Node.prototype.draw = function(ctx) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x, this.y, this.w, this.h);
  ctx.fillStyle = '#447';
  var handleW = this.h / 3.5;
  var handleH = this.h / 3.5;
  ctx.fillRect(this.x - handleW / 2, this.y + this.h / 2 - handleH / 2, handleW, handleH);
  ctx.fillRect(this.x + this.w - handleW / 2, this.y + this.h / 2 - handleH / 2, handleW, handleH);
  var fontSize = this.h / 35 * 24;
  ctx.font = fontSize + "px Arial";
  ctx.textAlign = "center";
  ctx.fillText(this.label, this.x + this.w / 2, this.y + this.h / 2 + fontSize / 3);
}