from flask import jsonify, request
from db_config import get_db_connection

# Get all Bucket Lists
def get_bucketList():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Join BucketList with TempatWisata to get place information
        query = '''
            SELECT 
                BucketList.id, 
                BucketList.TempatWisataId, 
                TempatWisata.NamaTempatWisata, 
                TempatWisata.NamaNegara, 
                TempatWisata.NamaKota,
                BucketList.Tanggal,
                TempatWisata.ImagePath
            FROM BucketList
            JOIN TempatWisata ON BucketList.TempatWisataId = TempatWisata.id
        '''
        cursor.execute(query)

        bucketLists = cursor.fetchall()

        return jsonify([
            {
                "id": data[0],
                "TempatWisataId": data[1],
                "NamaTempatWisata": data[2],
                "NamaNegara": data[3],
                "NamaKota": data[4],
                "Tanggal": data[5],
                "ImagePath": data[6]
            }
            for data in bucketLists
        ])

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()

def get_bucketListById(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Join BucketList with TempatWisata to get place information
        query = '''
            SELECT 
                BucketList.id, 
                BucketList.TempatWisataId, 
                TempatWisata.NamaTempatWisata, 
                TempatWisata.NamaNegara, 
                TempatWisata.NamaKota, 
                BucketList.Tanggal
            FROM BucketList
            JOIN TempatWisata ON BucketList.TempatWisataId = TempatWisata.id
            WHERE BucketList.id = %s
        '''
        cursor.execute(query,id)

        bucketLists = cursor.fetchall()

        return jsonify([
            {
                "id": data[0],
                "TempatWisataId": data[1],
                "NamaTempatWisata": data[2],
                "NamaNegara": data[3],
                "NamaKota": data[4],
                "Tanggal": data[5]
            }
            for data in bucketLists
        ])

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()

# Create a Bucket List
def create_bucketList(data):
    TempatWisataId = data.get('TempatWisataId')
    Tanggal = data.get('Tanggal')

    if not all([TempatWisataId, Tanggal]):
        return jsonify({"message": "Required fields are missing"}), 400

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = '''
            INSERT INTO BucketList (TempatWisataId, Tanggal)
            VALUES (%s, %s)
        '''
        cursor.execute(query, (TempatWisataId, Tanggal))

        connection.commit()

        return jsonify({
            "message": "Bucket List added successfully",
            "TempatWisataId": TempatWisataId,
            "Tanggal": Tanggal
        })

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()


# Update a Bucket List
def update_bucketList(id, data):
    TempatWisataId = data.get('TempatWisataId')
    Tanggal = data.get('Tanggal')

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Check if the record exists first
        check_query = "SELECT * FROM BucketList WHERE id = %s"
        cursor.execute(check_query, (id,))
        if not cursor.fetchone():
            return jsonify({"message": "Bucket List not found"}), 404

        update_query = '''
            UPDATE BucketList
            SET TempatWisataId = %s,
                Tanggal = %s
            WHERE id = %s
        '''
        cursor.execute(update_query, (TempatWisataId, Tanggal, id))

        connection.commit()

        return jsonify({"message": "Bucket List updated successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()


# Delete a Bucket List
def delete_bucketList(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Check if the record exists first
        check_query = "SELECT * FROM BucketList WHERE id = %s"
        cursor.execute(check_query, (id,))
        if not cursor.fetchone():
            return jsonify({"message": "Bucket List not found"}), 404

        delete_query = "DELETE FROM BucketList WHERE id = %s"
        cursor.execute(delete_query, (id,))
        connection.commit()

        return jsonify({"message": "Bucket List deleted successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()
