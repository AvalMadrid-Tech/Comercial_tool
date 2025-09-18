import os
import pyodbc
from dotenv import load_dotenv

# Cargar .env
load_dotenv()

def get_connection():
    return pyodbc.connect(
        "DRIVER={ODBC Driver 17 for SQL Server};"
        f"SERVER={os.getenv('SQL_SERVER')};"
        f"DATABASE={os.getenv('SQL_DATABASE')};"
        f"UID={os.getenv('SQL_USER')};"
        f"PWD={os.getenv('SQL_PASSWORD')};"
        "Encrypt=no;TrustServerCertificate=yes;",
        timeout=5
    )
