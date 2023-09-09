from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import uvicorn
from DB import fire as db
from fastapi.middleware.cors import CORSMiddleware

# import json


app = FastAPI()

origins = [
    "*"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class TrafficLight(BaseModel):
    latitude: float
    longitude: float
    name: str
    light: str
    cases: int

database = db
crossroads = db.getAllCrossroads()

@app.get("/crossroads/", response_model= dict)
async def get_crossroads():
    return crossroads

@app.get("/crossroads/{crossroad_name}", response_model=dict)
async def get_crossroad(crossroad_name: str):
    crossroad_data = database.getCrossroadByName(crossroad_name)
    
    if crossroad_data is not None:
        return crossroad_data
    else:
        raise HTTPException(status_code=404, detail=f"Crossroad '{crossroad_name}' not found")
    

@app.post("/crossroads/create")
async def add_crossroad(tl: TrafficLight):
    database.addOrUpdateCrossroad(tl)

    req_info = crossroads
    return {
        "status" : "SUCCESS",
        "data" : req_info
    }


@app.post("/crossroads/update")
async def post_crossroad(tl: dict):
    database.addOrUpdateCrossroad(tl)

    req_info = crossroads.json()
    return {
        "status" : "SUCCESS",
        "data" : req_info
    }

@app.put("/crossroads/{tl}")
async def change_light(tl: str):
        return database.changeCrossroadLight(tl)
        

@app.put("/crossroads/cases/{tl}")
async def add_case(tl: str):
        return database.addCaseNumber(tl)

@app.delete("/crossroads/{crossroads_name}")
async def delete_crossroad(crossroads_name: str):
    db.updateBrokerDB(crossroads_name, f"Deleted {crossroads_name} ")
    result = database.deleteCrossroad(crossroads_name)
    return {
        "status" : result,
    }

 
uvicorn.run(app, host="0.0.0.0", port=8002)