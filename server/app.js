'use strict';
const PORT = process.env.PORT || 8080;
const isProd = process.env.NODE_ENV === 'production';

const express = require('express');
const bodyParser = require('body-parser');
const mustache = require('mustache');
const mustacheExpress = require('mustache-express');
// const multer = require('multer');
// const path = require('path');

const buildPageMiddleware = require('./middlewares/build-page');

mustache.tags = ['{template:"', '"}'];
const paths = ['/'];

/* const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.resolve(process.cwd(), './images/'));
    },
    filename: (req, file, callback) => {
        callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
    }
});
 */
// var upload = multer({storage}).array('imgUploader', 2);

const app = express()
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: true}))
    .get('/ping', (req, res) => {
        res.end();
    })
    .post('/api/upload', (req, res) => {
        console.log(req);
        res.status(200).send();
        /* upload(req, res, (error) => {
            console.log(res);
            if (error) {
                return res.status(500).send(JSON.stringify({error}));
            }
            return res.status(200).end();
        }); */
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
