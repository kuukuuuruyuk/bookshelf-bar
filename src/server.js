'use strict';

const Hapi = require('@hapi/hapi');
const serverRouters = require('./server-routers');

const init = async () => {
  const server = Hapi.server({port: 5000, host: 'localhost'});
  server.route(serverRouters);
  await server.start();
  console.log('Server berjalan pada port: %s', server.info.uri);
};

init();
