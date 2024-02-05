from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "https://web-house-bingo-zh00g.vercel.app"}})

@app.route('/update-count', methods=['POST'])
def update_count():
    data = request.json
    user_id = data['user_id']
    marked_count = data['marked_count']
    print("running", data)
    
    try:
        with open('server/user_clicks.json', 'r') as file:
            user_clicks = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        user_clicks = {}
    
    user_clicks[user_id] = marked_count
    
    with open('server/user_clicks.json', 'w') as file:
        json.dump(user_clicks, file)
    
    return jsonify(success=True, message="Count updated successfully.")

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000, ssl_context='adhoc')