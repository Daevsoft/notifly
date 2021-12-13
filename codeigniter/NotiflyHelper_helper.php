<?php
class NotiflyHelper {
    private $app_id = NULL;
    private $host = NULL;
    private $port = NULL;
    private $secret_key = NULL;
    private $verify_ssl = FALSE;

    public function __construct() {
        $ci =& get_instance();
        $this->host         = $ci->config->item('NOTIFLY_HOST');
        $this->secret_key   = $ci->config->item('NOTIFLY_SECRET_KEY');
        $this->app_id       = $ci->config->item('NOTIFLY_APP_ID');
        $this->port         = $ci->config->item('NOTIFLY_PORT');
        $this->verify_ssl   = $ci->config->item('NOTIFLY_IS_VERIFY');
    }

    private function getHost(){
        return $this->host . ':' . $this->port;
    }

    public function getId(){
        return $this->app_id . '-' . $this->secret_key;
    }
    private function initContent($channel, $event, $data){
        return json_encode([
            'app_id' => $this->getId(),
            'channel' => $channel,
            'event' => $event,
            'data' => is_array($data) ? json_encode($data) : $data
        ]);
    }
    private function getOptions($data_string = NULL){
        return array(
            'http' => array(
                'method'  => 'POST',
                'content' => $data_string,
                'header'=>  ["Content-Type: application/json",
                            "Accept: application/json"]
            ),
            "ssl"=>array(
                "verify_peer"=> $this->verify_ssl,
                "verify_peer_name"=> $this->verify_ssl,
            ),
        );
    }
    private function post($url, $content){
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $content);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Content-Type: application/json",
            "Accept: application/json",
        ]);
        // echo $content;
        $page = curl_exec($ch);
        curl_close($ch);
        return $page;
    }
    public function push($channel, $event, $data)
    {
        $content = $this->initContent($channel, $event, $data);
        $url = $this->getHost().'/io';
        $options = $this->getOptions($content);
        $context  = stream_context_create( $options );
        $result = $this->post( $url, $content );
        return $result;
    }
    public static function send($channel, $event, $data)
    {
        if(self::$thisObj === NULL)
            self::$thisObj = new NotiflyHelper();

        $content = self::$thisObj->initContent($channel, $event, $data);
        $url     = self::$thisObj->getHost().'/io';
        $options = self::$thisObj->getOptions($content);
        $context = stream_context_create( $options );
        $result  = self::$thisObj->post( $url, $content );
        return $result;
    }
}