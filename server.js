const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const controllers = require('./controllers');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(morgan('dev'));

app.use('/api', controllers.apiV1);

app.get('/', (req, res) => {
    return res.json({
        "message": "Welcome! Hit the /api endpoint with a 'url': 'https://site.com' pair for a shortened url!",
    })
})

app.listen(PORT, () => {
    console.log("Server up and listening on port: " + PORT);
})
