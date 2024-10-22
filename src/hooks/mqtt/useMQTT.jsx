import { useEffect, useState } from 'react';
import mqtt from "mqtt";

export const useMQTT = (topic) => {

  const [client, setClient] = useState(null);
  const [messages, setMessages] = useState([]);


  useEffect(() => {

    const options = {
      clean: true,
      connectTimeout: 10000,
      clientId: 'mqttjs_' + Math.random().toString(16),
    };
    
    const brokerUrl = 'wss://broker.emqx.io:8084/mqtt'
    const mqttClient = mqtt.connect(brokerUrl, options);

    setClient(mqttClient);

    mqttClient.on('connect', () => {
      console.log('Conectado al broker MQTT');
      mqttClient.subscribe(topic, (err) => {
        if (err) {
          console.error('Error al suscribirse:', err);
        } else {
          console.log(`Suscripción exitosa al tópico: ${topic}`);
        }
      });
    });

    mqttClient.on('message', (receivedTopic, message) => {
      if (receivedTopic === topic) {
        setMessages((prevMessages) => [...prevMessages, message.toString()]);
      }
    });

    mqttClient.on('error', (err) => {
      console.error('Error de conexión:', err);
      mqttClient.end();
    });

    return () => {
      if (mqttClient) {
        mqttClient.end();
      }
    };
  }, [ topic ]);


  // Función para publicar mensajes
  const publishMessage = (msg, pubTopic = topic) => {
    if (client ) {
      client.publish(pubTopic, msg);
    } else {
      console.error('No se puede publicar, cliente no conectado');
    }
  };

  return { client, messages, publishMessage,setMessages  };
};


