FROM python:3.12-slim

WORKDIR /app
EXPOSE 8000


# RUN apt-get update && apt-get install -y \
#     build-essential \
#     curl \
#     software-properties-common \
#     && rm -rf /var/lib/apt/lists/*

# Сначала копируем только requirements.txt и устанавливаем зависимости
COPY ./ /app/
# COPY ./titanic-api/requirements.txt /app
# RUN pip3 install --no-cache-dir -r requirements.txt
RUN pip install "fastapi[standard]"
RUN python3 -m pip install --no-cache-dir -r requirements.txt

# Затем копируем остальной код


CMD ["fastapi", "run", "api.py"]