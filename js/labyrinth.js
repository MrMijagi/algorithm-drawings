function path_right(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x, (height/2) + y));
  path.add(new paper.Point(x + width, (height/2) + y));

  return path;
}

function arrow_right(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.4), (height * 0.35) + y));
  path.add(new paper.Point(x + (width * 0.7), (height * 0.5) + y));
  path.add(new paper.Point(x + (width * 0.4), (height * 0.65) + y));

  return path;
}

function path_left(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x + width, (height/2) + y));
  path.add(new paper.Point(x, (height/2) + y));

  return path;
}

function arrow_left(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.6), (height * 0.35) + y));
  path.add(new paper.Point(x + (width * 0.3), (height * 0.5) + y));
  path.add(new paper.Point(x + (width * 0.6), (height * 0.65) + y));

  return path;
}

function path_up(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y + height));
  path.add(new paper.Point((width/2) + x, y));

  return path
}

function arrow_up(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.65), (height * 0.6) + y));
  path.add(new paper.Point(x + (width * 0.5), (height * 0.3) + y));
  path.add(new paper.Point(x + (width * 0.35), (height * 0.6) + y));

  return path;
}

function path_down(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y));
  path.add(new paper.Point((width/2) + x, y + height));

  return path;
}

function arrow_down(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.65), (height * 0.4) + y));
  path.add(new paper.Point(x + (width * 0.5), (height * 0.7) + y));
  path.add(new paper.Point(x + (width * 0.35), (height * 0.4) + y));

  return path;
}

function path_top_left(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, y));

  return path;
}

function path_top_right(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point(x + width, (height/2) + y));

  path;
}

function path_bottom_right(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x + width, (height/2) + y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, y + height));

  return path;
}

function path_bottom_left(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y + height));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point(x, (height/2) + y));

  return path
}

const line_types = {
  "up": path_up,
  "down": path_down,
  "left": path_left,
  "right": path_right,
  "top_left": path_top_left,
  "top_right": path_top_right,
  "bottom_left": path_bottom_left,
  "bottom_right": path_bottom_right,
}

const arrow_types = {
  "up": arrow_up,
  "down": arrow_down,
  "left": arrow_left,
  "right": arrow_right,
}

class Cell {
  constructor(x, y, width, height, line_type, arrow_type, background_color, path_color, border_color, text) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.line_type = line_type ? line_type : "";
    this.arrow_type = arrow_type ? arrow_type : "";
    this.background_color = background_color ? background_color : null;
    this.path_color = path_color ? path_color : null;
    this.border_color = border_color ? border_color : null;
    this.text = text ? text : "";
  }

  init() {
    this.square = new paper.Path.Rectangle({
      point: [this.x, this.y],
      size: [this.width, this.height],
      strokeColor: this.border_color,
      fillColor: this.background_color
    });

    this.textPaper = new paper.PointText({
      point: [this.x + (this.width * 0.5), this.y + (this.height * 0.75)],
      content: this.text,
      fillColor: this.path_color,
      fontFamily: 'Courier New',
      fontSize: this.height * 0.8,
      justification: 'center'
    });

    if (this.line_type in line_types) this.line = line_types[this.line_type].apply(null, [this.x, this.y, this.width, this.height, this.path_color]);
    if (this.arrow_type in arrow_types) this.arrow = arrow_types[this.arrow_type].apply(null, [this.x, this.y, this.width, this.height, this.path_color]);
  }
}

export class Labyrinth {
  constructor(map, params) {
    const tile_width = params["tile_width"];
    const tile_height = params["tile_height"];
    
    this.tile_width = tile_width; // this.tile_width = params["tile_width"] doesn't work (undefined attribute)
    this.tile_height = tile_height;
    this.map = map;

    this.cells = [];
    for (var i = 0; i < map.length; i++) {
      this.cells.push([]);
      for (var j = 0; j < map[0].length; j++) {
        var tile = map[i][j];

        // position of tile
        var x_pos = j * this.tile_width;
        var y_pos = i * this.tile_height;

        this.cells[i].push(new Cell(x_pos, y_pos, this.tile_width, this.tile_height,
          tile["line_type"], tile["arrow_type"], tile["background_color"], tile["path_color"], tile["border_color"], tile["text"]));
      }
    }
  }

  init() {
    this.cells.forEach(function(row) {
      row.forEach(function(cell) {
        cell.init();
      })
    })
  }

  get_size() {
    var width = this.map[0].length * this.tile_width;
    var height = this.map.length * this.tile_height;

    return new paper.Size(width, height);
  }
}
