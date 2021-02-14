const express = require('express');
const app = express();
const { port } = require('./config');
let routes = require('./routes');
const cors = require('cors');

app.get("/", function (req, res) {
    res.json(`Main Server works correctly on domain: ${req.hostname}`)
});

app.use('/api', routes);
//enable cors
app.use(cors());
app.options('*', cors());
app.listen(port);

console.log(`API INDEX is running on http://localhost:${port}`);
module.exports = app;