const homeHandler = require('./home');
const staticFiles = require('./static-handler');
const catHandler = require('./cats');

module.exports = [catHandler, homeHandler, staticFiles, ];