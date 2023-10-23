'use strict';

const logPolicy = async (request, h) => {
  
  // request.server.log(['policy', 'info'], 'Log come on pre response');
  const currentUrl = request.url.href;
  const currentPath = request.url.pathname;
  const responseStatus = request.response;


  request.server.log("requestLog", currentUrl +" "+ currentPath +" "+ responseStatus)
  return h.continue;
};
logPolicy.applyPoint = 'onPreResponse';
module.exports = logPolicy;
