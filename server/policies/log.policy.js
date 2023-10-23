'use strict';

const chalk = import("chalk").then(m=>m.default);

const logPolicy = async (request, h) => {
  const logMessage = `${request.method.toUpperCase()} ${request.server.info.protocol}://${request.info.host}${request.path} ${request.response.output.statusCode}`;
  
  console.log((await chalk).yellow(logMessage))
  request.server.log("requestLog", logMessage);

  return h.continue;
};
logPolicy.applyPoint = 'onPreResponse';
module.exports = logPolicy;
