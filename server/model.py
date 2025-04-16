from xgboost import XGBClassifier
import numpy as np

class Model:
    def __init__(self):
        self.model = XGBClassifier()
        self.model.load_model("model.json")
        

    def predict(self, x):
        processed_x = self.preprocess(x)
        # print("processed_x = ", processed_x.shape)

        y_pred_proba = self.model.predict_proba(processed_x)[:, 1]

        best_threshold = 0.69
        # print(y_pred_proba.shape)
        res = (y_pred_proba >= best_threshold).astype(int)
        # print(res)
        return int(res[0])
    
    def preprocess(self, test_df):
        vehicle_age_mapping = {'< 1 Year': 0, '1-2 Year': 1, '> 2 Years': 2}
        test_df['Vehicle_Age_Encoded'] = test_df['Vehicle_Age'].map(vehicle_age_mapping)

        # Вариант (для Gender)
        test_df['Gender'] = np.where(test_df['Gender'] == 'Male', 1, 0) 
        # Вариант (для Vehicle_Damage)
        test_df['Vehicle_Damage'] = test_df['Vehicle_Damage'].apply(lambda x: 0 if x == 'No' else 1) 

        # добавление признаков
        feature_young = 'is_young_driver'
        test_df[feature_young] = ((test_df['Age'] >= 20) & (test_df['Age'] < 25)).astype('int8')
        feature_old = 'is_old_driver'
        test_df[feature_old] = (test_df['Age'] > 61).astype('int8')
        feature_region = 'is_special_region'
        special_region = test_df['Region_Code'].value_counts().nlargest(2).index
        test_df[feature_region] = test_df['Region_Code'].isin(special_region).astype("int8")
        test_df['Region_Code'] = test_df['Region_Code'].astype('int8')

        # int
        test_df['Policy_Sales_Channel'] = test_df['Policy_Sales_Channel'].astype('int16')
        #
        test_df = test_df.drop(columns='Vehicle_Age')
        # удаление id
        test_df = test_df.drop(columns='id')
        # слабая кореляция
        test_df = test_df.drop(columns='Driving_License')
        # убираем скошенность
        # log
        cols_to_process = ['Age']
        for col in cols_to_process:
            test_df[col + '_log'] = np.log1p(test_df[col])

        cols_to_scale = [col + '_log' for col in cols_to_process]
        return test_df.drop(columns=["Response"])