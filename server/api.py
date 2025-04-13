from typing import Union

from fastapi import FastAPI

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


class PredictionRequest(BaseModel):
    Gender: str
    Age : int
    Driving_License : str
    Region_Code : int
    Previously_Insured : str
    Vehicle_Age : str
    Vehicle_Damage : str
    Annual_Premium : int
    Policy_Sales_Channel : int
    Vintage : int
    # value : str


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        # '*'
        "http://localhost",
        "http://127.0.0.1",
        "http://127.0.1.1",
        "http://172.30.16.1"
        "http://localhost:19006",
        "http://localhost:8081",
        "http://localhost:8000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
async def predict(predictionRequest : PredictionRequest):
    print(predictionRequest.Age)


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}