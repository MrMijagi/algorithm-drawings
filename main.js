import { red_black_tree } from './js/red_black_tree.js';
import { grid } from './js/labyrinth.js';

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

window.onload = function() {
  var canvas = document.getElementById("myCanvas");
  paper.setup(canvas);

  red_black_tree(tree, 800, 50, 20, 0.5, 1);
  grid(map, 20, 20, 30, 30);

  paper.view.draw();
}
