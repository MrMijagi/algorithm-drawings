# algorithm-drawings

After cloning repo, run `npm install paper` inside, so paper.js will be able to work.

If you don't have `npm` install it from here: https://www.npmjs.com/get-npm

To run the example, just open `index.html` in browser.

## Creating labyrinths

To create a labyrinth, you first need to make a map that is simply a two-dimensonal array consisting of strings.

Here is small example:

`map = [
  ['' , ' ' , 'v' , ' '],
  ['' , 'x' , 'v' , ' '],
  [' ', 'br', 'tl', ' '],
  [' ', 'v' , 'x' , '' ],
];`

And the result:
![image](https://user-images.githubusercontent.com/45121219/112775790-36ff3880-903e-11eb-8972-785708275246.png)

Now that you defined map, you can render the labyrinth using `grid()` function:

`grid(map, x, y, tile_width, tile_height);`

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
