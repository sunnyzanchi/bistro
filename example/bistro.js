const Bistro = require('../index.js');
const inquirer = require('inquirer');

inquirer.prompt([
  {
    message: 'What\'s your app\'s name?',
    name: 'appName',
    type: 'input'
  },
  {
    message: 'What\'s your app\'s description?',
    name: 'description',
    type: 'input'
  },
  {
    message: 'Which backend do you need?',
    name: 'server',
    type: 'list',
    choices: ['Express', 'Hapi', 'Koa']
  }
]).then(answers=>new Bistro(answers).cook());
