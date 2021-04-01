function cell(x, y, width, height) {
  var square = new paper.Path.Rectangle({
    point: [x, y],
    size: [width, height]
  });
  square.strokeWidth = 2;
  square.strokeColor = '#000';
}

function closed_cell(x, y, width, height) {
  var square = new paper.Path.Rectangle({
    point: [x, y],
    size: [width, height]
  });
  square.strokeWidth = 2;
  square.strokeColor = '#000';
  square.fillColor = '#333';
}

function rightward_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x, (height/2) + y));
  path.add(new paper.Point(x + width, (height/2) + y));

  cell(x, y, width, height);
}

function rightward_arrow_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.4), (height * 0.35) + y));
  path.add(new paper.Point(x + (width * 0.7), (height * 0.5) + y));
  path.add(new paper.Point(x + (width * 0.4), (height * 0.65) + y));

  rightward_cell(x, y, width, height, color);
}

function leftward_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x + width, (height/2) + y));
  path.add(new paper.Point(x, (height/2) + y));

  cell(x, y, width, height);
}

function leftward_arrow_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.6), (height * 0.35) + y));
  path.add(new paper.Point(x + (width * 0.3), (height * 0.5) + y));
  path.add(new paper.Point(x + (width * 0.6), (height * 0.65) + y));

  leftward_cell(x, y, width, height, color);
}

function upward_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y + height));
  path.add(new paper.Point((width/2) + x, y));

  cell(x, y, width, height);
}

function upward_arrow_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.65), (height * 0.6) + y));
  path.add(new paper.Point(x + (width * 0.5), (height * 0.3) + y));
  path.add(new paper.Point(x + (width * 0.35), (height * 0.6) + y));

  upward_cell(x, y, width, height, color);
}

function downward_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y));
  path.add(new paper.Point((width/2) + x, y + height));

  cell(x, y, width, height);
}

function downward_arrow_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
  
  path.add(new paper.Point(x + (width * 0.65), (height * 0.4) + y));
  path.add(new paper.Point(x + (width * 0.5), (height * 0.7) + y));
  path.add(new paper.Point(x + (width * 0.35), (height * 0.4) + y));

  downward_cell(x, y, width, height, color);
}

function top_left_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, y));

  cell(x, y, width, height);
}

function top_right_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point(x + width, (height/2) + y));

  cell(x, y, width, height);
}

function bottom_right_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point(x + width, (height/2) + y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, y + height));

  cell(x, y, width, height);
}

function bottom_left_cell(x, y, width, height, color) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };

  path.add(new paper.Point((width/2) + x, y + height));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point(x, (height/2) + y));

  cell(x, y, width, height);
}

function text_cell(x, y, width, height, text) {
  new paper.PointText({
    point: [x + (width * 0.5), y + (height * 0.75)],
    content: text,
    fillColor: '#000',
    fontFamily: 'Courier New',
    fontSize: height * 0.8,
    justification: 'center'
  });
}

// don't know if there is a better way to get functions from script
var function_list = {
  " ": cell,
  "x": closed_cell,
  "u": upward_cell,
  "d": downward_cell,
  "l": leftward_cell,
  "r": rightward_cell,
  "ra": rightward_arrow_cell,
  "la": leftward_arrow_cell,
  "da": downward_arrow_cell,
  "ua": upward_arrow_cell,
  "tl": top_left_cell,
  "tr": top_right_cell,
  "bl": bottom_left_cell,
  "br": bottom_right_cell,
  "t": text_cell
};

export function grid(map, tile_width, tile_height) {
  var y_size = map.length;
  var x_size = map[0].length;

  for (var i = 0; i < y_size; i++) {
    for (var j = 0; j < x_size; j++) {
      var value = map[i][j].split(':');

      // position of tile
      var x_pos = j * tile_width;
      var y_pos = i * tile_height;

      // function to draw tile
      var function_name = value[0];
      var function_params = [x_pos, y_pos, tile_width, tile_height];

      // add optional argument
      if (value.length > 1) function_params.push(value[1]);
      else function_params.push('');

      // call function
      if (function_name !== '') {
        var fn = function_list[function_name];
        fn.apply(null, function_params);
      }
    }
  }

  var width = x_size * tile_width;
  var height = y_size * tile_height;

  return new paper.Size(width, height);
}
