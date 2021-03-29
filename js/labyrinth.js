function cell(x, y, width, height) {
  var square = new Path.Rectangle({
    point: [x, y],
    size: [width, height]
  });
  square.strokeWidth = 2;
  square.strokeColor = '#000';
}

function closed_cell(x, y, width, height) {
  var path1 = new Path({
    segments: [[x, y], [x + width, y + height]]
  });
  path1.style = {
    strokeWidth: 2,
    strokeColor: '#f00'
  };

  var path2 = new Path({
    segments: [[x + width, y], [x, y + height]]
  });
  path2.style = path1.style;

  cell(x, y, width, height);
}

function horizontal_cell(x, y, width, height) {
  var path = new Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new Point(x, (height/2) + y));
  path.add(new Point(x + width, (height/2) + y));

  cell(x, y, width, height);
}

function vertical_cell(x, y, width, height) {
  var path = new Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new Point((width/2) + x, y));
  path.add(new Point((width/2) + x, y + height));

  cell(x, y, width, height);
}

function top_left_cell(x, y, width, height) {
  var path = new Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new Point(x, (height/2) + y));
  path.add(new Point((width/2) + x, (height/2) + y));
  path.add(new Point((width/2) + x, y));

  cell(x, y, width, height);
}

function top_right_cell(x, y, width, height) {
  var path = new Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new Point((width/2) + x, y));
  path.add(new Point((width/2) + x, (height/2) + y));
  path.add(new Point(x + width, (height/2) + y));

  cell(x, y, width, height);
}

function bottom_right_cell(x, y, width, height) {
  var path = new Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new Point(x + width, (height/2) + y));
  path.add(new Point((width/2) + x, (height/2) + y));
  path.add(new Point((width/2) + x, y + height));

  cell(x, y, width, height);
}

function bottom_left_cell(x, y, width, height) {
  var path = new Path();
  path.style = {
    strokeWidth: 2,
    strokeColor: '#00f'
  };

  path.add(new Point((width/2) + x, y + height));
  path.add(new Point((width/2) + x, (height/2) + y));
  path.add(new Point(x, (height/2) + y));

  cell(x, y, width, height);
}

function grid(map, x, y, tile_width, tile_height) {
  y_size = map.length;
  x_size = map[0].length;

  for (var i = 0; i < y_size; i++) {
    for (var j = 0; j < x_size; j++) {
      value = map[i][j];
      x_pos = j * tile_width + x;
      y_pos = i * tile_height + y;

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

map = [
  ['x' , 'v' , 'x' , 'x' , 'x' , 'x' , 'x' ],
  ['x' , 'tr', 'h' , 'h' , 'bl', ' ' , ' ' ],
  ['x' , ' ' , 'x' , 'x' , 'v' , 'x' , ' ' ],
  ['x' , ' ' , 'x' , 'x' , 'v' , 'x' , ' ' ],
  ['x' , ' ' , 'br', 'h' , 'tl', ' ' , ' ' ],
  ['x' , 'x' , 'v' , 'x' , 'x' , 'x' , 'x' ],
  ['x' , 'x' , 'v' , 'x' , 'x' , 'x' , 'x' ],
];

map2 = [
  ['' , ' ', 'v', ' '],
  ['', 'x', 'v', ' '],
  [' ', 'br', 'tl', ' '],
  [' ', 'v', 'x', ''],
];

grid(map, 20, 20, 30, 30);
grid(map2, 520, 20, 20, 20);
