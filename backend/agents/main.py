from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this
import asyncio
from dotenv import load_dotenv
from google.adk.runners import Runner
from google.adk.sessions import DatabaseSessionService

from study_abroad_planner.agent import root_agent as study_abroad_planner
from utils import call_agent_async

load_dotenv()

app = Flask(__name__)
CORS(app)  # Allow all origins, or use: CORS(app, resources={r"/chat": {"origins": "http://localhost:3000"}})

dburl = "sqlite:///./user_data.db"
session_service = DatabaseSessionService(db_url=dburl)

APP_NAME = "Study Abroad Planner"
USER_ID = "v05"

initial_state = {
    "user_name": "",
    "selected_college": [],
    "interaction_history": [],
    "academic_percentage": "",
    "letters_of_recommendation": "",
    "budget": "",
    "standardised_test_score": ""
}

runner = Runner(
    agent=study_abroad_planner,
    app_name=APP_NAME,
    session_service=session_service,
)

async def get_or_create_session():
    existing_sessions = await session_service.list_sessions(
        app_name=APP_NAME,
        user_id=USER_ID,
    )
    if existing_sessions and len(existing_sessions.sessions) > 0:
        return existing_sessions.sessions[0].id
    else:
        new_session = await session_service.create_session(
            app_name=APP_NAME,
            user_id=USER_ID,
            state=initial_state,
        )
        return new_session.id

@app.route("/chat", methods=["POST"])
def chat():
    user_input = request.json.get("message")
    if not user_input:
        return jsonify({"error": "Message is required"}), 400

    try:
        response = asyncio.run(handle_chat(user_input))
        return jsonify({"response": response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

async def handle_chat(user_input):
    session_id = await get_or_create_session()
    return await call_agent_async(runner, USER_ID, session_id, user_input)

if __name__ == "__main__":
    app.run(debug=True)
