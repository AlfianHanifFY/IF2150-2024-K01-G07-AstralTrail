from flask import jsonify, request
from db_config import get_db_connection

# Get Statistic page
def showStatisticPage():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = '''
        '''
        cursor.execute(query)
        travel_logs = cursor.fetchall()

        return jsonify([
            {
            }
            for data in travel_logs
        ])

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()
        
