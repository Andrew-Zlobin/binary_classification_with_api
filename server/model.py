class Model:
    def __init__(self):
        self.model = []
        self.model.predict = lambda x: 0

    def predict(self, x):
        processed_x = self.preprocess(x)
        return self.model.predict(processed_x)
    
    def preprocess(self, x):
        return x