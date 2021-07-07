# algorithm-drawings

This repo provides an easy way to draw labyrinths, red-black trees and graphs by simply defining their structure in JSON. It uses [paper.js](http://paperjs.org/) for drawing on canvas, [FileSaver.js](https://github.com/eligrey/FileSaver.js/) for exporting canvas content to .png images and [JSON Editor](https://github.com/josdejong/jsoneditor) for easily modifying structures on the fly.

After cloning repo, run `npm install` inside, so modules will be ready to work.

If you don't have `npm` install it from here: https://www.npmjs.com/get-npm

To run code, setup simple web server (for example with [http-server](https://www.npmjs.com/package/http-server)) and start website in browser.

# Usage

After opening the website, there will be JSON editor on the left and on the right buttons for starting animation (see [Animations](#animations)), restarting structure, downloading the rendered image, downloading the JSON file and choosing the JSON file to render.

![image](https://user-images.githubusercontent.com/45121219/124716278-319a6f80-df04-11eb-81d1-5cb9542b298a.png)

After loading the structure, it will be rendered under the buttons (you can use examples structures in [structures folder](https://github.com/MrMijagi/algorithm-drawings/tree/main/structures).

Each JSON file should start with name of the structure ("Graph" | "Labyrinth" | "RBTree" ) and background color (if string is empty, then background is transparent). Then params dict defines parameters specific for entire structure (like node_radius or tile_size) and at the end structure dict defines each element inside the structure.

All color attributes should be defined in RGB hex code ("#ffaa33").

## Creating labyrinths

Labyrinth is essentialy a grid which consists of tiles. Each tile has its own attributes which can be set in structure value. Structure is two dimensional array, where nested arrays define rows. All nested arrays should have fixed length.

Labyrinth params:
* `tile_width`
* `tile_height`

Labyrinth tile attributes:
* `line_type` - creates a path. Possible values: "up" | "down" | "left" | "right" | "top_left" | "top_right" | "bottom_left" | "bottom_right"
* `arrow_type` - indicates direction on path. Possible values: "up" | "down" | "left" | "right"
* `background_color` - if empty then background is transparent
* `path_color`
* `border_color` - if empty then background is transparent
* `text` - text to display on tile. Max 2 characters should fit inside one tile.

Rendered image from [example](https://github.com/MrMijagi/algorithm-drawings/blob/main/structures/LabyrinthExample.json):

![image (9)](https://user-images.githubusercontent.com/45121219/123644497-b7902980-d825-11eb-9da1-402116fe9821.png)

## Creating red-black trees

The structure dict consists of other dicts, that determine the position and the looks of each node. The key of node determines its position on the tree ('1' is root, '2' is roots left child, '3' is roots right child, and so on...).

Red-black tree params:
* `node_radius`
* `x_scale` - determines how wide the entire tree is
* `y_scale` - determines how tall the entire tree is
* `active_color` - border color of node that has "active" flag

Red-black tree node attributes:
* `value` - text inside node
* `isRed` - red background if `true`, black otherwise
* `isActive` - if `true` then border color of the node will change to `active_color` parameter
* `angle` - if not null, an curved arrow will be drawn around the node. The angle value determines where the arrow will start

Rendered image from [example](https://github.com/MrMijagi/algorithm-drawings/blob/main/structures/RBTreeExample.json):

![image (10)](https://user-images.githubusercontent.com/45121219/123646048-2a4dd480-d827-11eb-9de1-ad8a9bb5e798.png)

## Creating graphs

Graph is the most complex structure and requires a lot of time to refine but it is the most customizable.

As labirynth, graph uses a grid to place nodes inside it (so its easier to align them). Inside the structure dict, there are two dicts that define nodes and connections between them. It is important that each node has unique id attribute, as it is used by connections to identify them.

Graph params:
* `width` - width of the grid
* `height` - height of the grid
* `tile_size`
* `scale` - defines how much space does the node inside tile take. If scale=1, node diameter is equal to `tile_size`

Node attributes:
* `x` - row index on the grid
* `y` - column index on the grid
* `id` - node identifier. Should be unique
* `value` - text inside node
* `color` - color of the text
* `background_color` - if empty, the node background is transparent
* `border_color` - if empty, the node border is transparent

Connection attributes:
* `from_id` - connection starting node
* `to_id` - connection ending node
* `value` - text appearing on connection
* `color` - color of the text
* `directed` - if `true`, arrow will be created at the ending node
* `text_offset` - a value from 0 to 1 that determines where the text should be relative to the length of the line (0 is starting node, 1 is ending node)
* `text_height` - determines how far off the line text should be (negative values go into the opposite direction)
* `factor` - if line has one or more segments, it changes how 'strict' the smoothing is (its best to experiment with this yourself)
* `segments` - list of points {x, y} that the line has to go through (useful if there is obstacle between the two nodes that we want to connect)

Rendered image from [example](https://github.com/MrMijagi/algorithm-drawings/blob/main/structures/GraphExample.json):

![image (8)](https://user-images.githubusercontent.com/45121219/123648742-7dc12200-d829-11eb-8305-0f7edb112982.png)

## Containers

Here you can define arrays of cells - visualization of arrays. You can also create text in different colors as well as connect created texts and cells with arrows.

All elements (text and container) are defined together in list. Each element has unique ID which is its index in that list. Connections take IDs of elements it should connect and the direction (side of the element) it should connect from/to.

Container params:
* `size_x` - width of the render
* `size_y` - height of the render

Container (element) attributes:
* `x` - position on X axis
* `y` - position on Y axis
* `width` - width of one cell
* `height` - height of one cell
* `cells` - list of cells that can take 3 attributes (value, color, background_color)

Text attributes:
* `x` - position on X axis (not needed if `after` defined)
* `y` - position on Y axis (not needed if `after` defined)
* `value` - text to be rendered
* `color` - font color
* `size` - font size
* `after` - takes ID of other text element and positions this text next to it (`x` and `y` not needed)

Connection attributes:
* `from` - ID of element from which connection starts
* `from_direction` - determines from which side of the element the connection will start ("topCenter" | "bottomCenter" | "leftCenter" | "rightCenter")
* `from_index` - if the element determined by `from` is an array of cells (container) this attribute points to one of them
* `to` - ID of element to which connection ends
* `to_direction` - determines to which side of the element the connection will end ("topCenter" | "bottomCenter" | "leftCenter" | "rightCenter")
* `to_index` - if the element determined by `to` is an array of cells (container) this attribute points to one of them
* `arrow` - determines if connection should end with arrow head (bool)
* `color` - color of the connection
* `margin` - determines how big space there is between end of the connection and the side it connects to (if 0 then connection will touch the side)
* `segments` - list of points {x, y} that the connection has to go through (useful if the path between elements is not straight)

Rendered image from [example](https://github.com/MrMijagi/algorithm-drawings/blob/main/structures/ContainerExample.json):

![image (12)](https://user-images.githubusercontent.com/45121219/124716856-d4eb8480-df04-11eb-8cec-e196a1ea7660.png)

It's important to note that connection will always try to find the straight path between two elements first before connecting centers of both sides. In the example above the line connecting text "end" with last cell of left container found a straight line, therefore the starting point (at the top of the text) isn't at the center. But if we change the cell that the connection will point to it won't be able to find straight path so it will connect centers:

![image](https://user-images.githubusercontent.com/45121219/124714255-cfd90600-df01-11eb-98a7-f1c109149f9f.png)

## Animations

_Animations are still development as for now it's only possible to change positions and colors in Red-black tree._

To use animations you have to append another param at the end of JSON called "animations". This is a list that contains the type of animation, it's parameters, start and duration of animation. You can combine animations if they run one after the other (but don't run them simultaneously - undefined behavior 🙂). After defining animations in JSON, click "Start animation" button and after you want to stop it, click "Restart structure" which will reset JSON to initial state.

Types of animations and their parameters:
* `RBTree_color_change` - this animation will swap the colors (red -> black, black -> red) of all nodes mentioned in `params` (their indexes defined in `structure`)
* `RBTree_position_change` - this animation will change the position of node that is determined by index (always in the initial structure - if the node was moved previously, script won't take into account the new position!) pointed by `from` parameter, to position determined by `to` parameter

An option to export animation to GIF is in TODO list 🙂.
