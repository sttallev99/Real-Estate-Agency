express = require('express');

const { PORT }= require('./constants.js');
const routes = require('./routes.js');
const { initDatabase } = require('./config/databaseConfig.js');


const app = express();

require('./config/hbsConfig.js')(app);
require('./config/expressConfig.js')(app);
app.use(routes);

initDatabase()
    .then(() => {
        app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}`));
    })
    .catch(err => {
        console.log('Cannot connect to database:', err);
    })