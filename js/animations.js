function RBTree_rotate(structure, progress, params) {

}

// params is an array consisting of nodes keys that should change color from red to black (or reverse)
function RBTree_color_change(structure, progress, params) {
  params.forEach(function(key) {
    let is_source_red = structure.nodes[key].isRed;
    let source_color_red = is_source_red ? 1 : 0;

    let updated_color = new paper.Color(source_color_red - progress, 0, 0);
    structure.nodes[key].circle.fillColor = updated_color;

    return structure;
  });
}

const animation_types = {
  "RBTree_rotate": RBTree_rotate,
  "RBTree_color_change": RBTree_color_change
}

function cut_to_range(value, from=0., to=1.) {
  if (value > to) value = to;
  if (value < from) value = from;

  return value;
}

export function apply_animation(structure, progress, animation_type, params) {
  return animation_types[animation_type](structure, cut_to_range(progress), params);
}
