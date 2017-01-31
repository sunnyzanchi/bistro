#!/usr/bin/env node

const boxd = require('boxd');
const chalk = require('chalk');
const cols = require('columnify');
const inquirer = require('inquirer');
const pkg = require('./package.json');

const args = require('minimist')(process.argv.slice(2));

// All commands
const cmd = {
  /* Create a new recipe to be used later */
  create(){

  },

  /* Use the saved recipe and generate a new project */
  cook([recipe]){
    if(recipe) console.log(recipe);
    else
    inquirer.prompt([
      {
        message: 'What would you like today?',
        name: 'recipe',
        type: 'list',
        choices: ['Testing', 'Another test']
      }
    ]).then(answers=>{});
  },

  /* Show the options and commands */
  help(){
    const text = {
      'Commands': '',
      '--------': '',
      'create': 'Create a new recipe using the files from the current working directory',
      'cook [name]': 'Scaffold out a new application using the given recipe',
      '':'',
      'Options': '',
      '-------': '',
      '-v --version': 'Diplay version and exit'
    };

    console.log(cols(text,  {showHeaders: false, maxWidth: process.stdout.columns - 13}));
  }
};

// Version
if(args.v || args.version){
  console.log(pkg.version);
  return;
}

if(!args.s) // Silent flag
  console.log(boxd([' ★ Welcome to Bistro! ★ ', 'v' + pkg.version],
                  {centered: true, consoleCentered: true}));

// Check if command exists
if(cmd[args._[0]]){
  args._.slice(1);
  cmd[args._[0]](args);
}
// If it doesn't, show help message
else cmd.help();
