const express = require('express'); //server
const app = express(); //app server
const { port } = require('./config');
let routes = require('./routes');
// const { parseTable } = require('./lib/parseTable.js');

app.use('/', routes);
app.listen(port);

console.log(`API is running on http://localhost:${port}`);
module.exports = app;
