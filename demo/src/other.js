var listReceivedMessage = document.getElementById('listReceivedMessage');
var btnSend = document.getElementById('btnSend');
var txtMessage = document.getElementById('txtMessage');

import Notifly from './notifly.js';

var notifly = new Notifly({
    appId:'ID-9dYfz1n2Gwymp8UiSN57V8ofgGFln9'
});
// is same as pusher.subscribe('channelName')
notifly.subscribe('ch-2');

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