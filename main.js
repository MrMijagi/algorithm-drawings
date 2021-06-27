import { RBTree } from './js/red_black_tree.js';
import { Labyrinth } from './js/labyrinth.js';
import { graph } from './js/graphs.js';

function background(color) {
  var canvas = document.getElementById('myCanvas');
  var width = canvas.width;
  var height = canvas.height;

  new paper.Path.Rectangle({
    point: [0, 0],
    size: [width, height],
    fillColor: color == "" ? null : color
  });
}

function set_canvas_size(size) {
  var canvas = document.getElementById('myCanvas');
  canvas.width  = size.width;
  canvas.height = size.height;
}

function draw_on_canvas(json_structure) {
  // reset the canvas
  paper.project.activeLayer.removeChildren();

  // set canvas size for background (put bigger values if background doesn't cover entire drawing)
  var struct = new structures[json_structure["name"]](json_structure["structure"], json_structure["params"])
  set_canvas_size(struct.get_size());

  //background
  background(json_structure["background_color"]);

  // draw structure
  struct.init();
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

// dict with all structure classes. They have to implement methods init and get_size
const structures = {
  "RBTree": RBTree,
  "Labyrinth": Labyrinth,
  "Graph": graph,
}

window.onload = function() {
  // setup paperjs
  var canvas = document.getElementById("myCanvas");
  paper.setup(canvas);

  // create the JSON editor
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

  // Download JSON
  document.getElementById("save").onclick = function() {
    const text = JSON.stringify(editor.get());
    saveAs(new Blob([text]), "structure.JSON");
  };

  // Download picture
  document.getElementById("export").onclick = function() {
    paper.view.element.toBlob(function(blob) { saveAs(blob, "image.png");});
  };
}
