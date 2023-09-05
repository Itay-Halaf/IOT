import sys
import paho.mqtt.client as mqtt
import requests
import json
from DB import fire as db

IGAL = "list"
ramzor_list = IGAL

APILINK = "localhost"
PORTNUM = "8002"
url = f"http://{APILINK}:{PORTNUM}/crossroads/create"

def create(self):
    name = self.name_bar.text()
    dict_body = {'name': name,'latitude':float(self.latitude_bar.text()),'longitude':float(self.longitude_bar.text()),'light':self.light_bar.text()}
    print(json.dumps(dict_body))
    response = requests.post(url=url,json=dict_body, allow_redirects=False)
    try:
        response.raise_for_status()
        db.updateBrokerDB(name, f"Created {name} ")
    except Exception as e:
        print(f"Error occurred: {e}")
        return