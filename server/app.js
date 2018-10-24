'use strict';
const PORT = process.env.PORT || 8080;
const isProd = process.env.NODE_ENV === 'production';

const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');

const buildPageMiddleware = require('./middlewares/build-page');

mustache.tags = ['{template:"', '"}'];
const paths = ['/'];

const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .get('/ping', (req, res) => {
        res.end();
    })
    .engine('mustache', mustacheExpress())
    .set('view engine', 'mustache')
    .set('views', __dirname + '/../client/pages-template/')
    .use('/build', express.static('build'));

app
    .get(paths, [buildPageMiddleware])
    .use((req, res) => {
        res.sendStatus(404);
    })
    .use((err, req, res, next) => {
        res.sendStatus(500);
    });

const server = app.listen(PORT, () => {
    console.log(`Server listen ${PORT} port`);
});

module.exports = server;
