# Single Page Website Project

A single page website built using node-style modules and browserify to bundle it up and sent it to the client. 

The site is hosted at -> http://shielded-citadel-8274.herokuapp.com/

### Launching the site

Clone the repo into a foler. The site is built already. Everything needed to deploy is under the public folder so you can either `open the index.html` under the public folder or first run `npm install` and finally start a local server with `npm start`. The site will then available at `http://localhost:5000`.

### The following build commands are  available

#### `npm run dev`
Launches a livereload server and automatically builds the css and js files. The files are not compressed

#### `npm run build`
Builds and compresses the js and css files

#### `npm start`
Compresses the css and js files and starts a local server at `http://localhost:5000`

##### Tested on

* Google Chrome
* iPhone 6 Plus
* iPad Slim

##### TODO

* Page must initialise with a loader till all content has been downloaded and only then present user with the site.
* Must have appropriate add to home screen preparation for mobile devices
