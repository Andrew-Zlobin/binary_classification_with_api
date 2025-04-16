from typing import Union

from contextlib import asynccontextmanager

from fastapi import FastAPI

from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from model import Model

import pandas as pd

# id                        int64
# Gender                   object
# Age                       int64
# Driving_License           int64
# Region_Code             float64
# Previously_Insured        int64
# Vehicle_Age              object
# Vehicle_Damage           object
# Annual_Premium          float64
# Policy_Sales_Channel    float64
# Vintage                   int64
# Response                  int64
class PredictionRequest(BaseModel):
    id: int
    Gender: str
    Age : int
    Driving_License : int
    Region_Code : float
    Previously_Insured : int
    Vehicle_Age : str
    Vehicle_Damage : str
    Annual_Premium : float
    Policy_Sales_Channel : float
    Vintage : int
    Response : int
    # value : str

context_instances = {}
@asynccontextmanager
async def lifespan(app: FastAPI):
    context_instances["classification"] = Model()
    print("model loaded")
    yield
    print("model detatched")


app = FastAPI(lifespan=lifespan)

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
    one_line_df = pd.DataFrame({
        "id": [predictionRequest.id],
        "Gender":  [predictionRequest.Gender],
        "Age" :  [predictionRequest.Age],
        "Driving_License" :  [predictionRequest.Driving_License],
        "Region_Code" :  [predictionRequest.Region_Code],
        "Previously_Insured" :  [predictionRequest.Previously_Insured],
        "Vehicle_Age" :  [predictionRequest.Vehicle_Age],
        "Vehicle_Damage" :  [predictionRequest.Vehicle_Damage],
        "Annual_Premium" :  [predictionRequest.Annual_Premium],
        "Policy_Sales_Channel" :  [predictionRequest.Policy_Sales_Channel],
        "Vintage" :  [predictionRequest.Vintage],
        "Response" :  [predictionRequest.Response],
    })
    print(one_line_df)
    pred_res = context_instances["classification"].predict(one_line_df)
    return {"status": "ok", "prediction" : pred_res}#context_instances["classification"].predict(predictionRequest)}

