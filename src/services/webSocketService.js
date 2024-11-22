// src/stompService.js
import { Client } from "@stomp/stompjs";
import Cookies from "js-cookie";

class StompService {
  constructor() {
    this.client = null;
    this.callbacks = {};
    this.isConnect = false;
    this.subscriptions = {};
  }

  connect(url, onConnectCallback) {
    const socketUrl = `${url}`;

    this.client = new Client({
      brokerURL: socketUrl, 
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,

      onConnect: () => {
        console.log("Conectado a WebSocket");
        this.isConnect = true;
        this.processSubscriptions();

        if (onConnectCallback) {
          onConnectCallback();
        }
      },

      // Agregar el manejador de cierre de WebSocket
      onWebSocketClose: (event) => {
        console.log("WebSocket cerrado:");
        console.log(event);
      },

      onWebSocketError: (event) => {
        console.error("WebSocket error:");
        console.error(event);
      },
      onDisconnect: () => {
        console.log("Desconectado de WebSocket");
        this.isConnect = false;
      },
      onStompError: (frame) => {
        console.error("Error en STOMP: " + frame.headers["message"]);
      },
    });
    // Establecer las cabeceras STOMP personalizadas
    this.client.connectHeaders = {
      Authorization: `Bearer ${Cookies.get("authToken")}`,
    };

    this.client.activate();
  }

  disconnect() {
    if (this.client) {
      this.client.deactivate();
    }
  }

  subscribe(destination, callback) {

    this.client.subscribe(destination, (msg) => {
      console.log("OEOEOEO dentro de la sub");
      const message = JSON.parse(msg.body);
      callback(message);
    }, { Authorization: `Bearer ${Cookies.get("authToken")}` });
  }


  unsubscribe(destination) {
    if (this.subscriptions[destination]) {
      this.subscriptions[destination].unsubscribe();
      delete this.subscriptions[destination];
      delete this.callbacks[destination];
    }
  }

  processSubscriptions() {
    Object.keys(this.callbacks).forEach((destination) => {
      if (!this.subscriptions[destination]) {
        const callback = this.callbacks[destination];
        const subscription = this.client.subscribe(destination, (msg) => {
          const message = JSON.parse(msg.body);
          callback(message);
        });
        this.subscriptions[destination] = subscription;
      }
    });
  }

  publish(destination, message) {
    console.log("OEOEOEO en publish");
    if (this.isConnect) {
      console.log(`Enviando mensaje a ${destination}:`, message);
      this.client.publish({ destination, body: JSON.stringify(message) });
    } else {
      console.error(
        "No se puede enviar el mensaje. No está conectado al servidor WebSocket."
      );
    }
  }
}

export default StompService;
