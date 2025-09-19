# test_where_am_i.py
from connections.sql_connect import get_connection

with get_connection() as conn:
    cursor = conn.cursor()
    cursor.execute("SELECT DB_NAME() as DBName, SERVERPROPERTY('MachineName') as ServerName, @@SERVERNAME as SqlServerName")
    print(cursor.fetchone())
