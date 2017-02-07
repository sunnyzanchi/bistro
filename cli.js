#!/usr/bin/env node

const boxd = require('boxd');
const chalk = require('chalk');
const cols = require('columnify');
const fs = require('fs');
const inquirer = require('inquirer');
const mkdirp = require('mkdirp');
const os = require('os');
const path = require('path');
const pkg = require('./package.json');
const sanitize = require('sanitize-filename');

const args = require('minimist')(process.argv.slice(2));

// All commands
const cmd = {
  /* Create a new recipe to be used later */
  create({_: args}){
    args.shift();
    const home = path.join(os.homedir(), 'bistro');

    if(args.length) createRecipe({name: args[0]});
    else{
      inquirer.prompt([{
        message: 'Enter your recipe\'s name',
        name: 'name',
        type: 'input',
        filter: sanitize
      }]).then(createRecipe);
    }

    function createRecipe({name}){
      const recipePath = path.join(home, name);

      if(fs.existsSync(recipePath)){
        console.log('A recipe already exists with this name!');
        console.log('Use bistro' + chalk.cyan(' update') + ' [name] to update it');
        return;
      }
      mkdirp(path.join(home, name));
    }
  },

  /* Use the saved recipe and generate a new project */
  cook({_: args}){
    args.shift();
    const home = path.join(os.homedir(), 'bistro');

    if(args.length){
      console.log(args);
    }
    else{
      const recipes = fs.readdirSync(home);
      inquirer.prompt([
        {
          message: 'What would you like today?',
          name: 'recipe',
          type: 'list',
          choices: recipes
        }
      ]).then(answers=>{});
    }
  },

  /* Update an already created recipe */
  update(){

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
      '-v --version': 'Diplay version and exit',
      '-s --silent': 'Don\'t display output'
    };

    console.log(cols(text,  {showHeaders: false, maxWidth: process.stdout.columns - 13}));
  }
};

// Version
if(args.v || args.version){
  console.log(pkg.version);
  process.exit();
}

if(!args.s && !args.silent) // Silent flag
  console.log(boxd([' ★ Welcome to Bistro! ★ ', 'v' + pkg.version],
                  {centered: true, consoleCentered: true}));

// Check if command exists
if(cmd[args._[0]]) cmd[args._[0]](args);

// If it doesn't, show help message
else cmd.help();
