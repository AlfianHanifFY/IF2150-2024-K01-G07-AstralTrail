from flask import Flask, jsonify, request
from db_config import app, get_db_connection
from controllers.tempatWisataController import *
from controllers.bucketListController import *
from controllers.travelLogController import *
from controllers.travelTrailController import *
import os


@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Flask API!"})

@app.route('/api/tempat-wisata', methods=['GET'])
def get_tempatWisata_route():
    return get_tempatWisata()

@app.route('/api/tempat-wisata/<int:id>', methods=['GET'])
def get_tempatWisataById_route(id):
    return get_tempatWisataById(id)

@app.route('/api/tempat-wisata/negara', methods=['GET'])
def get_negara_route():
    return get_negara()

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

@app.route('/api/bucket-list/<int:id>', methods=['GET'])
def get_bucketListById_route(id):
    return get_bucketListById(id)

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
#  contoh kalo pake param => http://127.0.0.1:5000/api/travel-log?country=arab
@app.route('/api/travel-log', methods=['GET'])
def get_travelLog_route():
    country = request.args.get('country')
    if not country:
        return get_travelLog()
    return get_travelLogByCountry(country)

@app.route('/api/travel-log/<int:id>', methods=['GET'])
def get_travelLogById_route(id):
    return get_travelLogById(id)

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

@app.route('/api/showStatisticPage', methods=['GET'])
def get_statistic_route():
    return showStatisticPage()

@app.route("/api/upload-image", methods=["POST"])
def upload_image_route():
    if "files[]" not in request.files:
        return jsonify({"error": "No file part"}), 400

    files = request.files.getlist("files[]")
    if not files or all(f.filename == "" for f in files):
        return jsonify({"error": "No selected files"}), 400

    allowed_extensions = {"png", "jpg", "jpeg", "gif"}

    upload_folder = "img/"

    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    uploaded_files = []
    for file in files:
        if file and file.filename != "":
            file_extension = file.filename.rsplit(".", 1)[-1].lower()
            if file_extension not in allowed_extensions:
                return jsonify({"error": f"File {file.filename} is not an allowed image format"}), 400

            file_path = f"{upload_folder}{file.filename}"  
            file.save(file_path)
            uploaded_files.append(file.filename)

    return jsonify({"message": "Files uploaded successfully", "uploaded_files": uploaded_files})


if __name__ == "__main__":
    app.run(debug=True)
