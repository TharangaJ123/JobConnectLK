from flask import Flask, request, jsonify
import pdfplumber
from docx import Document
import google.generativeai as genai
import os
from flask_cors import CORS
import json

from config import Config

from bson import ObjectId

#mongo db
from flask_pymongo import PyMongo

#jwt
from flask_jwt_extended import (
    JWTManager, create_access_token, jwt_required, get_jwt_identity
)

from werkzeug.utils import secure_filename
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

app.config.from_object(Config)

# Initialize extensions
mongo = PyMongo(app)
jwt = JWTManager(app)

users_collection = mongo.db.users


# Signup route
@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if users_collection.find_one({'username': username}):
        return jsonify({'msg': 'User already exists'}), 400

    hashed_pw = generate_password_hash(password)
    users_collection.insert_one({'username': username, 'password': hashed_pw})
    return jsonify({'msg': 'User created successfully'}), 201

# Login route
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    user = users_collection.find_one({'username': username})
    if user and check_password_hash(user['password'], password):
        token = create_access_token(identity=username)
        return jsonify({'access_token': token}), 200

    return jsonify({'msg': 'Invalid credentials'}), 401

#jobs
jobs_collection = mongo.db.jobs

# Helper to convert MongoDB job to JSON
def job_to_json(job):
    job['_id'] = str(job['_id'])
    return job

# Create a new job
@app.route('/jobs', methods=['POST'])
@jwt_required()
def create_job():
    data = request.json
    username = get_jwt_identity()
    job = {
        'title': data.get('title'),
        'location': data.get('location'),
        'salary': data.get('salary'),
        'type': data.get('type'),
        'tags': data.get('tags', []),
        'description': data.get('description'),
        'posted_by': username
    }
    result = jobs_collection.insert_one(job)
    job['_id'] = str(result.inserted_id)
    return jsonify({'msg': 'Job posted successfully', 'job': job}), 201

# Get jobs posted by a specific user
@app.route('/jobs', methods=['GET'])
@jwt_required()
def get_jobs():
    posted_by = request.args.get('posted_by')
    username = get_jwt_identity()
    # Only allow users to see their own jobs
    if posted_by != username:
        return jsonify({'msg': 'Unauthorized'}), 403
    jobs = list(jobs_collection.find({'posted_by': username}))
    jobs = [job_to_json(job) for job in jobs]
    return jsonify({'jobs': jobs}), 200

# Update a job
@app.route('/jobs/<job_id>', methods=['PATCH'])
@jwt_required()
def update_job(job_id):
    username = get_jwt_identity()
    job = jobs_collection.find_one({'_id': ObjectId(job_id)})
    if not job:
        return jsonify({'msg': 'Job not found'}), 404
    if job['posted_by'] != username:
        return jsonify({'msg': 'Unauthorized'}), 403
    data = request.json
    update_fields = {k: v for k, v in data.items() if k in ['title', 'location', 'salary', 'type', 'tags', 'description']}
    jobs_collection.update_one({'_id': ObjectId(job_id)}, {'$set': update_fields})
    updated_job = jobs_collection.find_one({'_id': ObjectId(job_id)})
    return jsonify({'msg': 'Job updated', 'job': job_to_json(updated_job)}), 200

# Delete a job
@app.route('/jobs/<job_id>', methods=['DELETE'])
@jwt_required()
def delete_job(job_id):
    username = get_jwt_identity()
    job = jobs_collection.find_one({'_id': ObjectId(job_id)})
    if not job:
        return jsonify({'msg': 'Job not found'}), 404
    if job['posted_by'] != username:
        return jsonify({'msg': 'Unauthorized'}), 403
    jobs_collection.delete_one({'_id': ObjectId(job_id)})
    return jsonify({'msg': 'Job deleted'}), 200

#get all jobs
@app.route("/jobs/all", methods=['GET'])
def get_all_jobs():
    jobs = list(jobs_collection.find())
    for job in jobs:
        job['_id'] = str(job['_id'])
    return jsonify({'jobs': jobs}), 200

#Ai part
app.config['UPLOAD_FOLDER'] = 'uploads'
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

# Initialize Gemini API
genai.configure(api_key="AIzaSyBAm3FwW4KadjuUnZ_H-hO6ZQO2wWA6E0Y")
model = genai.GenerativeModel("gemini-1.5-flash")

#chat model
chat = model.start_chat()

@app.route("/chat", methods=["POST"])
def chatbot():
    data = request.json
    user_input = data.get("message", "")
    response = chat.send_message(user_input)
    return jsonify({"reply": response.text})

#extracting text from the cv
def extract_text_from_file(filepath):
    if filepath.endswith('.pdf'):
        with pdfplumber.open(filepath) as pdf:
            return "\n".join(page.extract_text() for page in pdf.pages if page.extract_text())
    elif filepath.endswith('.docx'):
        doc = Document(filepath)
        return "\n".join([para.text for para in doc.paragraphs])
    else:
        return ""

@app.route("/analyze", methods=["POST"])
def analyze():
    cv_file = request.files.get("cv")
    job_description = request.form.get("job_description")

    if not cv_file or not job_description:
        return jsonify({"error": "CV file and job description are required"}), 400

    filename = secure_filename(cv_file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    cv_file.save(filepath)

    cv_text = extract_text_from_file(filepath)

    prompt = f"""
    You are an expert career assistant. Compare the user's CV with the provided job description and provide:

    1. A list of matched qualifications from the CV.
    2. A list of missing qualifications or experience.
    3. Suggestions to improve the CV to better fit the job.

    Respond in JSON format like:
    {{
      "matched": ["Python", "GPA above 2.5"],
      "missing": ["Excel proficiency", "Internship experience"],
      "suggestions": [
        "Mention Excel or data analysis tools",
        "Add internship or project experience",
        "Include teamwork or communication skills"
      ]
    }}

    CV:
    {cv_text}

    Job Description:
    {job_description}
    """

    response = model.generate_content(prompt)
    
    try:
        result = json.loads(response.text)
        return jsonify(result)
    except:
        return jsonify({"raw_output": response.text}), 200
    


if __name__ == "__main__":
    app.run(debug=True)
