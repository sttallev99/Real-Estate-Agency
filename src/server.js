const express = require('express');

const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');
const { PORT } = require('./constants');
const routes = require('./routes');

const app = express();

hbsConfig(app);
expressConfig(app);

app.use(routes);

app.listen(PORT, () => console.log(`The app is running on port http://localhost:${PORT}...`));