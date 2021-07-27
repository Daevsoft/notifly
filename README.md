# notifly
Socket IO Client like Pusher Client. Simple &amp; Awesome

## Getting started
Run your socket server
``npm run server``
When server running it will generate Notifly APP ID
```terminal
Notifly APP ID : ID-0u0809-91as3-a324a-43f4-98a6e83bf312f
Server started
```
## Tutorial
### HTML
Sample ``index.html`` file :
```html
<p id="guestMessage"></p>
<form action="">
    <label for="txtChannel">Send Message</label><br>
    <input type="text" id="txtChannel" placeholder="Other Channel"><br>
    <textarea id="txtMessage" placeholder="Message"></textarea><br>
    <button type="button" id="btnSend">Send message</button>
 </form>
<script src="./src/index.js" type="module"></script>
```
### Javascript
Then write a javascript file :
```javascript
var uiGuestMessage = document.getElementById('guestMessage');
var uiTxtMessage = document.getElementById('txtMessage');
var uiTxtChannel = document.getElementById('txtChannel');
var uiBtnSend = document.getElementById('btnSend');
...
```

Initialize Notifly instance :
``Note the appId is generated automatically when server.js was running, then copy paste into javscript client``
```javascript
...
import Notifly from './notifly.js';

var notifly = new Notifly({
    appId:'ID-0u0809-91as3-a324a-43f4-98a6e83bf312f'
});
...
```
Or embed with script tag
```html
<script src="./notifly.min.js"></script>
<script>
    var notifly = new Notifly({
        appId:'ID-0u0809-91as3-a324a-43f4-98a6e83bf312f'
    });
    ...
</script>
```
Subscribe client channel
```javascript
// it's like : pusher.subscribe('channelName')
notifly.subscribe('your-channel-name');
```
Bind event for action
```javascript
// it's like : pusher.bind('yourEventName', callback)
notifly.bind('send-message', function(data) {
    uiGuestMessage.innerHTML += `<span>${data}</span><hr/>`;
});
```
Trigger event to other channel
```javascript
...
uiBtnSend.addEventListener('click', function(){
      var otherChannel = uiTxtChannel.value;
      var message = uiTxtMessage.value;

      // this is for trigger to the other channel with event
      // it's like : pusher.trigger('channelName', 'eventName', data);
      notifly.trigger(otherChannel, 'send-message', message);

      // clear a text message
      uiTxtMessage.value = '';
});
```
Open your other channel in different session and try it !
Congrats your notifly should work now 😁!

## Run Demo
For demo sample you can run this command
``npm run web``
then open in your browser
http://localhost:8080

Happy Coding 😉!
