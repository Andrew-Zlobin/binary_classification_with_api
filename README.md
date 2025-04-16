# Лабораторная работа 1
## Бинарная классификация
### запуск:
1) клонируем репозиторий
2) переходим в папку проекта
3) выпоняем ``` sudo docker compose up --build ```
4) открываем http://localhost:8081/ в браузере
### Optional:
```python3 test_api.py``` прогонит последние строчки датасета (начиная с 5_000_000 и до конца) через сервер (P.S. Но это на долго)
## Результаты
### Основное решение в model_xg.ipynb
Там у нас используется XGBClassifier, получили следующие результаты:  
![image](https://github.com/user-attachments/assets/9477206d-06a9-4615-b9e2-1c6614536ea2)  
Предыдущая гипотеза (использовать DecisionTreeClassifier) в server/model_train.ipynb  
Но там точность ниже, так что в конченом решении используется именно XGBClassifier, но если интересно, то получились такие результаты  
![image](https://github.com/user-attachments/assets/43f5b8f8-79fb-43e5-8f34-fb5b532873fb)  
### Ну и демо https://drive.google.com/file/d/1FRLaHhFT9S5Mz3b1wqaepdFzsSENmp25/view?usp=sharing
