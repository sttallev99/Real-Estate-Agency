express = require('express');


const app = express();

require('./config/hbsConfig.js')(app);
require('./config/expressConfig.js')(app);

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(5000, () => console.log(`The app is running on http://localhost:${5000}`));