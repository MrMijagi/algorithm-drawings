import { RBTree } from './js/red_black_tree.js';
import { grid } from './js/labyrinth.js';
import { graph } from './js/graphs.js';

function background(color) {
  var canvas = document.getElementById('myCanvas');
  var width = canvas.width;
  var height = canvas.height;

  new paper.Path.Rectangle({
    point: [0, 0],
    size: [width, height],
    fillColor: color
  });
}

function set_canvas_size(size) {
  var canvas = document.getElementById('myCanvas');
  canvas.width  = size.width;
  canvas.height = size.height;
}

function draw_on_canvas(structure) {
  // reset the canvas
  paper.project.activeLayer.removeChildren();

  // set canvas size for background (put bigger values if background doesn't cover entire drawing)
  var size = new paper.Size(1600, 1600);
  set_canvas_size(size);

  //background
  background('rgb(200, 200, 200)');

  // RB Tree
  Node.activeColor = '#2bc5f0';
  var rb_tree = new RBTree(structure, 20, 0.5, 1);
  rb_tree.init();
  size = rb_tree.get_size();

  // Labirynth
  //size = grid(map, 40, 50);

  // Graph
  //size = graph(nodes, connections, false, 50, 0.8);

  // crop canvas size to rendered content
  set_canvas_size(size);

  paper.view.draw();
}

var map = [
  ['' , 't:S' , '' , '' , '' , '' , '' ],
  ['x' , 'd' , 'x' , 'x' , 'x' , 'x' , 'x' ],
  ['x' , 'tr:#f00', 'ra:#0f0' , 'r:#00f' , 'bl', ' ' , ' ' ],
  ['x' , ' ' , 'x' , 'x' , 'da' , 'x' , ' ' ],
  ['x' , ' ' , 'x' , 'x' , 'ua' , 'x' , ' ' ],
  ['x' , ' ' , 'br', 'la' , 'tl', ' ' , ' ' ],
  ['x' , 'x' , 'd' , 'x' , 'x' , 'x' , 'x' ],
  ['x' , 'x' , 'u' , 'x' , 'x' , 'x' , 'x' ],
  ['' , '' , 't:M' , '' , '' , '' , '' ]
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

  // create the editor
  const container = document.getElementById("jsoneditor")
  const options = {
    mode: 'code',
    modes: ['code', 'form', 'text', 'tree', 'view', 'preview'],
    onChange: function() {
      draw_on_canvas(editor.get());
    }
  }
  const editor = new JSONEditor(container, options)

  // set json
  editor.set({});

  const inputElement = document.getElementById("loadDocument")

  // get the value every time the user selects a new file
  inputElement.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) {
      console.log("No file!");
      return
    }
    const reader = new FileReader();

    reader.onload = (e) => {
      const textContent = e.target.result
      editor.set(JSON.parse(textContent));
      draw_on_canvas(editor.get());
    }
    reader.onerror = (e) => {
      const error = e.target.error
      console.error(`Error occured while reading ${file.name}`, error)
    }
    reader.readAsText(file);
  })

  // Download picture
  document.getElementById("export").onclick = function() {
    paper.view.element.toBlob(function(blob) { saveAs(blob, "image.png");});
  };
}
