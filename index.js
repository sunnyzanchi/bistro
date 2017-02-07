const fs = require('fs');
const nunjucks = require('nunjucks');
const path = require('path');
const glob = require('glob');
const mkdirp = require('mkdirp');

class Bistro{
  constructor(vars){
    // Any vars needed for interpolation
    this.vars = vars;

    // nunjuck instance used for rendering
    this.nj = nunjucks.configure({
      trimBlocks: true,
      lstripBlocks: true,
      tags: {
        variableStart: '{<',
        variableEnd: '>}'
      }
    });
  }

  /* Pass config to nunjucks */
  njConfig(opts){
    if(typeof opts !== 'undefined')
      this.nj = nunjucks.configure(opts);
    return this;
  }

  /* Render everything */
  cook(){
    glob('./recipe/**', {nodir: true}, interpolate.bind(this));

    function interpolate(err, files){
      if(err) throw err;

      for(let file of files){
        this.nj.render(path.resolve(file), this.vars, function(err, res){
          if(err) return err;

          file = file.replace('./recipe/', '');

          var dir = path.dirname(file)
          mkdirp(dir, function(err){
            if(err) throw(err);

            fs.writeFile(file, res, 'utf8', function(err){
              if(err) throw err;
            });
          });
        });
      }
    }
  }
}

module.exports = Bistro;
