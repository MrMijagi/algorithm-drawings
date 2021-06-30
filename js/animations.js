function RBTree_rotate(structure, progress, params) {

}

// params is an array consisting of 
function RBTree_connection_change(structure, progress, params) {
  params.forEach(function(param) {

  });
}

// params is an array consisting of dicts containing indexes from where to where node should go
function RBTree_position_change(structure, progress, params) {
  params.forEach(function(param) {
    let index_from = param["from"];
    let index_to = param["to"];

    let node = structure.nodes[index_from];
    let node_pos = node.circle.position;

    let offset = structure.find_position_offset_from_index(index_to);
    let dest_pos = new paper.Point(offset[0] + structure.root_x, offset[1] + structure.root_y);

    let pos_change = dest_pos.subtract(node_pos).multiply(progress);
    let pos_updated = node_pos.add(pos_change);

    node.circle.position = pos_updated;
    node.text.position = pos_updated;

    // now update position of connections paths
    structure.connections.forEach(function(connection) {
      // connection path starts at this node
      if (connection.from == index_from) {
        connection.path.segments[0].point = pos_updated;
        connection.path.segments[1].point = structure.nodes[connection.to].circle.position;

        if (!node.circle.getIntersections(structure.nodes[connection.to].circle).length) {
          connection.path.segments[0].point = connection.path.getIntersections(node.circle)[0].point;
          connection.path.segments[1].point = connection.path.getIntersections(structure.nodes[connection.to].circle)[0].point;
        }
      }

      // connection path ends at this node
      if (connection.to == index_from) {
        connection.path.segments[1].point = pos_updated;
        connection.path.segments[0].point = structure.nodes[connection.from].circle.position;
        
        if (!node.circle.getIntersections(structure.nodes[connection.from].circle).length) {
          connection.path.segments[1].point = connection.path.getIntersections(node.circle)[0].point;
          connection.path.segments[0].point = connection.path.getIntersections(structure.nodes[connection.from].circle)[0].point;
        }
      }
    })
  });
}

// params is an array consisting of nodes keys that should change color from red to black (or reverse)
function RBTree_color_change(structure, progress, params) {
  params.forEach(function(key) {
    let is_source_red = structure.nodes[key].isRed;
    let source_color_red = is_source_red ? 1 : 0;

    let updated_color = new paper.Color((source_color_red - progress) * (is_source_red ? 1 : -1), 0, 0);
    structure.nodes[key].circle.fillColor = updated_color;
  });
}

const animation_types = {
  "RBTree_rotate": RBTree_rotate,
  "RBTree_color_change": RBTree_color_change,
  "RBTree_position_change": RBTree_position_change
}

function cut_to_range(value, from=0., to=1.) {
  if (value > to) value = to;
  if (value < from) value = from;

  return value;
}

export function apply_animation(structure, progress, animation_type, params) {
  animation_types[animation_type](structure, cut_to_range(progress), params);
}
