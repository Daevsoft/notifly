# Notifly For CodeIgniter Developers
Notifly works on php CodeIgniter
## Run Node Server
Run your `node run server`
## Copy Paste NotiflyHelper
Copy paste `NotiflyHelper_helper.php` file into CodeIgniter helper directory usually is `application/helpers/..`
## Configure Notifly
When server running it will generate Notifly APP ID
```terminal
Notifly APP ID : ID-0u0809-91as3-a324a-43f4-98a6e83bf312f
Notifly SECRET KEY : YourSecretKey
Server started
```
then copy paste a Notifly App ID into your config.php
Example :
```php
// config for notifly
$config['NOTIFLY_HOST'] = 'https://yourdomain.com';
$config['NOTIFLY_PORT'] = '3000';
$config['NOTIFLY_APP_ID'] = 'ID-0u0809-91as3-a324a-43f4-98a6e83bf312f';
$config['NOTIFLY_SECRET_KEY'] = 'YourSecretKey';
$config['NOTIFLY_IS_VERIFY'] = TRUE;
```
Add on your constructor class(`controller` or `model`) where you want to call it
```php
public function __construct() {
    ...
    $this->load->library('NotiflyHelper');
}
```
## Trigger Notifly
Then trigger notifly server
```php
$data = 'hello world'; // you can pass value with String or Array
NotiflyHelper::send('channelName', 'eventName', $data);
```
OR using object
```php
$data = 'hello world'; // you can pass value with String or Array

$notifly = new NotiflyHelper();
$notifly->push('channelName', 'eventName', $data);
```
It doesn't works? Check your NOTIFLY_APP_ID in your client script.<br/>
And happy coding!<br/>
