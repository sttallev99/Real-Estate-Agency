const express = require('express');

const expressConfig = require('./config/expressConfig');
const hbsConfig = require('./config/hbsConfig');
const { PORT } = require('./constants');
const routes = require('./routes');
const { initDatabase } = require('./config/DBConfig')

const app = express();

hbsConfig(app);
expressConfig(app);

app.use(routes);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`The app is running on port http://localhost:${PORT}...`));
    })
    .catch(err => {
        console.log('Cannot connect to database', err)
    })
