'use strict';

const db = require('mongoose');
const Glob = require('glob');
const Bluebird = require('bluebird'); // You need to import Bluebird
const { MongoClient } = require("mongodb");

db.Promise = Bluebird;

let dbConn = null;


module.exports.plugin = {
  name: 'mongoose_connector',
  version: require('../../package.json').version,

  async register(server, options) {
    try {
      
      
      // const Conn =  new MongoClient(options.connections.db);
      // const urlArray = options.connections.db.split('/')
      
      
      // // getting database from databse url
      // dbConn =  Conn.db(urlArray[urlArray.length - 1])
      
      // // When the connection is connected
      // Conn.on('connected', () => {
      //   server.log(['mongoose', 'info'], 'Mongo Database connected');
      // });
    
      // // When the connection is disconnected
      // Conn.on('disconnected', () => {
      //   server.log(['mongoose', 'info'], 'Mongo Database disconnected');
      // });
    

      // // If the node process ends, close the mongoose connection
      // process.on('SIGINT', async () => {
      //   try {
      //     await Conn.close();
          
      //     server.log(
      //       ['mongoose', 'info'],
      //       'Mongo Database disconnected through app termination'
      //     );
      //   } catch (err) {
      //     server.log(
      //       ['mongoose', 'error'],
      //       'Error while disconnecting MongoDB: ' + err
      //     );
      //   }
      //   process.exit(0);
      // });

      // // Load models
      // const models = Glob.sync('server/models/*.js');
     
      
      // models.forEach((model) => {
      //   require(`${process.cwd()}/${model}`);
      // });
    } catch (err) {
      server.log(['mongoose', 'error'], 'Error during MongoDB setup: ' + err);
      throw err;
    }
  },

  dbConn() {
 
    return dbConn;
  
  },
};
