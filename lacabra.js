var graph = new Graph('graph');
graph.initialize();

var A = new Node('A', 100, 100, 70, 35);
graph.addNode(A);

var B = new Node('B', 300, 100, 70, 35);
graph.addNode(B);

var C = new Node('C', 500, 100, 70, 35);
graph.addNode(C);

setInterval(function() {
  graph.update();
  graph.draw();
}, 30);

var gw = document.getElementById('graph');

