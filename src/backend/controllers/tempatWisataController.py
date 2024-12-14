from flask import jsonify, request
from db_config import get_db_connection

# Get all tempat wisata
def get_tempatWisata():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = "SELECT * FROM TempatWisata"
        cursor.execute(query)

        tempatWisata = cursor.fetchall()

        return jsonify([
                {
                    "id": data[0],
                    "NamaTempatWisata": data[1],
                    "NamaNegara": data[2],
                    "NamaKota": data[3],
                    "Deskripsi": data[4],
                    "ImagePath": data[5]
                }
                for data in tempatWisata])

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()
        
def get_tempatWisataById(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        query = "SELECT * FROM TempatWisata WHERE id = %s"
        cursor.execute(query,(id))

        tempatWisata = cursor.fetchall()

        return jsonify([
                {
                    "id": data[0],
                    "NamaTempatWisata": data[1],
                    "NamaNegara": data[2],
                    "NamaKota": data[3],
                    "Deskripsi": data[4],
                    "ImagePath": data[5]
                }
                for data in tempatWisata])

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()

def get_negara():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Modified query to group by NamaNegara
        query = '''
            SELECT TempatWisata.NamaNegara
            FROM TempatWisata, TravelLog
            WHERE TempatWisata.id = TravelLog.TempatWisataId
            GROUP BY TempatWisata.NamaNegara
            '''
        cursor.execute(query)

        countries = cursor.fetchall()

        # Return the list of unique countries
        return jsonify([country[0] for country in countries])

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()


# Create Tempat Wisata
def create_tempatWisata(data):
    NamaTempatWisata = data.get('NamaTempatWisata')
    NamaNegara = data.get('NamaNegara')
    NamaKota = data.get('NamaKota')
    Deskripsi = data.get('Deskripsi')
    ImagePath = data.get('ImagePath')

    if not all([NamaTempatWisata, NamaNegara, NamaKota]):
        return jsonify({"message": "Required fields are missing"}), 400

    try:
            connection = get_db_connection()
            cursor = connection.cursor()

            query = '''
                INSERT INTO TempatWisata (NamaTempatWisata, NamaNegara, NamaKota, Deskripsi, ImagePath)
                VALUES (%s, %s, %s, %s, %s)
            '''
            cursor.execute(query, (NamaTempatWisata, NamaNegara, NamaKota, Deskripsi, ImagePath))
            connection.commit()
            
            return jsonify({
                "message": "Tempat Wisata added successfully",
                "TempatWisata": {
                    "NamaTempatWisata": NamaTempatWisata,
                    "NamaNegara": NamaNegara,
                    "NamaKota": NamaKota,
                    "Deskripsi": Deskripsi,
                    "ImagePath": ImagePath
                }
            })
            
    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()

# Update Tempat Wisata
def update_tempatWisata(id, data):
    NamaTempatWisata = data.get('NamaTempatWisata')
    NamaNegara = data.get('NamaNegara')
    NamaKota = data.get('NamaKota')
    Deskripsi = data.get('Deskripsi')
    ImagePath = data.get('ImagePath')

    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Check if the record exists first
        check_query = "SELECT * FROM TempatWisata WHERE id = %s"
        cursor.execute(check_query, (id,))
        if not cursor.fetchone():
            return jsonify({"message": "Tempat Wisata not found"}), 404

        update_query = '''
            UPDATE TempatWisata
            SET NamaTempatWisata = %s,
                NamaNegara = %s,
                NamaKota = %s,
                Deskripsi = %s,
                ImagePath = %s
            WHERE id = %s
        '''
        cursor.execute(update_query, (NamaTempatWisata, NamaNegara, NamaKota, Deskripsi, ImagePath, id))

        connection.commit()

        return jsonify({"message": "Tempat Wisata updated successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()


# Delete Tempat Wisata
def delete_tempatWisata(id):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # Check if the record exists first
        check_query = "SELECT * FROM TempatWisata WHERE id = %s"
        cursor.execute(check_query, (id,))
        if not cursor.fetchone():
            return jsonify({"message": "Tempat Wisata not found"}), 404

        delete_query = "DELETE FROM TempatWisata WHERE id = %s"
        cursor.execute(delete_query, (id,))
        connection.commit()

        return jsonify({"message": "Tempat Wisata deleted successfully"})

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()