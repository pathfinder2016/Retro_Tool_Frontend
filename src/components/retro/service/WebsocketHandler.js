import {Message} from 'element-ui';

export default class WebsocketHandler {
  socket = {}

  static initWebsocket(url, callback) {
    if (WebsocketHandler.isBrowserSupportWebsocket()) {
      this.socket = new WebSocket(url)
      this.socket.onopen = WebsocketHandler.onopen
      WebsocketHandler.onmessage(callback)
      this.socket.onclose = WebsocketHandler.onclose;
      this.socket.onerror = WebsocketHandler.onerror;
    }
  }

  static onmessage(callback) {
    this.socket.onmessage = (message) => {
      console.dir("Received message: " + message)
      callback(JSON.parse(message.data))
    }
  }

  static send(message) {
    console.log('Send message : ' + message)
    this.socket.send(message)
  }

  static onopen() {
    console.log('Websocket connect successful')
  }

  static onclose() {
    console.log("Websocket closed")
    this.socket.close()
  }

  static onerror(e) {
    console.dir(e)
    this.socket.close()
  }

  static isBrowserSupportWebsocket() {
    if ('undefined' === typeof (WebSocket)) {
      Message.error('Your current browser not support websocket, please use another browser')
      return false
    }
    return true;
  }
}
