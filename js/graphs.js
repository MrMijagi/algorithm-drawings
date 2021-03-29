function node(x, y, radius, value) {
  new paper.Path.Circle({
    center: [x, y],
    radius: radius,
    strokeColor: '#000',
    strokeWidth: 2,
    fillColor: '#fff'
  });

  new paper.PointText({
    point: [x, y + (radius * 0.25)],
    content: value,
    fillColor: '#000',
    fontFamily: 'Courier New',
    fontWeight: 'bold',
    fontSize: radius * 1,
    justification: 'center'
  });
}

function connect_nodes(x1, y1, x2, y2, color) {
  var path = new paper.Path({
    segments: [[x1, y1], [x2, y2]]
  });
  path.style = {
    strokeWidth: 2,
    strokeColor: color
  };
}

function get_node_offset(x, y, tile_size) {
  var x_offset = (x * tile_size) + (tile_size / 2);
  var y_offset = (y * tile_size) + (tile_size / 2);

  return [x_offset, y_offset];
}

export function graph(nodes, connections, directed, x_pos, y_pos, tile_size, scale) {
  Object.keys(connections).forEach(function(index) {
    var val = connections[index];

    var node_start = nodes[val[0]];
    var node_end = nodes[val[1]];

    var start_offset = get_node_offset(node_start[0], node_start[1], tile_size);
    var end_offset = get_node_offset(node_end[0], node_end[1], tile_size);

    connect_nodes(
      x_pos + start_offset[0],
      y_pos + start_offset[1],
      x_pos + end_offset[0],
      y_pos + end_offset[1],
      val[2]
    );
  });

  Object.keys(nodes).forEach(function(index) {
    var val = nodes[index];
    var offset = get_node_offset(val[0], val[1], tile_size);

    node(x_pos + offset[0], y_pos + offset[1], (tile_size / 2) * scale, val[2]);
  });
}
