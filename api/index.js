const express = require('express');
const app = express();
const { port } = require('../config');
let routes = require('../routes');

app.use('/api', routes);
app.listen(port);

console.log(`API is running on http://localhost:${port}`);
module.exports = app;