const chalk = require('chalk');

const getNotes = require('./notes');

console.log(chalk.bold.inverse.rgb(10, 100, 200)('Hello!'));

console.log(getNotes());




