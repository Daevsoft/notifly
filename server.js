const fs = require("fs");
// use https for SSL
const http = require('https');
const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

const config = {
    port: 3000,
    client: [
        'http://localhost'// "https://www.yourdomain.com"
    ],
    /* for using SSL
    ssl:{
        key: fs.readFileSync('../../ssl/your_certificate.key'),
        cert: fs.readFileSync('../../ssl/your_certificate.crt'),
        ca: fs.readFileSync('../../ssl/your_certificate.cert'),
    }, */
    socket: {
        cors: {
            origin: 'http://localhost',// "https://www.yourdomain.com"
        },
    }
};

let server = http.createServer( /* config.ssl, */ app);
let socketIO = require('socket.io');
let socket = socketIO(server, config.socket);

// APP_ID for security, After running, you'll get APP-ID 
// and copy APP-ID to your notifly client
const APP_ID = 'ID-' + uuidv4();
const SECRET_KEY = 'carimontir_!2021';

app.use(
  express.urlencoded({
    extended: true
  })
);

app.use(express.json());
app.post('/io', (req, res) => {
    if((typeof req.body) === 'object' && req.body.app_id !== null){
        if(req.body.app_id === (APP_ID + '-' + SECRET_KEY)){
            socket.emit(req.body.channel + '-' + req.body.event, req.body.data);
        }
    }
    res.write("success");
    res.end();
});

socket.on('connection', (event) => {
    console.log('Connected');

    event.on('disconnect', () => {
        console.log('disconnected');
    });

    event.on(APP_ID + '-notifly', req => {
        socket.emit(req.channel + '-' + req.event, req.data);
    });
});

server.listen(config.port, () => {
    console.log('Notifly APP ID : ' + APP_ID);
    console.log('Notifly SECRET KEY : ' + SECRET_KEY);
    console.log('Server started');
});
