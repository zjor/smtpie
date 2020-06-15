# app/run.py

from mailapp import app
from dotenv import load_dotenv

load_dotenv()

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
