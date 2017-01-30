const boxd = require('boxd');
const nunjucks = require('nunjucks');

var raw = `{
  "name": "{<appName>}",
  "description": "{<description>}",
  "dependencies": {
    "{<server | lower>}": "*"
  },
  "devDependencies": {
  }
}
`;

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

    var result = this.nj.renderString(raw, this.vars);
    console.log(result);
  }
}

module.exports = Bistro;
