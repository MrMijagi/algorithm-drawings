import { red_black_tree } from './js/red_black_tree.js';
import { grid } from './js/labyrinth.js';
import { graph } from './js/graphs.js';

var tree = { 
  1:["104","red"], 
  2:["83","black"], 
  3:["5", "black"],
  4:["23", "red"],
  5:["92", "red"],
  6:["16", "red"],
  7:["4", "red"],
  8:["NIL", "black"],
  9:["NIL", "black"],
  12:["NIL", "black"],
  13:["NIL", "black"]
};

var tree2 = { 
  1:["104","red"], 
  2:["83","black"], 
  3:["5", "black"],
  4:["23", "red"],
  6:["16", "red"],
  7:["4", "red"]
};

var map = [
  ['x' , 'v' , 'x' , 'x' , 'x' , 'x' , 'x' ],
  ['x' , 'tr', 'h' , 'h' , 'bl', ' ' , ' ' ],
  ['x' , ' ' , 'x' , 'x' , 'v' , 'x' , ' ' ],
  ['x' , ' ' , 'x' , 'x' , 'v' , 'x' , ' ' ],
  ['x' , ' ' , 'br', 'h' , 'tl', ' ' , ' ' ],
  ['x' , 'x' , 'v' , 'x' , 'x' , 'x' , 'x' ],
  ['x' , 'x' , 'v' , 'x' , 'x' , 'x' , 'x' ],
];

var map2 = [
  ['' , ' ', 'v', ' '],
  ['', 'x', 'v', ' '],
  [' ', 'br', 'tl', ' '],
  [' ', 'v', 'x', ''],
];

var nodes = {
  1:[0, 0, '1'],
  2:[4, 0, '2'],
  3:[4, 2, '3'],
  4:[2, 2, '4'],
  5:[2, 1, '5'],
  6:[0, 2, '6'],
}

var connections = {
  1:[1, 2, '#00f'],
  2:[2, 3, '#0f0'],
  3:[3, 4, '#f00'],
  4:[4, 5, '#000'],
  5:[5, 6, '#f0f']
}

window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  paper.setup(canvas);

  //red_black_tree(tree, 800, 50, 20, 0.5, 1);
  //grid(map2, 20, 20, 30, 30);
  graph(nodes, connections, false, 10, 10, 50, 0.4);

  paper.view.draw();
}
