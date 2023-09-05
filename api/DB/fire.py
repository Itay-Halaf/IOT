import json
import firebase_admin
from firebase_admin import credentials, db
from pydantic import BaseModel
from datetime import datetime


class TrafficLight(BaseModel):
    latitude: float
    longitude: float
    name: str
    light: str



traffic_lights_count = 1

cases_count = 0


def db_connect():    
    try:

        cred = credentials.Certificate(r'C:\repos\IOT\api\DB\serviceAccountKey.json')
        app = firebase_admin.initialize_app(cred, {
            'databaseURL': 'https://iot-smart-city-database-default-rtdb.europe-west1.firebasedatabase.app/'

        })

        print("Firebase Realtime Database.")
        return app
    except Exception as e:
        print("Error:", e)

app = db_connect()
ref = db.reference('py/')
crossroads_ref = ref.child('Crossroads')
cars_ref = ref.child('cars')
broker_ref = ref.child('broker')


# crossroads_ref.set({
#         "Main Street and Elm Avenue":{
#         "latitude": 37.12345,
#         "longitude": -122.67890,
#         "light": "Green",
#         "cases": 0
#         }
# })
# cars_ref.set({
#     "car_id_1": {
#         "model": "ferrari",
#         "location":"somewhere",
#         "speed":"100 KPH",
#     }
# })

# broker_ref.set({
#     "topic_name": {
#         "message": "content",
#         "time": datetime.now().strftime("%d/%m/%Y %H:%M:%S")
#     },
#     "new_topic_name": {
#         "message_number": "content",
#     },
# })


crossroads_data = crossroads_ref.get()



def getAllCrossroads():
    return crossroads_ref.get()

def getCrossroadByName(crossroad_name):
    try:
        snapshot = crossroads_ref.child(crossroad_name).get()
        return snapshot
    except Exception as e:
        print("Error fetching data from Firebase:", str(e))
        raise e  # Rethrow the error for handling elsewhere if needed
        return "something"
    

def changeCrossroadLight(tl):
    try:
        current_light = crossroads_ref.child(tl).get().get("light")
        if current_light == "Red":
            new_light = "Green"
        else:
            new_light = "Red"
        crossroads_ref.child(tl).update({"light": new_light})
        return {"status": "SUCCESS", tl : crossroads_ref.child(tl).get()}
    except Exception as e:
        print("Error updating data in Firebase:", str(e))
        raise e
    
def addCaseNumber(tl):
    try:
        current_case_number = crossroads_ref.child(tl).get().get("cases") + 1
        crossroads_ref.child(tl).update({"cases": current_case_number})
        return {"status": "SUCCESS", tl : crossroads_ref.child(tl).get()}
    except Exception as e:
        print("Error updating data in Firebase:", str(e))
        raise e



def updateCrossroad(tl):
    crossroad_name = tl.name
    if crossroad_name in crossroads_data:
        crossroad_ref = crossroads_ref.child(crossroad_name)
        tl_dict = tl.dict()
        tl_dict.pop('name')
        crossroad_ref.update(tl_dict)

        return f"Crossroad '{crossroad_name}' has been updated."
    else:
        return f"Crossroad '{crossroad_name}' not found in the data."


def deleteCrossroad(crossroad_name):
    crossroad_ref = crossroads_ref.child(crossroad_name)

    if crossroad_ref.get() is not None:
        crossroad_ref.delete()
        return f"Crossroad '{crossroad_name}' has been deleted."
    else:
        return f"Crossroad '{crossroad_name}' not found in the data."


def addOrUpdateCrossroad(tl):

    print(tl.cases)

    crossroad_name = tl.name
    tl_dict = tl.dict()
    tl_dict.pop('name')
    tl_dict = {crossroad_name: tl_dict}
    crossroads_ref.update(tl_dict)



def updateBrokerDB(topic, message):
    msg = {"message": message, "time": datetime.now().strftime("%d/%m/%Y %H:%M:%S")}
    topic_ref = broker_ref.child(topic)

    topic_dict = topic_ref.get()
    if topic_dict and "messages" in topic_dict:
        messages = topic_dict["messages"]
        messages.insert(0, msg)
    else:
        messages = [msg]

    topic_dict = {
        topic:{
        "messages": messages
        }
    }
    broker_ref.update(topic_dict)
