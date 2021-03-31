# algorithm-drawings

This repo provides an easy way to draw labyrinths, red-black trees and graphs by simply defining their structure in text. It uses [paper.js](http://paperjs.org/) for drawing on canvas and [FileSaver.js](https://github.com/eligrey/FileSaver.js/) for exporting canvas content to .png images.

After cloning repo, run `npm install` inside, so modules will be ready to work.

If you don't have `npm` install it from here: https://www.npmjs.com/get-npm

To run code, setup simple web server (for example with [http-server](https://www.npmjs.com/package/http-server)) and start website in browser.

# Usage

All operations mentioned below should be done inside `main.js` script.

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

Now that you defined map, you can render the labyrinth using `grid()` function:

```
grid(map, tile_width, tile_height);
```

Where `tile_width`/`tile_height` define size of one cell.

Example result:

![image](https://user-images.githubusercontent.com/45121219/112855910-93e70700-90af-11eb-9fac-66edc06ff7c2.png)

Now list of what cells are available to render:
* `''` (empty string) - no cell is being rendered
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

Now you can render tree by calling `red_black_tree` function:

```
red_black_tree(tree, node_radius, x_scale, y_scale);
```

Where `node_radius` is self-explanatory, `x_scale` stretches the tree in X-axis and `y_scale` stretches the tree in Y-asix.

Example result:

![image](https://user-images.githubusercontent.com/45121219/112847127-0acbd200-90a7-11eb-9e61-ae5585af78ee.png)

Now some explanation as to how define RB tree - it's basically a dictionary where key is index of node (root has index `1`, it's left child `2` and right child `3`, and so on...), and value is array which first element is text which we want to put inside node and second element is the color.

Called function automatically calculates positions of nodes so there is not much customisation except for scaling.

## Creating graphs

To create graph, you need to define both nodes and connections between them.

As usual, let's start from example:

```
var nodes = {
  1:[0, 0, '1'],
  2:[4, 0, '2'],
  3:[4, 2, '3'],
  4:[2, 2, '4'],
  5:[2, 1, '5'],
  6:[0, 2, '6'],
}

var connections = {
  1:[1, 2, '#00f'],
  2:[2, 3, '#0f0'],
  3:[3, 4, '#f00'],
  4:[4, 5, '#000'],
  5:[5, 6, '#f0f']
}
```

Now we call `graph` function:

```
graph(nodes, connections, directed, tile_size, scale);
```

Where `directed` is flag which determines whether graph is directed or not (not implemented yet; for now graphs are non directed only), `tile_size` is size of one cell in the grid and `scale` determines how big node is inside the cell (`1` means diameter of the node is equal to `tile_size`).

Example result:

![image](https://user-images.githubusercontent.com/45121219/112864443-18d61e80-90b8-11eb-9f44-115fed1ef580.png)

Nodes is dictionary with keys identyfing node and value is array where first two elements (`x` and `y`) determine node position on the grid. The third element is text to show. Connections is another dictionary with keys also identyfing connection and value is array where first element is index of starting node and second element is index of ending node. Third element is color of the path.

Nodes are placed inside grid that itself is invisible. The point of it is to make it easy to align nodes witch each other.

## Exporting to .png

To export and download content of canvas, uncomment this line:

```
paper.view.element.toBlob(function(blob) { saveAs(blob, "image.png");});
```

Now each time the website will be refreshed, the image will be downloaded. All images will go to folder specified by browser, so it may be good idea to change it to more suiting place (in my case I don't use Edge browser, so I run the website there and all images go to separate folder).

It is possible to set background (or make transparent image) by uncommenting/commenting this line:

```
background(color);
```
