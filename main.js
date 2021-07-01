import { RBTree } from './js/red_black_tree.js';
import { Labyrinth } from './js/labyrinth.js';
import { Graph } from './js/graphs.js';
import { Container } from './js/container.js';
import { apply_animation } from './js/animations.js';

var last_timestamp = 0.;
var is_restart;
var curr_timestamp = 0.;
var editor;

function background(color) {
  var canvas = document.getElementById('myCanvas');
  var width = canvas.width;
  var height = canvas.height;

  new paper.Path.Rectangle({
    point: [0, 0],
    size: [width, height],
    fillColor: color ? color : null
  });
}

function set_canvas_size(size) {
  var canvas = document.getElementById('myCanvas');
  canvas.width  = size.width;
  canvas.height = size.height;
}

function draw_on_canvas(animation=false) {
  let json_structure = editor.get();

  // reset the canvas
  paper.project.activeLayer.removeChildren();

  // set canvas size for background (put bigger values if background doesn't cover entire drawing)
  let struct = new structures[json_structure["name"]](json_structure["structure"], json_structure["params"])
  set_canvas_size(struct.get_size());

  //background
  background(json_structure["background_color"]);

  // draw structure
  struct.init();

  if (animation) {
    let animations = editor.get()["animations"];

    for (let index in animations) {
      let animation = animations[index];
      let progress = ((curr_timestamp - last_timestamp) - animation["start"]) / animation["length"];

      apply_animation(struct, progress, animation["type"], animation["params"]);
    }
  }

  paper.view.draw();
}

// dict with all structure classes. They have to implement methods init and get_size
const structures = {
  "RBTree": RBTree,
  "Labyrinth": Labyrinth,
  "Graph": Graph,
  "Container": Container,
}

window.onload = function() {
  // setup paperjs
  var canvas = document.getElementById("myCanvas");
  paper.setup(canvas);

  // create the JSON editor
  const container = document.getElementById("jsoneditor");
  const options = {
    mode: 'tree',
    modes: ['code', 'form', 'text', 'tree', 'view', 'preview'],
    onChange: function() {
      try {
        draw_on_canvas();
      } catch (e) {
        return;
      }
    }
  };
  editor = new JSONEditor(container, options);

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
      draw_on_canvas();
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

  // Start animation
  document.getElementById("animation").onclick = function() {
    paper.view.onFrame = function(event) {
      if (is_restart) {
        last_timestamp = event.time;
        is_restart = false;
      }

      curr_timestamp = event.time;
      draw_on_canvas(true);
    }
  }

  // Restart structure
  document.getElementById("restart").onclick = function() {
    paper.view.onFrame = null;
    is_restart = true;
    draw_on_canvas();
  }
}
