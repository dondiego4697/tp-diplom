'use strict';

const got = require('got');
const fs = require('fs');
const path = require('path');
const isProd = process.env.NODE_ENV === 'production';
// const HOST = isProd ? 'http://151.248.121.118' : 'http://localhost:8080';

const getStatusUrl = (id) => `http://gpu-external01.i.smailru.net:5000/result/${id}`;
const nodeMailer = require('nodemailer');
const user = 'dondiego4697@yandex.ru';

const smtpTransport = nodeMailer.createTransport({
    host: 'smtp.yandex.ru',
    port: 465,
    secure: true,
    auth: {
        user: user,
        pass: process.env.NODE_MAIL_PASS
    }
});


const dataSet = new Set();
setInterval(async () => {
    dataSet.forEach(async (value) => {
        const url = getStatusUrl(value.id);
        const response = await got.get(url);
        console.log(value.id, response.statusCode);
        if (response.statusCode === 200) {
            const imgPath = path.resolve(__dirname, `../../imgs/${value.id}.png`);
            got.stream(url).pipe(fs.createWriteStream(imgPath));
            sendEmail(value.mail, imgPath, value.id)
            dataSet.delete(value);
        }
    });
}, 60 * 60 * 1);

module.exports = (req, res) => {
    const {id, mail} = req.query;
    dataSet.add({
        id: id,
        mail: mail
    });
    res.send('ok');
};

const sendEmail = (mail, imgPath, id) => {
    smtpTransport.sendMail({
        from: user,
        to: mail,
        subject: 'Photo Style Transfer',
        text: ``,
        attachments: [
            {
                filename: 'result.png',
                path: imgPath,
                cid: id
            }
        ]
    }, (error, response) => {
        /* if (error) {
            console.log(error);
        } else {
            console.log('ok');
        } */
    });
};
