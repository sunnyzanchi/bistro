const boxd = require('boxd');
const fs = require('fs');
const nunjucks = require('nunjucks');
const path = require('path');
const glob = require('glob');

class Bistro{
  constructor(vars){
    // Any vars needed for interpolation
    this.vars = vars;

    // nunjuck instance used for rendering
    this.nj = nunjucks.configure({
      trimBlocks: true,
      lstripBlocks: true,
      tags: {
        blockStart: '{$',
        blockEnd: '$}',
        variableStart: '{<',
        variableEnd: '>}'
      }
    });
  }

  // Config
  njConfig(opts){
    if(typeof opts !== 'undefined')
      this.nj = nunjucks.configure(opts);
    return this;
  }

  // Render everything
  cook(){
    console.log(boxd([' ★ Welcome to Bistro! ★ ', 'v0.1.0'], {centered: true}));

    glob('./recipe/**', {nodir: true}, interpolate.bind(this));

    function interpolate(err, files){
      if(err) throw err;

      for(let file of files){
        this.nj.render(path.resolve(file), this.vars, function(err, res){
          console.log(res);

          //TODO: write files out with the same directory structure
        });
      }
    }
  }
}

module.exports = Bistro;
