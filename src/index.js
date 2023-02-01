express = require('express');

const { PORT }= require('./constants.js');
const routes = require('./routes.js');


const app = express();

require('./config/hbsConfig.js')(app);
require('./config/expressConfig.js')(app);
app.use(routes);


app.listen(PORT, () => console.log(`The app is running on http://localhost:${PORT}`));