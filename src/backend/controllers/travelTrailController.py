from flask import jsonify, request
from db_config import get_db_connection

# Get Statistic page
def showStatisticPage():
    try:
        connection = get_db_connection()
        cursor = connection.cursor()

        # For Overall Graph
        query_TempatWisata = '''
            SELECT 
                TW.id, TW.NamaTempatWisata, TW.NamaNegara, TW.NamaKota,
                COUNT(TL.id) AS VisitCount
            FROM TravelLog TL
            JOIN TempatWisata TW ON TW.id = TL.TempatWisataID 
            GROUP BY TW.id, TW.NamaTempatWisata, TW.NamaNegara, TW.NamaKota;
        '''
        cursor.execute(query_TempatWisata)
        statTempatWisata = cursor.fetchall()

        # Insight on most visited Country
        query_Negara = '''
            SELECT
                TW.id, TW.NamaNegara,
                COUNT(TL.id) AS VisitCount
            FROM TravelLog TL
            JOIN TempatWisata TW ON TW.id = TL.TempatWisataID
            GROUP BY TW.id, TW.NamaNegara
            ORDER BY COUNT(TL.id);
        '''

        cursor.execute(query_Negara)
        statNegara = cursor.fetchall()



        return jsonify({
            "TempatWisata" : statTempatWisata,
            "Negara" : statNegara
        })

    except Exception as e:
        return jsonify({"message": str(e)}), 500

    finally:
        connection.close()
        
