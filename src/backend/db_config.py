import pymysql
from flask import Flask
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

# Database configuration
app.config['DB_HOST'] = os.getenv("DATABASE_HOST")
app.config['DB_USER'] = os.getenv("DATABASE_USER")
app.config['DB_PASSWORD'] = os.getenv("DATABASE_PASSWORD")
app.config['DB_NAME'] = os.getenv("DATABASE_NAME")

# Connect to the database
def get_db_connection():
    return pymysql.connect(
        host=app.config['DB_HOST'],
        user=app.config['DB_USER'],
        password=app.config['DB_PASSWORD'],
        database=app.config['DB_NAME']
    )
