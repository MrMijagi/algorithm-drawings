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

function horizontal_cell(x, y, width, height) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new paper.Point(x, (height/2) + y));
  path.add(new paper.Point(x + width, (height/2) + y));

  cell(x, y, width, height);
}

function vertical_cell(x, y, width, height) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new paper.Point((width/2) + x, y));
  path.add(new paper.Point((width/2) + x, y + height));

  cell(x, y, width, height);
}

function top_left_cell(x, y, width, height) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new paper.Point(x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, y));

  cell(x, y, width, height);
}

function top_right_cell(x, y, width, height) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new paper.Point((width/2) + x, y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point(x + width, (height/2) + y));

  cell(x, y, width, height);
}

function bottom_right_cell(x, y, width, height) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new paper.Point(x + width, (height/2) + y));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point((width/2) + x, y + height));

  cell(x, y, width, height);
}

function bottom_left_cell(x, y, width, height) {
  var path = new paper.Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new paper.Point((width/2) + x, y + height));
  path.add(new paper.Point((width/2) + x, (height/2) + y));
  path.add(new paper.Point(x, (height/2) + y));

  cell(x, y, width, height);
}

export function grid(map, x, y, tile_width, tile_height) {
  var y_size = map.length;
  var x_size = map[0].length;

  for (var i = 0; i < y_size; i++) {
    for (var j = 0; j < x_size; j++) {
      var value = map[i][j];
      var x_pos = j * tile_width + x;
      var y_pos = i * tile_height + y;

      if (value === 'x') {
        closed_cell(x_pos, y_pos, tile_width, tile_height);
      } else if (value === ' ') {
        cell(x_pos, y_pos, tile_width, tile_height);
      } else if (value === 'tl') {
        top_left_cell(x_pos, y_pos, tile_width, tile_height);
      } else if (value === 'tr') {
        top_right_cell(x_pos, y_pos, tile_width, tile_height);
      } else if (value === 'bl') {
        bottom_left_cell(x_pos, y_pos, tile_width, tile_height);
      } else if (value === 'br') {
        bottom_right_cell(x_pos, y_pos, tile_width, tile_height);
      } else if (value === 'v') {
        vertical_cell(x_pos, y_pos, tile_width, tile_height);
      } else if (value === 'h') {
        horizontal_cell(x_pos, y_pos, tile_width, tile_height);
      }
    }
  }
}
