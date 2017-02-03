{# Hapi Server #}
{% if server === 'Hapi' %}
  const Hapi = require('hapi');
  const server = new Hapi.Server(3000);

  server.route({
    method: 'GET',
    path: '/',
    handler(request, reply){
      reply('Welcome to {<appName>} on Hapi!');
    }
  });

  server.start(err => {
    if(err) throw err;

    console.log(`Server running at ${server.info.uri}`);
  });
{% endif %}
{# Express Server #}
{% if server === 'Express' %}
  const express = require('express');
  const app = express();

  app.get('/', function(req, res){
    res.send('Welcome to {<appName>} on Express!')
  });

  app.listen(3000, function(){
    console.log('Server running');
  });
{% endif %}
{# Koa Server #}
{% if server === 'Koa' %}
  const koa = require('koa');
  const app = koa();

  app.use(function *(){
    this.body = 'Welcome to {<appName>} on Koa!';
  });

  app.listen(3000);
{% endif %}
