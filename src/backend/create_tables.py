import pymysql
import os
from db_config import get_db_connection

def execute_sql_files(directory):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Loop through all .sql files in the models directory
        for filename in os.listdir(directory):
            if filename.endswith('.sql'):
                filepath = os.path.join(directory, filename)
                print(f"Executing {filepath}")

                # Read and execute the SQL commands
                with open(filepath, 'r') as file:
                    sql_commands = file.read()

                try:
                    cursor.execute(sql_commands)
                    connection.commit()
                    print(f"{filename} executed successfully!")

                except Exception as e:
                    print(f"Failed to execute {filename}: {str(e)}")

        print("Database setup completed.")

    except Exception as e:
        print(f"Database connection error: {str(e)}")

    finally:
        connection.close()

# Run the function to execute all .sql files
models_directory = './models'
execute_sql_files(models_directory)
