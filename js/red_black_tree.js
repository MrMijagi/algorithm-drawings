function connect_nodes(x1, y1, x2, y2) {
  var path = new paper.Path({
    segments: [[x1, y1], [x2, y2]]
  });
  path.style = {
    strokeWidth: 2,
    strokeColor: '#000'
  };
}

function node(x, y, radius, value, color) {
  new paper.Path.Circle({
    center: [x, y],
    radius: radius,
    strokeWidth: 2,
    strokeColor: '#000',
    fillColor: color
  });

  new paper.PointText({
    point: [x, y + (radius * 0.25)],
    content: value,
    fillColor: '#fff',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: radius * 0.8,
    justification: 'center'
  });
}

function red_node(x, y, radius, value) {
  node(x, y, radius, value, '#f00');
}

function black_node(x, y, radius, value) {
  node(x, y, radius, value, '#000');
}

function level_from_index(index) {
  if (index == 1) return 0;
  else return Math.floor(Math.log2(index));
}

function find_position_offset_from_index(index, max_level, node_radius, x_scale, y_scale) {
  var level = level_from_index(index);
  var relative_level = max_level - level;

  var x_offset = 0;
  var y_offset = 0;
  
  if (level != 0) {
    // find level's origin point since it's not root
    for (var i = 1; i <= level; i++) {
      var curr_relative_level = max_level - i;
      x_offset -= Math.pow(2, 2 + curr_relative_level) * node_radius * x_scale;
    }
    y_offset += 4 * level * node_radius * y_scale;
  }

  // find x offset
  var index_offset = Math.abs(Math.pow(2, level) - index);
  x_offset += index_offset * Math.pow(2, 3 + relative_level) * node_radius * x_scale;

  return [x_offset, y_offset];
}

export function red_black_tree(tree, x, y, node_radius, x_scale, y_scale) {
  var keys = Object.keys(tree);
  keys.sort();

  var max_level = level_from_index(keys[keys.length - 1]);

  keys.forEach(function(key) {
    // find offset
    var offset = [0, 0];
    if (key != 0) offset = find_position_offset_from_index(key, max_level, node_radius, x_scale, y_scale);
    
    // first draw connections
    if ((key * 2) in tree) {
      var child_offset = find_position_offset_from_index(key * 2, max_level, node_radius, x_scale, y_scale);
      connect_nodes(x + offset[0], y + offset[1], x + child_offset[0], y + child_offset[1]);
    }

    if ((key * 2) + 1 in tree) {
      var child_offset = find_position_offset_from_index((key * 2) + 1, max_level, node_radius, x_scale, y_scale);
      connect_nodes(x + offset[0], y + offset[1], x + child_offset[0], y + child_offset[1]);
    }

    // get params
    var value = tree[key][0];
    var color = tree[key][1];

    console.log(x, y);
    console.log(offset[0], offset[1]);
    console.log("========================");
    // draw node
    if (color === 'red') {
      red_node(x + offset[0], y + offset[1], node_radius, value);
    } else if (color === 'black') {
      black_node(x + offset[0], y + offset[1], node_radius, value);
    }
  });
}

export function test() {
  var path = new paper.Path({
    segments: [[0, 0], [20, 20]]
  });
  path.style = {
    strokeWidth: 2,
    strokeColor: '#000'
  };
}
