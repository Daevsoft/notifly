const config = {
    port:3000,
    client:[
        "http://localhost:8080"
    ]
};

var http = require('http').createServer();
var socketIO = require('socket.io');
var socket = socketIO(http, {
    cors: {
      origin: config.client,
    },
  });
// Create your own SECRET_KEY for security generate
// and it's up to you to generate
var event_secret = 'ID-9dYfz1n2Gwymp8UiSN57V8ofgGFln9';

socket.on('connection', (event) => {
    console.log('Connected');

    event.on('disconnect', () => {
        console.log('disconnected');
    });

    event.on(event_secret + '-notifly', req => {
        socket.emit(req.channel + '-' + req.event, req.data);
    });
});

http.listen(config.port, () => {
    console.log('Notifly started : http://localhost:' + config.port);
});