## How to run:
```
git clone https://github.com/plutasnyy/chat
cd chat
source env/bin/activate.fish //or source env/bin/activate
sudo docker run -p 6379:6379 -d redis:2.8
python3 manage.py runserver
```
and in the second window:
```
cd chat/frontend
npm run server
```
your page will be avaible at:
```
localhost:8000
```