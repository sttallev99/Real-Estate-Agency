const { engine } = require('express-handlebars');
const path = require('path');

function hbsConfig(app) {
    app.engine('hbs', engine({
        extname: 'hbs'
    }));
    app.set('view engine', 'hbs');
    app.set('views', path.resolve(__dirname, "../views"));

}

module.exports = hbsConfig;