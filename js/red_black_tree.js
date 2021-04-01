export class Node {
  constructor(index, value, isRed, active, rotate) {
    this.index = index;
    this.value = value;
    this.isRed = isRed;
    this.isActive = active;
    this.rotate = rotate;
  }

  init(x, y, radius) {
    // draw circle
    this.circle = new paper.Path.Circle({
      center: [x, y],
      radius: radius,
      strokeWidth: 2,
      strokeColor: '#000',
      fillColor: '#000'
    });

    if (this.isRed) this.circle.fillColor = '#f00';
    if (this.isActive) this.circle.strokeColor = Node.activeColor;
  
    // render text
    this.text = new paper.PointText({
      point: [x, y + (radius * 0.25)],
      content: this.value,
      fillColor: '#fff',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: radius * 0.8,
      justification: 'center'
    });

    // curved arrow around node
    this.arrow = new paper.Path({
      segments: [
        new paper.Segment(
          new paper.Point(x + (radius * 2), y + (radius * 0.7)),
          null,
          new paper.Point(radius * 0.3, radius * -0.3)),
        new paper.Segment(
          new paper.Point(x + (radius * 2), y + (radius * -0.7)),
          new paper.Point(radius * 0.3, radius * 0.3),
          null)
      ],
      strokeWidth: 2,
      strokeColor: '#000'
    });

    this.arrow_head = new paper.Path({
      segments: [
        new paper.Segment(new paper.Point(x + (radius * 1.9), y + (radius * 0.35 * (this.rotate > 0 ? 1 : -1)))),
        new paper.Segment(new paper.Point(x + (radius * 2), y + (radius * 0.7 * (this.rotate > 0 ? 1 : -1)))),
        new paper.Segment(new paper.Point(x + (radius * 2.4), y + (radius * 0.55 * (this.rotate > 0 ? 1 : -1))))
      ],
      strokeWidth: 2,
      strokeColor: '#000'
    });

    if (this.rotate == 0) {
      this.arrow.strokeWidth = 0;
      this.arrow_head.strokeWidth = 0;
    }

    this.arrow.rotate(this.rotate, new paper.Point(x, y));
    this.arrow_head.rotate(this.rotate, new paper.Point(x, y));
  }
}

export class RBTree {
  constructor(tree, node_radius, x_scale, y_scale) {
    this.node_radius = node_radius;
    this.x_scale = x_scale;
    this.y_scale = y_scale;

    // we want to save keys in index order
    var keys = Object.keys(tree);
    keys.sort();

    // calculate max level by taking the biggest index
    this.max_level = level_from_index(keys[keys.length - 1]);

    // calculate root node position
    this.root_x = this.node_radius * 3;
    this.root_y = this.node_radius * 3;

    var sum = 0;
    for (var i = 0; i < this.max_level; i++) {
      sum += Math.pow(2, 2 + i);
    }
    this.root_x += sum * node_radius * x_scale; // magic formula that calculates middle of the tree

    // add all nodes to array
    this.nodes = [];
    for (let key of keys) {
      var isRed = (tree[key][1] === 'red' ? true : false);
      var isActive = (tree[key][2] === 'active' ? true : false);
      this.nodes.push(new Node(key, tree[key][0], isRed, isActive, tree[key][3]));
    };

    this.connections = [];
  }

  init() {
    // first draw nodes
    for (let node of this.nodes) {
      var offset = find_position_offset_from_index(node.index, this.max_level, this.node_radius, this.x_scale, this.y_scale);
      node.init(this.root_x + offset[0], this.root_y + offset[1], this.node_radius);
    }

    // draw connections between nodes
    for (let node of this.nodes) {
      var left_child = this.get_node_with_index(node.index * 2);
      if (left_child != null) {
        this.connections.push(this.get_connection_between_nodes(node, left_child));
      }

      var right_child = this.get_node_with_index(node.index * 2 + 1);
      if (right_child != null) {
        this.connections.push(this.get_connection_between_nodes(node, right_child));
      }
    }
  }

  get_node_with_index(index) {
    for (let node of this.nodes) {
      if (node.index == index) {
        return node;
      }
    }

    return null;
  }

  get_connection_between_nodes(node_parent, node_child) {
    // get centers from both nodes
    var point_start = new paper.Point(node_parent.circle.position);
    var point_end = new paper.Point(node_child.circle.position);

    // path connecting points
    var tmp_path = new paper.Path();
    tmp_path.add(point_start, point_end);

    // find intersections for new path
    var intersections = tmp_path.getIntersections(node_parent.circle);
    var segment_start = new paper.Segment(intersections[0].point);
    intersections = tmp_path.getIntersections(node_child.circle);
    var segment_end = new paper.Segment(intersections[0].point);

    // draw path that connects to border of circle rather than center
    return new paper.Path({
      segments: [segment_start, segment_end],
      strokeColor: '#000',
      strokeWidth: 2
    });
  }

  get_size() {
    var width = this.root_x * 2 + (this.node_radius * 2);
    var height = this.node_radius * this.y_scale * (4 * this.max_level + 2) + this.node_radius * 4;

    return new paper.Size(width, height);
  }
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
