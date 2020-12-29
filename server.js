const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const controllers = require('./controllers');
require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => { // defualt route to be replaced with a static homepage with instructions on how to use
    return res.json({
        "message": "Welcome!",
    })
})

app.use('/', controllers.apiV1); // handles our api routes

app.listen(PORT, () => {
    console.log(`Server up and listening on port ${PORT}...`);
})
