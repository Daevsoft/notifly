import {} from 'https://cdn.socket.io/3.1.3/socket.io.min.js';

class Notifly {
    socket = null;
    channel = null;
    config = {
        appId: null
    };
    constructor(options) {
        options.socket_address = options.url || 'http://localhost:3000';
        this.socket = io(options.socket_address, {
            autoConnect: true
        });
        this.config.appId = options.appId;
    }
    subscribe(channel) {
        this.channel = channel;
    }
    bind(eventName, callback) {
        this.socket.on(this.channel + '-' + eventName, callback);
    }
    trigger(channel, eventName, data) {
        this.socket.emit(this.config.appId + '-notifly', {
            channel: channel,
            event: eventName,
            data: data
        });
    }
    unsubscribe() {
        if(null !== this.socket && this.socket.connected){
            this.socket.disconnect();
            this.channel = null;
        }
    }
}
export default Notifly;
