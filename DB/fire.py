import firebase_admin
from firebase_admin import credentials, db



traffic_lights_count = 1

try:
    cred = credentials.Certificate('C:\\repos\\IOT\\DB\\serviceAccountKey.json')
    firebase_admin.initialize_app(cred, {
        'databaseURL': 'https://iot-smart-city-database-default-rtdb.europe-west1.firebasedatabase.app/'
    })

    ref = db.reference('py/')
    crossroads_ref = ref.child('crossroads')
    cars_ref = ref.child('cars')
    broker_ref = ref.child('broker')


    crossroads_ref.set({
        f"traffic_light_id_{traffic_lights_count}": {
            "name": "Traffic Light A",
            "latitude": 37.12345,
            "longitude": -122.67890,
            "special_number": "TL001",
            "crossroad_name": "Main Street and Elm Avenue",
            "current_state": "Green"
        }
    })
    cars_ref.set({
        "car_id_1": {
            "model": "ferrari",
            "location":"somewhere",
            "speed":"100 KPH",
        }
    })

    broker_ref.set({

    })
    crossroads_ref.update({
        
    })

    print("Data has been written to the Firebase Realtime Database.")
except Exception as e:
    print("Error:", e)
