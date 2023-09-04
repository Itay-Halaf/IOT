from fastapi import FastAPI
import paho.mqtt.client as mqtt
import sys
from contextlib import asynccontextmanager
import time
import logging
import asyncio as ai

def on_message(client,userdata,message):
    print("Message recieved: " + str(message.payload.decode("utf-8")))
    print('Topic: ' + str(message.topic))
    logging.log(logging.INFO, message)


def sub():
    client = mqtt.Client()
    try:
        topic = "test/status"

        client.subscribe(topic)
        client.loop_start()

        client.on_message = (on_message) #lambda client, userdata, message:print(message)

        logging.log(logging.INFO, "Subscriber has been started successfully..")
        connection = client.connect("broker",1883,60)
        if connection != 0:
            print("Could not connect to MQTT Broker!")
            sys.exit(-1)
        while connection == 0:
            pass
    except KeyboardInterrupt:
        print("interrrupted by keyboard")
        client.disconnect() # disconnect from broker
    print("This is a print pashut")

    client.disconnect()

# sub()

async def test_method():
    while True:
        print('Thread is running..')
        await ai.sleep(2)

@asynccontextmanager
async def lifespan(app: FastAPI):
    ai.create_task(test_method())
    yield
    
app = FastAPI(lifespan=lifespan)

@app.get("/api/{message}")
def shtok(message: str):
    return {"Something": "New"}