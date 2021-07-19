import { StructureDrawer } from './js/structureDrawer.js';

var editor;
var structureDrawer;

function redraw() {
  structureDrawer.init(editor.get());
  structureDrawer.draw();
}

window.onload = function() {
  // setup paperjs
  var canvas = document.getElementById("myCanvas");
  structureDrawer = new StructureDrawer(canvas);

  // create the JSON editor
  const container = document.getElementById("jsoneditor");
  const options = {
    mode: 'code',
    modes: ['code', 'form', 'text', 'tree', 'view', 'preview'],
    onChange: function() {
      try {
        redraw();
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
      redraw();
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
