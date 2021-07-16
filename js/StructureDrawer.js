import e from "express";

const shape_keys = [
  "shape",
  "width",
  "height",
  "border_color",
  "background_color",
  "border_width"
];

const text_keys = [
  "text",
  "text_color",
  "text_size"
]

// takes two elements and copies the paper attributes for drawing
function copy_attributes(source, destination) {
  source.x_pos = destination.x_pos;
  source.y_pos = destination.y_pos;

  for (let shape_key in shape_keys) {
    if (shape_key in this.dict) {
      source[shape_key] = destination[shape_key];
    }
  }

  for (let text_key in text_keys) {
    if (text_key in this.dict) {
      source[text_key] = destination[text_key];
    }
  }
}

class Element {
  constructor(dict) {
    this.dict = dict;
    this.initialized = false;
    this.x_pos = 0;
    this.y_pos = 0;

    // shape attributes
    this.shape = "rectangle";
    this.width = 0;
    this.height = 0;
    this.border_color = null;
    this.background_color = null;
    this.border_width = 1.;

    // text attributes
    this.text = "";
    this.text_color = null;
    this.text_size = 0;

    // paper js items
    this.path = null;
    this.text_path = null;
  }

  init(elements) {
    let key = null;

    // find template of element
    if ("template" in this.dict) {
      key = this.dict["template"];

      //check if key exists
      if (key in elements) {
        // check if template element was initialized
        if (!elements[key].initialized) elements[key].init(elements);
      } else {
        console.log("this template doesn't exist");
      }
    }

    // copy if attribute is true
    let copy = false;

    if ("copy" in this.dict) {
      copy = this.dict["copy"];
      if (copy) copy_attributes(this, element_keys[key]);
    }

    // determine position depending on what was defined in JSON
    if (!copy) {
      if (!("x" in this.dict && "y" in this.dict)) {
        console.log("X or Y not defined");
      } else {
        this.x_pos = this.dict["x"];
        this.y_pos = this.dict["y"];
      }
    }

    if ("position" in this.dict) {
      let position = this.dict["position"];

      if (position == "relative") {
        if (key == null) {
          console.log("position is relative, but template not defined")
        } else {
          this.x_pos = this.x_pos + elements[key].x_pos;
          this.y_pos = this.y_pos + elements[key].y_pos;
        }
      }
    }

    // save the rest of attributes
    for (let shape_key in shape_keys) {
      if (shape_key in this.dict) {
        this[shape_key] = this.dict[shape_key];
      }
    }

    for (let text_key in text_keys) {
      if (text_key in this.dict) {
        this[text_key] = this.dict[text_key];
      }
    }

    // initialization is over, update the variable
    this.initialized = true;
  }

  draw() {
    if (this.shape == "ellipse") {
      this.path = new paper.Shape.Ellipse({});
    } else {
      this.path = new paper.Shape.Rectangle({});
    }

    // set shape attributes
    this.path.center = [this.x_pos, this.y_pos];
    this.path.size = [this.width, this.height];
    this.path.strokeColor = this.border_color;
    this.path.fillColor = this.background_color;
    this.strokeWidth = this.border_width;

    // set text
    this.text_path = new paper.PointText({
      point: [0, 0],
      content: this.text,
      fillColor: this.text_color,
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: this.text_size,
      justification: 'center'
    });

    // set text position to center of shape
    this.text_path.center = this.path.center;
  }
}

export class StructureDrawer {
  constructor(canvas) {
    this.canvas = canvas;
    paper.setup(canvas);
  }

  init(dict) {
    const attributes = [
      "background",
      "x_size",
      "y_size"
    ];

    for (let attribute in attributes) {
      if (!(attribute in dict)) {
        console.log(attribute + " not defined");
      } else {
        this[attribute] = dict[attribute];
      }
    }

    this.elements = {};

    if ("elements" in dict) {
      // create new elements from dict
      for (let key in dict["elements"]) {
        this.elements[key] = new Element(dict["elements"][key]);
      }
    } else {
      console.log("elements not defined");
    }

    // initialize all elements
    for (let element_key in this.elements) {
      if (!this.elements[element_key]) this.elements[element_key].init(this.elements);
    }

    // set canvas size
    this.canvas.width = this.x_size;
    this.canvas.height = this.y_size;
  }

  draw() {
    if (!this.elements) {
      console.log("init() wasn't called");
    }

    // remove active elements
    paper.Project.activeLayer.removeChildren();

    // draw background
    new paper.Path.Rectangle({
      point: [0, 0],
      size: [this.canvas.width, this.canvas.height],
      fillColor: this.background_color ? this.background_color : null
    });

    for (let element in this.elements) {
      element.draw();
    }

    paper.view.draw();
  }
}
