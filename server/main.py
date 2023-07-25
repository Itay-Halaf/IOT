from fastapi import FastAPI
import paho.mqtt.client as mqtt
import sys
import time

# while True:
#     time.sleep(11)
#     print('lol')
app = FastAPI()

client = mqtt.Client()

connection = client.connect("broker",1883,60)
if connection != 0:
    print("Could not connect to MQTT Broker!")
    sys.exit(-1)


@app.get("/api/{message}")
def shtok(message: str):
    print(f'sending {message}')
    client.publish("test/status", message, 0)
    return {"Something": "New"}