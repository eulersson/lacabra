/**
 * @class
 * @param {string} label Text to display on the body of the node. 
 * @param {number} x Position where to place the node.
 * @param {number} y Position where to place the node.
 * @param {number} w Width of the node.
 * @param {number} h Height of the node.
 * @param {string} color Color of the node.
 */
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

/**
 * Called in the update loop in the {@link Graph} object. Displaces the node.
 * @param {number} dx Horizontal increment.
 * @param {number} dy Vertical increment.
 */
Node.prototype.move = function(dx, dy) {
  this.x += dx;
  this.y += dy;
}

/**
 * On mouse wheel events in the graph we make them bigger as we were zooming.
 * @param {number} w New width.
 * @param {number} h New height.
 */
Node.prototype.resize = function(w, h) {
  this.w = w;
  this.h = h;
}

/**
 * Returns a boolean to determine of the x, y, mouse position hits the node.
 * @param {number} x Horizontal coordinate to test against.
 * @param {number} y Vertical coordinate to test against.
 * @param {number} width The graph's width.
 * @param {number} height The graph's height.
 */
Node.prototype.isHit = function(x, y, width, height, tx, ty) {
  var left = this.x + width / 2 + tx;
  var right = this.x + width / 2 + tx + this.w;
  var top = this.y + height / 2 + ty;
  var bottom = this.y + height / 2 + ty  + this.h;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  } else {
    return false;
  }
}

/**
 * Checks if the position x, y in the canvas hits or misses the input handle.
 * @param {number} x Horizontal coordinate to test against.
 * @param {number} y Vertical coordinate to test against.
 * @param {number} width The graph's width.
 * @param {number} height The graph's height.
 */
Node.prototype.inputHit = function (x, y, width, height, tx, ty) {
  var inputW = this.h / 3.5;
  var inputH = this.h / 3.5;
  var left = this.x + width / 2 + tx - inputW / 2;
  var right = this.x + width / 2 + tx + inputW / 2;
  var top = this.y + height / 2 + ty + this.h / 2 - inputH / 2;
  var bottom = this.y + height / 2 + ty + this.h / 2 + inputH / 2;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

/**
 * Checks if the position x, y in the canvas hits or misses the output handle.
 * @param {number} x Horizontal coordinate to test against.
 * @param {number} y Vertical coordinate to test against.
 * @param {number} width The graph's width.
 * @param {number} height The graph's height.
 */
Node.prototype.outputHit = function (x, y, width, height, tx, ty) {
  var outputW = this.h / 3.5;
  var outputH = this.h / 3.5;
  var left = this.x + width / 2 + tx + this.w - outputW / 2;
  var right = this.x + width / 2 + tx + this.w + outputW / 2;
  var top = this.y + height / 2 + ty + this.h / 2 - outputH / 2;
  var bottom = this.y + height / 2 + ty + this.h / 2 + outputH / 2;

  if (x > left && x < right && y > top && y < bottom) {
    return true;
  }
}

/**
 * Draws the node to the Graph canvas.
 * @param {CanvasRenderingContext2D} ctx Context where to draw to.
 * @param {number} width The graph's width.
 * @param {number} height The graph's height.
 */
Node.prototype.draw = function(ctx, width, height, tx, ty) {
  ctx.fillStyle = this.color;
  ctx.fillRect(this.x + width / 2 + tx, this.y + height / 2 + ty, this.w, this.h);
  ctx.fillStyle = '#447';
  var handleW = this.h / 3.5;
  var handleH = this.h / 3.5;
  ctx.fillRect(
    this.x + width / 2 - handleW / 2 + tx,
    this.y + this.h / 2 + height / 2 - handleH / 2 + ty,
    handleW,
    handleH
  );
  ctx.fillRect(
    this.x + width / 2 + this.w - handleW / 2 + tx,
    this.y + height / 2 + this.h / 2 - handleH / 2 + ty,
    handleW,
    handleH
  );
  var fontSize = this.h / 35 * 24;
  ctx.font = fontSize + "px Arial";
  ctx.textAlign = "center";
  ctx.fillText(this.label, this.x + width / 2 + this.w / 2 + tx, this.y + height / 2 + this.h / 2 + fontSize / 3 + ty);
}