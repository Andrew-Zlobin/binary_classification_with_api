import requests
import pandas as pd
from tqdm import tqdm
import numpy as np
from sklearn.metrics import classification_report,  f1_score


data = pd.read_csv("server/train.csv")
#5_000_011
test_data = data[5_000_000:].copy()

url = 'http://localhost:8000/predict'
one_line_df = test_data.iloc[0]
print(one_line_df)
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
obj_to_send = {
        "id": int(one_line_df.id),
        "Gender":  str(one_line_df.Gender),
        "Age" :  int(one_line_df.Age),
        "Driving_License" :  int(one_line_df.Driving_License),
        "Region_Code" :  float(one_line_df.Region_Code),
        "Previously_Insured" :  int(one_line_df.Previously_Insured),
        "Vehicle_Age" :  str(one_line_df.Vehicle_Age),
        "Vehicle_Damage" :  str(one_line_df.Vehicle_Damage),
        "Annual_Premium" :  float(one_line_df.Annual_Premium),
        "Policy_Sales_Channel" :  float(one_line_df.Policy_Sales_Channel),
        "Vintage" :  int(one_line_df.Vintage),
        "Response" :  int(one_line_df.Response),
         }

test_data = test_data.reset_index()  # make sure indexes pair with number of rows
results = []
for index, row in tqdm(test_data.iterrows()):
    # print(row['c1'], row['c2'])
    obj_to_send = {
        "id": int(one_line_df.id),
        "Gender":  str(one_line_df.Gender),
        "Age" :  int(one_line_df.Age),
        "Driving_License" :  int(one_line_df.Driving_License),
        "Region_Code" :  float(one_line_df.Region_Code),
        "Previously_Insured" :  int(one_line_df.Previously_Insured),
        "Vehicle_Age" :  str(one_line_df.Vehicle_Age),
        "Vehicle_Damage" :  str(one_line_df.Vehicle_Damage),
        "Annual_Premium" :  float(one_line_df.Annual_Premium),
        "Policy_Sales_Channel" :  float(one_line_df.Policy_Sales_Channel),
        "Vintage" :  int(one_line_df.Vintage),
        "Response" :  int(one_line_df.Response),
         }
    x = requests.post(url, json = obj_to_send)
    results.append(x.json()["prediction"])
    # print(x.json()["prediction"])
print(classification_report(test_data["Response"], np.array(results)))

# print(results)

# x = requests.post(url, json = myobj)

# print(x.text)