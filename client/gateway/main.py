import socketio
import asyncio
import aiohttp_cors
import paho.mqtt.client
from aiohttp import web

def on_connect(self, client, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker")
        # Subscribe to topics
        # client.subscribe("topic")
    else:
        print("Failed to connect to MQTT Broker")

def on_message(self, client, userdata, msg):
    # Handle incoming MQTT messages here
    pass

task: asyncio.Task
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')
async def run():       
    client = paho.mqtt.Client("Smartersection gateway")
    client.on_connect = on_connect
    client.on_message = on_message
    client.connect("localhost", 1883, 60)

@sio.event
async def light_changed(sid, data):
    sio.emit('myevent', {'data': 'foobar'})

@sio.on('connect', namespace='/sockets')
async def connect(sid, environ, auth):
    global task
    loop = asyncio.get_running_loop()
    task = loop.create_task(run())
    print('connect ', sid) 

@sio.on('disconnect', namespace='/sockets')
async def disconnect(sid):
    task.cancel()
    print('disconnect ', sid)

app = web.Application()

sio.attach(app)

if __name__ == '__main__':
    web.run_app(app, port=12345)
