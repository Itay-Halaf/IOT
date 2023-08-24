from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import uvicorn
# import json

app = FastAPI()

class TrafficLight(BaseModel):
    latitude: float
    longitude: float
    special_number: str
    crossroad_name: str


traffic_lights = {}


traffic_light_1 = TrafficLight(latitude=40.7128, longitude=-74.0060, special_number="TL001", crossroad_name="Main Street")
traffic_light_2 = TrafficLight(latitude=34.0522, longitude=-118.2437, special_number="TL002", crossroad_name="Broadway Avenue")

traffic_lights.update({traffic_light_1.special_number: traffic_light_1})
traffic_lights.update({traffic_light_2.special_number: traffic_light_2})



@app.get("/traffics/", response_model= dict)
async def get_traffic_lights():
    return traffic_lights

@app.get("/traffics/{traffic_id}", response_model=TrafficLight)
async def get_traffic_light(traffic_id: str):
    if traffic_id == None or traffic_id not in traffic_lights:
        raise HTTPException(status_code=404, detail="Traffic light not found")
    return traffic_lights[traffic_id]

@app.post("/traffics/")
async def postTrafficLights(traffic_light: TrafficLight):
    traffic_lights.update({traffic_light.special_number: traffic_light})
    req_info = traffic_light.json()
    return {
        "status" : "SUCCESS",
        "data" : req_info
    }

@app.delete("/traffics/{traffic_id}")
async def get_traffic_light(traffic_id: str):
    if traffic_id in traffic_lights:
        del traffic_lights[traffic_id]
    return {
        "status" : "DELETED",
    }

# if __name__ == "__main__":
#     uvicorn.run(app, host="0.0.0.0", port=8002)