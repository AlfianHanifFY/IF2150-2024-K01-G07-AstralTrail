from flask import Flask, jsonify, request
from db_config import app, get_db_connection
from controllers.tempatWisataController import *
from controllers.bucketListController import *
from controllers.travelLogController import *


@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

@app.route('/api/tempat-wisata', methods=['GET'])
def get_tempatWisata_route():
    return get_tempatWisata()

@app.route('/api/tempat-wisata', methods=['POST'])
def create_tempatWisata_route():
    data = request.get_json()
    return create_tempatWisata(data)

@app.route('/api/tempat-wisata/<int:id>', methods=['PUT'])
def update_tempatWisata_route(id):
    data = request.get_json()
    return update_tempatWisata(id,data)

@app.route('/api/tempat-wisata/<int:id>', methods=['DELETE'])
def delete_tempatWisata_route(id):
    return delete_tempatWisata(id)

# Get all Bucket Lists
@app.route('/api/bucket-list', methods=['GET'])
def get_bucketList_route():
    return get_bucketList()

# Create a Bucket List
@app.route('/api/bucket-list', methods=['POST'])
def create_bucketList_route():
    data = request.get_json()
    return create_bucketList(data)

# Update a Bucket List
@app.route('/api/bucket-list/<int:id>', methods=['PUT'])
def update_bucketList_route(id):
    data = request.get_json()
    return update_bucketList(id, data)

# Delete a Bucket List
@app.route('/api/bucket-list/<int:id>', methods=['DELETE'])
def delete_bucketList_route(id):
    return delete_bucketList(id)

# Get all Travel Log
@app.route('/api/travel-log', methods=['GET'])
def get_travelLog_route():
    return get_travelLog()

# Create a Travel Log
@app.route('/api/travel-log', methods=['POST'])
def create_travelLog_route():
    data = request.get_json()
    return create_travelLog(data)

# Update a Travel Log
@app.route('/api/travel-log/<int:id>', methods=['PUT'])
def update_travelLog_route(id):
    data = request.get_json()
    return update_travelLog(id, data)

# Delete a Travel Log
@app.route('/api/travel-log/<int:id>', methods=['DELETE'])
def delete_travelLog_route(id):
    return delete_travelLog(id)


if __name__ == "__main__":
    app.run(debug=True)
