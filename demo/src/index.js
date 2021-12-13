var listReceivedMessage = document.getElementById('listReceivedMessage');
var btnSend = document.getElementById('btnSend');
var txtMessage = document.getElementById('txtMessage');

import Notifly from './notifly.js';

var notifly = new Notifly({
    url:'http://localhost',
    appId:'ID-78fcd518-ff6e-4303-8792-07acb8ec694c'
});
// is same as pusher.subscribe('channelName')
notifly.subscribe('ch-1');

// is same as pusher.bind('eventName', callback)
notifly.bind('send-hello', function(data) {
    listReceivedMessage.innerHTML += '<li>'+ data +'</li>';
});


btnSend.addEventListener('click', function(){
    
    var txtChannel = document.getElementById('txtChannel');
    var txtMessage = document.getElementById('txtMessage');

    var otherChannel = txtChannel.value;
    var message = txtMessage.value;

    // this is for trigger to the other channel with event
    // is same as pusher.trigger('channelName', 'eventName', data);
    notifly.trigger(otherChannel, 'send-hello', message);
    
    // clear message
    txtMessage.value = '';
});