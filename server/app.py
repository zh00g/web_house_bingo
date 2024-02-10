from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)


@app.route("/update-count", methods=["POST"])
def update_count():
    data = request.json
    user_id = data["user_id"]
    marked_count = data["marked_count"]
    print("running", data)

    try:
        with open("server/user_clicks.json", "r") as file:
            user_clicks = json.load(file)
    except (FileNotFoundError, json.JSONDecodeError):
        user_clicks = {}

    user_clicks[user_id] = marked_count

    with open("server/user_clicks.json", "w") as file:
        json.dump(user_clicks, file)

    return jsonify(success=True, message="Count updated successfully.")


@app.route("/leaderboard", methods=["GET"])
def get_leaderboard():
    # Path to your JSON file
    filepath = "server/user_clicks.json"

    try:
        # Open the JSON file and load the data
        with open(filepath, "r") as file:
            scores = json.load(file)

        # Convert the scores dictionary into the desired list format
        users = [{"name": name, "score": score} for name, score in scores.items()]

        # Sort the list of users based on score in descending order
        sorted_users = sorted(users, key=lambda x: x["score"], reverse=True)

        # Add rankings
        for index, user in enumerate(sorted_users, start=1):
            user["id"] = index

        # Return the sorted list with rankings as JSON
        return jsonify(users=sorted_users)

    except FileNotFoundError:
        return jsonify(error="File not found"), 404
    except json.JSONDecodeError:
        return jsonify(error="Error decoding JSON"), 500


@app.get("/raffle")
def raffle_draw():
    # Path to your JSON file with scores
    filepath = "server/user_clicks.json"

    try:
        with open(filepath, "r") as file:
            scores = json.load(file)

        # Create a list of entries, with each user's name repeated by their score
        raffle_entries = [name for name, score in scores.items() for _ in range(score)]

        if not raffle_entries:
            raise ValueError("No entries in the raffle")

        # Randomly select a winner
        winner = random.choice(raffle_entries)

        # Return the winner's name
        return jsonify(winner=winner)

    except FileNotFoundError:
        return jsonify(error="File not found"), 404
    except json.JSONDecodeError:
        return jsonify(error="Error decoding JSON"), 500
    except ValueError as e:
        return jsonify(error=str(e)), 400
    except Exception as e:
        return jsonify(error=str(e)), 500


if __name__ == "__main__":
    app.run(host="192.168.0.227", debug=True)
