# A short-ish walkthrough to add babel / webpack / react to an existing webpage / javascript file

Sources:

- https://reactjs.org/docs/add-react-to-a-website.html (used deprecated babel libraries in examples)
- https://www.sentinelstand.com/article/create-react-app-from-scratch-with-webpack-and-babel
- https://www.valentinog.com/blog/preset-env/

Comments:
- "npm i -D libraryname" is just short for "npm install --save-dev libraryname"
- I reduced the comments in the code from the excelent sentinelstand.com article above to the minimum, refer to the article for more in depth comments

## Goal:

We want to use react in one js file and one html page but don't want to touch anything else on the project / site; we include react from the cdn.
We **don't** want a transpiled single page app or extras like scss support. 

For a single page app, just use 

    npx create-react-app my-app
or, for modern redux integration,

    npx create-react-app my-app --template redux

Or go through the sentinelstand article to do it all by hand.

All files are in the following repo:

FOr a super quick start, clone / download them into the directory containing the project, make a src directory with the js file you want to use as an entry point, adjust the entry points and transpile (file-) targets accordingly, run "npm i", add the react libraris to the html page, run npm dev for the live server and start using react.

# Start

Go to folder where the js is located (from now called index.js)

### Add React to the html page which includes the js and the react root component

    <script src="https://unpkg.com/react@16/umd/react.production.min.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js" crossorigin></script>

    // or 
    
    <script crossorigin src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>

### NPM INIT

create src directory and move (or create) index.js - the file you want transpiled - there

    npm init (select the index.js in src folder here)

### ADD BABEL

Add babel for transpiling to legacy js for older browsers; preset-react only if this will be a react project:

    npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/preset-react

-> code can now be automaticall transpiled on change by using 
    npx babel --watch src --out-dir . --presets @babel/preset-env
    
You can add the presets in a babel.config.js (or .json) file, see below

### ADD POLYFILLS FOR OLDER BROWSERS
To add more features that aren't supported (Array.from doesn't work in IE11 for example), add an inteligent polyfill library:

npm i core-js

## *skip this if you just want to get started without middle steps; this file will be deleted in a minute anyway*

add (for example) 
"targets": "> 0.25%, not dead"
to package.json under "devDependencies"


create babel.config.js with content:

    const presets = [
      [
        "@babel/preset-env",
        { debug: true, useBuiltIns: "usage", corejs: 3 },
        "@babel/preset-react", // if installed / needed
      ],
    ];

    const plugins = [];

    module.exports = { presets, plugins };

Now we can ommit the presets on the command line:

    npx babel --watch src --out-dir .

core-js is now only adding the needed imports (polyfills) for the browser target in the generated js file. To package these we'll need to install webpack.

## */skip*


## WEBPACK

  npm i -D webpack webpack-cli

add a basic webpack.config.js

    const path = require('path');

    const PATH_SOURCE = path.join(__dirname, './src'); // the source files we work oj
    // const PATH_DIST = path.join(__dirname, './dist'); // the output of webpack, separate dist folder recommended
    // but for now, we just want the js file in the base directory transpiled / packed like we did with babel
    const PATH_DIST = __dirname;

    module.exports = {
      // https://webpack.js.org/configuration/mode
      mode: 'development',

      // The point or points to enter the application. 
      // For traditional multi-page apps, we may have multiple entry points.
      entry: [
        path.join(PATH_SOURCE, './index.js'),
      ],

      // Tell Webpack where to emit the bundles it creates and how to name them.
      // https://webpack.js.org/concepts#output
      output: {
        path: PATH_DIST,
        //filename: "js/[name].[hash].js", // hashed filename for easier caching
        filename: "index.js", // just the same filename for easier understanding
      },
    };

We can now run webpack (so far WITHOUT the babel transpiling - webpack doesn't know about babel yet and is a separate toolchain.

        ./node_modules/webpack/bin/webpack.js --config webpack.config.js

To make life easier, add a new command to package.json to run webpack:

        "dev": "webpack --config webpack.config.js"
        
so you can just type this to run the build:

        npm run dev


### Tell Webpack how to include Babel (and other loaders) in its build process and add react as well

    npm i -D babel-loader

Add the following code to the webpack.config.js after the output object.

    output: { ... }, 
    module: {
      rules: [
        {
          test: /\.jsx?$/, // Apply this rule to files ending in .js(x)
          exclude: /node_modules/, // Don't apply to files residing in node_modules
          use: { 
            loader: 'babel-loader',
            //This option object will replace babel.config.js
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    debug: true, // Output the targets/plugins used when compiling
                    useBuiltIns: "usage",
                    corejs: 3,
                    targets: "> 0.25%, not dead", // we now can remove the targets from package.json
                  },
                ],
                "@babel/preset-react",
              ],
            },
          }
        }
      ],
    },

The babel.config.js can now be deleted.

**Now we can just run "npm run dev" to transpile and use moder JS and React!.**

## Make life easier


html-webpack-plugin
clean-webpack-plugin
webpack-dev-server