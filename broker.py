import paho.mqtt.client as mqtt
import sys
import time
import json

client = mqtt.Client("SmartIntersection")

connection = client.connect("localhost",1883,60)
if connection != 0:
    print("Could not connect to MQTT Broker!")
    sys.exit(-1)
else: print("Connected to broker")

def on_connect(client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker")
        # Subscribe to topics here if needed
    else:
        print(f"Failed to connect, return code: {rc}")

def on_message(client, userdata, message):
    # Callback for handling incoming messages on subscribed topics
    topic = message.topic
    payload = message.payload.decode("utf-8")
    print(f"Received message on topic '{topic}': {payload}")

def setup_mqtt_client():
    # Set up the MQTT client
    client.on_connect = on_connect
    client.on_message = on_message

    # Connect to the MQTT broker
    broker_address = "localhost"
    client.connect(broker_address, port=1883, keepalive=60)

def publish_dictionary_as_message(topic, data):
    json_message = json.dumps(data)
    client.publish(topic, json_message, qos=0)

def publish_message(topic, message):
    client.publish(topic, message, qos=0)
    return message


def subscribe_to_topic(topic):
    # Subscribe to a topic
    client.subscribe(topic)

setup_mqtt_client()


broker_host = "localhost"
topic = "intersection"
publish_message(topic, "Meow")
message_data = {"new ramzor" :{"light": "Green"}}
publish_dictionary_as_message(topic, message_data)
#subscribe_to_topic("test/status")

subscribe_to_topic(topic)


#shtok("Green")


client.loop_forever()