'use strict';

const db = require('mongoose');
const Glob = require('glob');
const Bluebird = require('bluebird'); 

db.Promise = Bluebird;

let dbConn = null;


module.exports.plugin = {
  name: 'mongoose_connector',
  version: require('../../package.json').version,

  async register(server, options) {
    try {
      
      dbConn = await db.createConnection(options.connections.db).asPromise()

    
      // When the connection is connected
      dbConn.on('connected', () => {
        server.log(['mongoose', 'info'], 'Mongo Database connected');
      });
    
      // When the connection is disconnected
      dbConn.on('disconnected', () => {
        server.log(['mongoose', 'info'], 'Mongo Database disconnected');
      });
    

      // If the node process ends, close the mongoose connection
      process.on('SIGINT', async () => {
        try {
          await dbConn.close();
          
          server.log(
            ['mongoose', 'info'],
            'Mongo Database disconnected through app termination'
          );
        } catch (err) {
          server.log(
            ['mongoose', 'error'],
            'Error while disconnecting MongoDB: ' + err
          );
        }
        process.exit(0);
      });

      // Load models
      const models = Glob.sync('server/models/*.js');
     
      
      models.forEach((model) => {
        require(`${process.cwd()}/${model}`);
      });
    } catch (err) {
      server.log(['mongoose', 'error'], 'Error during MongoDB setup: ' + err);
      throw err;
    }
  },

  dbConn() {
 
    return dbConn;
  
  },
};
