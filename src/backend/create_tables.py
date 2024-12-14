import pymysql
import os
from db_config import get_db_connection

def execute_sql_files(directory):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        priority_file = 'tempatWisataModel.sql'
        other_files = []

        for filename in os.listdir(directory):
            if filename.endswith('.sql'):
                if filename == priority_file:
                    priority_filepath = os.path.join(directory, filename)
                else:
                    other_files.append(os.path.join(directory, filename))

        if 'priority_filepath' in locals():
            print(f"Executing {priority_filepath}")
            with open(priority_filepath, 'r') as file:
                sql_commands = file.read()

            try:
                cursor.execute(sql_commands)
                connection.commit()
                print(f"{priority_file} executed successfully!")
            except Exception as e:
                print(f"Failed to execute {priority_file}: {str(e)}")

        for filepath in other_files:
            print(f"Executing {filepath}")
            with open(filepath, 'r') as file:
                sql_commands = file.read()

            try:
                cursor.execute(sql_commands)
                connection.commit()
                print(f"{os.path.basename(filepath)} executed successfully!")
            except Exception as e:
                print(f"Failed to execute {os.path.basename(filepath)}: {str(e)}")

        print("Database setup completed.")

    except Exception as e:
        print(f"Database connection error: {str(e)}")

    finally:
        connection.close()


models_directory = 'src/backend/models'
execute_sql_files(models_directory)
