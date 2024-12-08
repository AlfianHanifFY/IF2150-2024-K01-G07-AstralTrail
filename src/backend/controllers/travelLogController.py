from flask import jsonify, request
from db_config import get_db_connection

# Get all Travel Logs
def get_travelLog():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = '''
            SELECT TravelLog.id, TravelLog.TempatWisataId, 
                   TempatWisata.NamaTempatWisata, TravelLog.Tanggal, 
                   TravelLog.DeskripsiUser, TravelLog.ImagePath 
            FROM TravelLog 
            JOIN TempatWisata ON TravelLog.TempatWisataId = TempatWisata.id
        '''
        cursor.execute(query)
        travel_logs = cursor.fetchall()

        return jsonify([
            {
                "id": data[0],
                "TempatWisataId": data[1],
                "NamaTempatWisata": data[2],
                "Tanggal": data[3],
                "DeskripsiUser": data[4],
                "ImagePath": data[5]
            }
            for data in travel_logs
        ])

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()


# Create a Travel Log
def create_travelLog(data):
    TempatWisataId = data.get('TempatWisataId')
    Tanggal = data.get('Tanggal')
    DeskripsiUser = data.get('DeskripsiUser')
    ImagePath = data.get('ImagePath')

    if not all([TempatWisataId, Tanggal]):
        return jsonify({"message": "Required fields are missing"}), 400

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = '''
            INSERT INTO TravelLog (TempatWisataId, Tanggal, DeskripsiUser, ImagePath)
            VALUES (%s, %s, %s, %s)
        '''
        cursor.execute(query, (TempatWisataId, Tanggal, DeskripsiUser, ImagePath))
        connection.commit()

        return jsonify({"message": "Travel log added successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()


# Update a Travel Log
def update_travelLog(id, data):
    Tanggal = data.get('Tanggal')
    DeskripsiUser = data.get('DeskripsiUser')
    ImagePath = data.get('ImagePath')

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        check_query = "SELECT * FROM TravelLog WHERE id = %s"
        cursor.execute(check_query, (id,))
        if not cursor.fetchone():
            return jsonify({"message": "Travel log not found"}), 404

        update_query = '''
            UPDATE TravelLog
            SET Tanggal = %s,
                DeskripsiUser = %s,
                ImagePath = %s
            WHERE id = %s
        '''
        cursor.execute(update_query, (Tanggal, DeskripsiUser, ImagePath, id))

        connection.commit()

        return jsonify({"message": "Travel log updated successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()


# Delete a Travel Log
def delete_travelLog(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        check_query = "SELECT * FROM TravelLog WHERE id = %s"
        cursor.execute(check_query, (id,))
        if not cursor.fetchone():
            return jsonify({"message": "Travel log not found"}), 404

        delete_query = "DELETE FROM TravelLog WHERE id = %s"
        cursor.execute(delete_query, (id,))
        connection.commit()

        return jsonify({"message": "Travel log deleted successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()
