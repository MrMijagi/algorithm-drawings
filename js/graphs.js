function getHandlePoint(path, where, offset) {
  let path_offset = path.length * where;
  let point = path.getPointAt(path_offset);
  let normal = path.getNormalAt(path_offset);

  if (offset != 0) {
    normal.x = normal.x * offset;
    normal.y = normal.y * offset;
  }

  return new paper.Point(point.x + normal.x, point.y + normal.y);
}

class Node {
  constructor(center, radius, value, color, background_color, border_color) {
    this.center = center;
    this.radius = radius;
    this.value = value;
    this.color = color;
    this.background_color = background_color;
    this.border_color = border_color;
  }

  init() {
    this.circle = new paper.Path.Circle({
      center: this.center,
      radius: this.radius,
      strokeColor: this.border_color == "" ? null : this.border_color,
      fillColor: this.background_color == "" ? null : this.background_color,
      strokeWidth: 2
    });

    this.text = new paper.PointText({
      point: [this.center.x, this.center.y + (this.radius * 0.25)],
      content: this.value,
      fillColor: this.color,
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: this.radius * 1,
      justification: 'center'
    });
  }
}

function get_node_offset(x, y, tile_size) {
  var x_offset = (x * tile_size) + (tile_size / 2);
  var y_offset = (y * tile_size) + (tile_size / 2);

  return new paper.Point(x_offset, y_offset);
}

class Connection {
  constructor(p1, p2, value, color, directed, text_offset, text_height, factor, segments) {
    this.p1 = p1
    this.p2 = p2;
    this.value = value ? value : "";
    this.color = color ? color : "#000";
    this.directed = directed ? directed : false;
    this.text_offset = text_offset ? text_offset : 0.5;
    this.text_height = text_height ? text_height : 0;
    this.factor = factor ? factor : 0.2;
    this.segments = segments ? segments : [];
  }

  init(node_radius) {
    this.path = new paper.Path({
      segments: [
        this.p1,
        this.p2
      ],
      strokeColor: this.color,
      strokeWidth: node_radius / 10
    })

    // insert segments that path should go through
    this.segments.forEach(segment => this.path.insert(this.path.segments.length - 1, segment));
    // this.segments.forEach(segment => new paper.Path.Circle({center: segment, radius: 3, fillColor: 'green'}));

    let p1_circle = new paper.Path.Circle(this.p1, node_radius);
    let p2_circle = new paper.Path.Circle(this.p2, node_radius);

    this.path.smooth({ type: 'geometric', factor: this.factor});

    this.path.segments[0].point = this.path.getIntersections(p1_circle)[0].point;
    this.path.segments[this.path.segments.length - 1].point = this.path.getIntersections(p2_circle)[0].point;

    // get text pos
    let text_pos = getHandlePoint(this.path, this.text_offset, this.text_height);

    // render text
    this.text = new paper.PointText({
      point: [text_pos.x, text_pos.y + (node_radius * 0.25)],
      content: this.value,
      fillColor: '#000',
      fontFamily: 'Courier New',
      fontWeight: 'bold',
      fontSize: node_radius * 0.8,
      justification: 'center'
    });

    // draw arrow at the end if connection is directed
    if (this.directed) {
      let last_point = this.path.segments[this.path.segments.length - 1].point
      let offset = this.path.length - (node_radius / 2);
      let offset_point = this.path.getPointAt(offset);
      let normal_point = this.path.getNormalAt(offset);
      let deviation = node_radius / 4;

      let left_point = new paper.Point(normal_point.x * deviation, normal_point.y * deviation);
      let right_point = new paper.Point(normal_point.x * -deviation, normal_point.y * -deviation);

      this.arrow = new paper.Path({
        segments: [
          last_point,
          new paper.Point(offset_point.x + left_point.x, offset_point.y + left_point.y),
          new paper.Point(offset_point.x + right_point.x, offset_point.y + right_point.y)
        ],
        closed: true,
        fillColor: this.color
      })

      // reduce the end of the path
      this.path.segments[this.path.segments.length - 1].point = offset_point;
    }
  }
}

export class Graph {
  constructor(structure, params) {
    this.width = params["width"];
    this.height = params["height"];
    this.tile_size = params["tile_size"];
    this.scale = params["scale"];
    this.node_radius = this.tile_size * this.scale / 2;

    let nodes_dict = structure["nodes"];
    let connections_dict = structure["connections"];

    this.nodes = {};
    for (var i = 0; i < nodes_dict.length; i++) {
      let center = get_node_offset(nodes_dict[i]["x"], nodes_dict[i]["y"], this.tile_size);
      this.nodes[nodes_dict[i]["id"]] = new Node(center, this.node_radius, nodes_dict[i]["value"],
        nodes_dict[i]["color"], nodes_dict[i]["background_color"], nodes_dict[i]["border_color"]);
    }

    this.connections = [];
    for (var i = 0; i < connections_dict.length; i++) {
      let p1 = this.nodes[connections_dict[i]["from_id"]];
      let p2 = this.nodes[connections_dict[i]["to_id"]];
      this.connections.push(new Connection(p1.center, p2.center, connections_dict[i]["value"],
        connections_dict[i]["color"], connections_dict[i]["directed"], connections_dict[i]["text_offset"],
        connections_dict[i]["text_height"], connections_dict[i]["factor"], connections_dict[i]["segments"]));
    }
  }

  init() {
    for (let node in this.nodes) {
      this.nodes[node].init();
    }

    for (let connection in this.connections) {
      this.connections[connection].init(this.node_radius);
    }
  }

  get_size() {
    return new paper.Size(this.width * this.tile_size, this.height * this.tile_size);
  }
}
