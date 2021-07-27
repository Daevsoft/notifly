<?php
namespace App\helpers;

class NotiflyHelper {
    private static $app_id = NULL;
    private static $host = NULL;

    private static function getHost(){
        if(self::$host == null)
            self::$host = env('NOTIFLY_HOST', url()).':'.env('NOTIFLY_PORT', '3000');
        return self::$host;
    }

    public static function getId(){
        if(self::$app_id == null)
            self::$app_id = env('NOTIFLY_APP_ID');
        return self::$app_id;
    }
    private static function initContent($channel, $event, $data){
        return json_encode([
            'app_id' => self::getId(),
            'channel' => $channel,
            'event' => $event,
            'data' => is_array($data) ? json_encode($data) : $data
        ]);
    }
    private static function getOptions($data_string = NULL, $is_verify = false){
        return array(
            'http' => array(
                'method'  => 'POST',
                'content' => $data_string,
                'header'=>  ["Content-Type: application/json",
                            "Accept: application/json"]
            ),
            "ssl"=>array(
                "verify_peer"=> $is_verify,
                "verify_peer_name"=> $is_verify,
            ),
        );
    }
    private static function post($url, $content){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS,$content);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json",
            "Accept: application/json",
        ]);
        $page = curl_exec($ch);
        curl_close($ch);
        return $page;
    }
    public static function push($channel, $event, $data)
    {
        $content = self::initContent($channel, $event, $data);
        $url = self::getHost().'/io';
        $options = self::getOptions($content);
        $context  = stream_context_create( $options );
        $result = self::post( $url, $content );
        return $result;
    }
}
