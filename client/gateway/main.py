import json
from asyncio_paho import AsyncioPahoClient
import socketio
import asyncio
import aiohttp_cors
import asyncio_paho.client as ap
from aiohttp import web

asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def on_connect(client: ap.AsyncioPahoClient, userdata, flags, rc):
    if rc == 0:
        print("Connected to MQTT Broker")
        
        client.subscribe("TrafficLight")
        client.subscribe("crossroads")
        # Subscribe to topics
        # client.subscribe("topic")
    else:
        print("Failed to connect to MQTT Broker")

async def send_socket(payload: bytes):
    print(f'emitting socket... payload: {payload}')
    await sio.emit('myevent', payload.decode('UTF-8'), namespace='/sockets')
    print('finished')

async def on_message_async(client, userdata, msg):
    # Handle incoming MQTT messages here
    print('message received...')
    await send_socket(msg.payload)

task: asyncio.Task
sio = socketio.AsyncServer(async_mode='aiohttp', cors_allowed_origins='*')

async def run():
        client = AsyncioPahoClient("Smartersection gateway")
        client.asyncio_listeners.add_on_connect(on_connect)
        client.asyncio_listeners.add_on_message(on_message_async)
        await client.asyncio_connect("localhost", 1883, 60)

async def on_startup(app: web.Application):
    print('startup running')
    sio.attach(app)
    loop = asyncio.get_running_loop()
    loop.create_task(run())

@sio.event
async def light_changed(sid, data):
    sio.emit('myevent', {'data': 'foobar'})

@sio.on('connect', namespace='/sockets')
async def connect(sid, environ, auth):
    print('connect ', sid)

@sio.on('disconnect', namespace='/sockets')
async def disconnect(sid):
    print('disconnect ', sid)

app = web.Application()
app.on_startup.append(on_startup)


if __name__ == '__main__':
    web.run_app(app, port=12345)
