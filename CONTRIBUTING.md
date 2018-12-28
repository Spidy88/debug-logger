## Using docker-compose

This repo has limited support for developing within the Docker environment. This is primarily because it's been over a 
year since I actively used Docker, but if you are proficient you can easily setup the proper volumes and any other 
missing features.

## Using your local development environment

To develop for this project you will need Node >= 8 and Yarn. Yarn is the only global install required to run this 
project. To install Yarn run:

```
npm install -g yarn
```

Once you have Yarn installed you can get the rest of the project dependencies with:

```
yarn
```

With that, you should be ready to start developing. Enjoy!

## Configuration

Configuration is handled through the `config` package. All values are loaded from [config](config) directory depending 
on the NODE_ENV value. By default this will be `development`. If you find you need to change values for local 
development only, you can add keys to the [config/local.js](config/local.js) file. This file should not be committed back to source 
control (it is already on the ignore list). These configuration values are shared by the server-side and client-side 
code, with the client-side config being santized to a subset of the provided configuration values.

## Client-side

The client-side configuration pulls values from the same config as the server-side code. The main difference is the 
client-side code receives a global `CONFIG` object, rather then the full `config` package. To update the config values 
shared with the client-side, see [webpack.config.js](webpack.config.js).

## Build the server-side code

Our server-side code uses ES6 syntax including some features not yet fully supported by NodeJS. To build the server-side
code we'll utlize `babel-node`. The command is already setup in our [package.json](package.json), which can be run with:

```
yarn run 
``` 