express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('test');
});

app.listen(5000, () => console.log(`The app is running on http://localhost:${5000}`))