const Bistro = require('./index.js');
const inquirer = require('inquirer');

inquirer.prompt([
  {
    message: 'Which backend do you need?',
    name: 'server',
    type: 'list',
    choices: ['Express', 'Hapi', 'Koa']
  },
  {
    message: 'Which frontend do you need?',
    name: 'frontend',
    type: 'list',
    choices: ['Angular', 'Vue', 'React']
  },
  {
    message: 'What build tools do you need?',
    name: 'buildTools',
    type: 'checkbox',
    choices: ['Gulp', 'Grunt', 'Rollup', 'Webpack'],
    default: ['Webpack']
  }
]).then(answers=>new Bistro(answers).cook());
