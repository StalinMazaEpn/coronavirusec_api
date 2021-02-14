const express = require('express');
const app = express();
const { port } = require('../config');
const cors = require('cors');
let routes = require('../routes');

app.get("/", function (req, res) {
    res.json(`Api Server works correctly on domain: ${req.hostname}`)
});

app.use('/api', routes);
app.use(cors());
app.options('*', cors());
app.listen(port);

console.log(`API ROUTES is running on http://localhost:${port}`);
module.exports = app;