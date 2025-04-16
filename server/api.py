from typing import Union

from contextlib import asynccontextmanager

from fastapi import FastAPI

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import Model

import pandas as pd


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

context_instances = {}
@asynccontextmanager
async def lifespan(app: FastAPI):
    context_instances["classification"] = Model()
    yield


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        '*'
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
    return {"status": "ok", "prediction" : 1}#context_instances["classification"].predict(predictionRequest)}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}