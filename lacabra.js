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


var gw = document.getElementById('graph-wrapper');

