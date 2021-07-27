# Notifly For Laravel Developer
Notifly works on php laravel
## Run Node Server
Run your `node server_secure.js`
## Copy Paste NotiflyHelper
Coy paste `NotiflyHelper.php` file into laravel helper directory usually is `app/helpers/..`
## Configure Notifly
When server running it will generate Notifly APP ID
```terminal
Notifly APP ID : ID-0u0809-91as3-a324a-43f4-98a6e83bf312f
Server started
```
then copy paste a Notifly App ID into your ENV laravel
Example :
```ENV
NOTIFLY_APP_ID=ID-0u0809-91as3-a324a-43f4-98a6e83bf312f
NOTIFLY_HOST=https://www.mydomain.com
NOTIFLY_PORT=3000
```
Add on top php file where you want to call it
```php
use App/Helpers/NotiflyHelper; 
```
## Trigger Notifly
Then trigger notifly server
```php
$data = 'hello world'; // you can pass value with String or Array
NotiflyHelper::push('channelName', 'eventName', $data);
```
It doesn't works? Check your NOTIFLY_APP_ID in your client script.<br/>
And happy coding!<br/>
<br/>
Author : Muhamad Deva Arofi
