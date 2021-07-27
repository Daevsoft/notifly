# notifly
Socket IO Client like Pusher Client. Simple &amp; Awesome

## Getting started
Run your socket server
``npm run server``

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
``Note the appId is same as APP-ID in server.js file on node``
```javascript
...
import Notifly from './notifly.js';

var notifly = new Notifly({
    appId:'ID-9dYfz1n2Gwymp8UiSN57V8ofgGFln9'
});
...
```
Or embed with script tag
```html
<script src="./notifly.min.js"></script>
<script>
    var notifly = new Notifly({
        appId:'ID-9dYfz1n2Gwymp8UiSN57V8ofgGFln9'
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
