import { version } from 'webpack';
let WorkerPlugin;

// Retrieving only webpack major version numerical value
const majorVersionNum = parseInt(version.split('.')[0]);

// Parametrically require webpack4 or webpack5 plugin variant
if (majorVersionNum <= 4) {
  WorkerPlugin = require('./webpack-4');
} else {
  WorkerPlugin = require('./webpack-5');
}

// Export the plugin class reference to the outer world
export default WorkerPlugin.default;
