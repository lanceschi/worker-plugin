import { version } from 'webpack';
import WorkerPlugin4 from './webpack-4';

// Just a placeholder for now
const WorkerPlugin5 = '';

// Retrieving only the major version numerical value
const majorVersionNum = parseInt(version.split('.')[0]);

// Parametrically serve webpack4 or webpack5 plugin variant
const WorkerPlugin = majorVersionNum <= 4 ? WorkerPlugin4 : WorkerPlugin5;

// Export the plugin class reference to the outer world
export default WorkerPlugin;
