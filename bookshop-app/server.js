const cds = require('@sap/cds');
const log = require('cf-nodejs-logging-support');

cds.on('bootstrap', app => {
  log.setLoggingLevel('info');
  app.use(log.logNetwork);
});

module.exports = cds.server;
