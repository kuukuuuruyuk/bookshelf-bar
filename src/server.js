'use strict';

const Path = require('path');
const Hapi = require('@hapi/hapi');
const Handlebars = require('handlebars');
const serverRouters = require('./server-routers');

const init = async () => {
  const server = Hapi.server({port: 5000, host: 'localhost'});
  await server.register(require('@hapi/vision'));
  server.views({
    engines: {html: Handlebars},
    relativeTo: Path.resolve(__dirname),
    path: Path.resolve(__dirname + '/templates'),
    layoutPath: Path.resolve(__dirname + '/templates/layout'),
    helpersPath: Path.resolve(__dirname + '/templates/helpers'),
    layout: true,
  });
  server.route(serverRouters);
  await server.start();
  console.log('Server berjalan pada port: %s', server.info.uri);
};

init();
