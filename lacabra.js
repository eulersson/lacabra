var graph = new Graph('graph');
graph.initialize();

var viewport = new Viewport('viewport');

var A = new Node('A', -200, 0, 70, 35);
graph.addNode(A);

var B = new Node('B', 0, 0, 70, 35);
graph.addNode(B);

var C = new Node('C', 200, 0, 70, 35);
graph.addNode(C);

setInterval(function() {
  graph.update();
  graph.draw();
  viewport.draw();
}, 30);

var gw = document.getElementById('graph');

