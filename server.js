'use strict';

require('module-alias/register');

const Glue = require('@hapi/glue');
const Glob = require('glob');
const serverConfig = require('./config/manifest');

// this is the line we mention in manifest.js
// relativeTo parameter should be defined here
const options = {
  ...serverConfig.options,
  relativeTo: __dirname,
};

// Start server
const startServer = async () => {
  try {
    const server = await Glue.compose(serverConfig.manifest, options);

    const services = Glob.sync('server/services/*.js');
    services.forEach((service) => {
      server.registerService(require(`${process.cwd()}/${service}`));
    });

    server.events.on('log',(event, tags) => {
      console.log(event)
      if (tags.error) {
          console.log(`Server error: ${event.error ? event.error.message : 'unknown'}`);
      }
  });

    await server.start();
    console.log(`Server listening on ${server.info.uri}`);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

startServer();
