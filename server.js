const config = {
    port: 3000,
    client: [
        "http://localhost:8080"
    ]
};

const {
    v4: uuidv4
} = require('uuid');
var path = require('path');
var express = require('express');
var app = express();
app.use(express.static(path.join(__dirname, 'public')));


var http = require('http').createServer(app);
var socketIO = require('socket.io');
var socket = socketIO(http, {
    cors: {
        origin: config.client,
    },
});
// APP_ID for security, After running, you'll get APP-ID 
// and copy APP-ID to your notifly client
var APP_ID = 'ID-' + uuidv4();

socket.on('connection', (event) => {
    console.log('Connected');

    event.on('disconnect', () => {
        console.log('disconnected');
    });

    event.on(APP_ID + '-notifly', req => {
        socket.emit(req.channel + '-' + req.event, req.data);
    });
});

http.listen(config.port, () => {
    console.log('Notifly APP ID : ' + APP_ID);
    console.log('Server started');
});
