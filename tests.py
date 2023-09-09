from asyncio_paho import AsyncioPahoClient
import asyncio_paho.client as ap
import asyncio

asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def on_connect_async(client, userdata, flags_dict, rc):
    if rc == 0:
        print('connected yo')

async def run():
    async with AsyncioPahoClient() as client:
        await client.asyncio_connect("localhost", 1883, 60)
        client.asyncio_listeners.add_on_connect(on_connect_async)
        await client.asyncio_publish("crossroads", 'Tettt')

loop = asyncio.new_event_loop()
loop.run_until_complete(run())