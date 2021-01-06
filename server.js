const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const controllers = require('./controllers');
const expressMongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();

const PORT = process.env.PORT || 8080;

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(expressMongoSanitize());
app.use(express.json());

app.get('/', (req, res) => { // defualt route to be replaced with a static homepage with instructions on how to use
    return res.json({
        "message": "Welcome!",
    })
})

app.use('/', controllers.apiV1); // handles our api routes

module.exports = app.listen(PORT, () => {
    console.log(`Server up and listening on port ${PORT}...`);
})
