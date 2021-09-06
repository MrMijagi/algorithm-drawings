# algorithm-drawings

This repo uses [diagram-drawer](https://github.com/MrMijagi/diagram-drawer) to draw diagrams on canvas, [FileSaver.js](https://github.com/eligrey/FileSaver.js/) for exporting canvas content to .png images and [JSON Editor](https://github.com/josdejong/jsoneditor) for easily modifying structures on the fly.

After cloning repo, run `npm install` inside, so modules will be ready to work.

If you don't have `npm` install it from here: https://www.npmjs.com/get-npm

To run code, setup simple web server (for example with [http-server](https://www.npmjs.com/package/http-server)) and start website in browser.

# Usage

After opening the website, there will be JSON editor on the left and on the right buttons for downloading the rendered image, downloading the JSON file and choosing the JSON file to render.

After loading the structure, it will be rendered under the buttons (you can use examples structures in [examples folder](https://github.com/MrMijagi/algorithm-drawings/tree/main/examples). Canvas will update itself after changing the content of JSON (providing that the structure inside editor is correct).
