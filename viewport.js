var gl;
var breakingThreshold = 200.0;

/** 
 * Helper function that compiles a shader.
 * @function
 * @param {object} gl WebGL context extracted from the canvas.
 * @param {enum} type Can be gl.VERTEX_SHADER or gl.FRAGMENT_SHADER.
 * @param {string} source GLSL text to compile.
 * @returns {object} Compiled shader.
 */
function createShader(gl, type, source) {
  var shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  var success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    console.error(gl.getShaderInfoLog(shader));
  }
  return shader;
}

/** 
 * Helper function that links two shaders into a program.
 * @function
 * @param {object} gl WebGL context extracted from the canvas.
 * @param {object} vertexShader Vertex shader.
 * @param {object} fragmentShader Fragment shader.
 * @returns {object} Linked program.
 */
function createProgram(gl, vertexShader, fragmentShader) {
  var program = gl.createProgram();
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  var success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    return program;
  }
 
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
}

/**
 * Wraps functionality for the canvas the graphics will be drawn to.
 * @param {string} id Canvas id to construct the Viewport upon.
 */
function Viewport(id) {
  this.id = id;
  this.canvas = document.getElementById(id);

  this.canvas.style.width = `${this.canvas.parentNode.offsetWidth}px`;
  this.canvas.style.height = `${this.canvas.parentNode.offsetHeight}px`;

  this.w = this.canvas.width = this.canvas.offsetWidth;
  this.h = this.canvas.height = this.canvas.offsetHeight;

  gl = this.canvas.getContext('webgl');
  if (!gl) { alert("Sorry dude your browser is old."); }
  this.initializeGL();
}

/**
 * Initializes all the graphics for drawing.
 */
Viewport.prototype.initializeGL = function() {
  var vertSource = 
    "attribute vec2 position;" +
    "void main() {" +
    "  gl_Position = vec4(position, 0.0, 1.0);" +
    "}";

  /*
  	vec2 uv = fragCoord.xy / iResolution.xy;
	fragColor = vec4(uv,0.5+0.5*sin(iGlobalTime),1.0);
  */ 

  var fragSource = 
    "precision mediump float;" +
    "uniform vec2 resolution;" +
    "void main() {" +
    "  vec2 uv = gl_FragCoord.xy / resolution;" +
    "  gl_FragColor = vec4(uv, 1.0, 1.0);" +
    "}";

  var vertShader = createShader(gl, gl.VERTEX_SHADER, vertSource);
  var fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSource);

  this.program = createProgram(gl, vertShader, fragShader)

  this.positionAttributeLocation = gl.getAttribLocation(this.program, 'position');
  this.resolutionUniformLocation = gl.getUniformLocation(this.program, 'resolution');

  this.positionBuffer = gl.createBuffer();

  var quad = [
    -1, -1,
    -1,  1,
     1,  1,
     1,  1,
     1, -1,
    -1, -1
  ];

  gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(quad), gl.STATIC_DRAW);
  gl.viewport(0, 0, this.w, this.h);
  console.log(this.w);
  console.log(this.h);
}

Viewport.prototype.draw = function() {
  gl.clearColor(1, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);
  gl.useProgram(this.program);
  gl.enableVertexAttribArray(this.positionAttributeLocation);
  gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
  gl.vertexAttribPointer(this.positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
  gl.uniform2f(this.resolutionUniformLocation, this.w, this.h);
  gl.drawArrays(gl.TRIANGLES, 0, 6);
}
