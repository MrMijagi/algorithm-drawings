# algorithm-drawings

After cloning repo, run `npm install paper` inside, so paper.js will be able to work.

If you don't have `npm` install it from here: https://www.npmjs.com/get-npm

To run the example, just open `index.html` in browser.

## Creating labyrinths

To create a labyrinth, you first need to make a map that is simply a two-dimensonal array consisting of strings.

Here is small example:

```
map = [
  ['' , ' ' , 'v' , ' '],
  ['' , 'x' , 'v' , ' '],
  [' ', 'br', 'tl', ' '],
  [' ', 'v' , 'x' , '' ],
];
```

And the result:

![image](https://user-images.githubusercontent.com/45121219/112775790-36ff3880-903e-11eb-8972-785708275246.png)

Now that you defined map, you can render the labyrinth using `grid()` function:

```
grid(map, x, y, tile_width, tile_height);
```

Where `x` and `y` determine starting position of the labyrinth, and `tile_width`/`tile_height` define size of one cell.

Now list of what cells are available to render:
* empty string - no cell is being rendered
* `' '` (space) - empty cell
* `'x'` - red crossed cell
* `'v'` - vertical path
* `'h'` - horizontal path
* `'tl'` - path connecting top side with left side
* `'tr'` - path connecting top side with right side
* `'bl'` - path connecting bottom side with left side
* '`br'` - path connecting bottom side with right side

## Creating red-black trees

The process is similar to creating labyrinths - first you need to define tree.

Here is example:

```
tree = { 
  1:["104","red"], 
  2:["83","black"], 
  3:["5", "black"],
  4:["23", "red"],
  5:["92", "red"],
  6:["16", "red"],
  7:["4", "red"],
  8:["NIL", "black"],
  9:["NIL", "black"],
  12:["NIL", "black"],
  13:["NIL", "black"]
};
```

With the following result:

![image](https://user-images.githubusercontent.com/45121219/112847127-0acbd200-90a7-11eb-9e61-ae5585af78ee.png)

Now you can render tree by calling `red_black_tree` function:

```
red_black_tree(tree, x, y, node_radius, x_scale, y_scale);
```

Where `x` and `y` determine center of root node, `node_radius` is self-explanatory, `x_scale` stretches the tree in X-axis and `y_scale` stretches the tree in Y-asix.

Now some explanation as to how define RB tree - it's basically a dictionary where key is index of node (root has index `1`, it's left child `2` and right child `3`, and so on...), and value is array which first element is text which we want to put inside node and second element is the color.

Called function automatically calculates positions of nodes so there is not much customisation except for scaling.
