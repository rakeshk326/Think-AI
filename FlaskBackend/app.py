from flask import Flask, jsonify, request
from flask_cors import CORS
from google import genai
from google.genai import types
import os

app = Flask(__name__)
CORS(app, supports_credentials=True, origins=["http://localhost:5173"])
geminiClient = genai.Client()
geminiClient = genai.Client(api_key=os.environ["GOOGLE_API_KEY"])

chat_history = []

def isSafePrompt(prompt) :
    try :
        response = geminiClient.models.generate_content(
            model="gemini-2.0-flash",
            contents=[prompt],
            config=types.GenerateContentConfig(
            safety_settings=[
                types.SafetySetting(
                    category=types.HarmCategory.HARM_CATEGORY_HATE_SPEECH,
                    threshold=types.HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
                ),
            ]
            )
        )

        print("Inside issafe method : ", response)

        for rating in response.candidates[0].safety_ratings:
            if rating.probability not in ["NEGLIGIBLE", "LOW"]:
                return False
        return True

    except Exception as e :
        print(e)


@app.route('/prompt/gemini', methods=['POST'])
def home():

    prompt = request.form.get("Prompt", "")
    file_received = request.files.get("File")

    print("Prompt : ", prompt)
    
    try :
        if file_received :
            project_root = os.path.dirname(os.path.abspath(__file__))  
            temp_path = os.path.join(project_root, "temp", file_received.filename)
            os.makedirs(os.path.dirname(temp_path), exist_ok=True)  
            file_received.save(temp_path)
            uploaded_file = geminiClient.files.upload(file=temp_path)
            os.remove(temp_path)

            chat_history.append(f"User : {prompt}, Fileuploaded : {uploaded_file}")
            print(f"User : {prompt}, Fileuploaded : {uploaded_file}")
            response = geminiClient.models.generate_content(
                model="gemini-2.5-flash",
                contents=[uploaded_file, prompt]
            )
            print(response.text)
        else :
            if not isSafePrompt(prompt) :
                print("Before printing offensive prompt")
                return jsonify({"message": "Offensive prompt"}), 200
            chat_history.append(f"User : {prompt}")
            response = geminiClient.models.generate_content(
                model="gemini-2.5-flash",
                contents=chat_history,
            )
        chat_history.append(f"Gemini : {response.text}")
        return jsonify({"message": response.text}), 200
    except ValueError as e :
        return jsonify({"Error response": str(e)}), 400
    except RuntimeError as e :
        return jsonify({"Error response": f"Gemini API error : {str(e)}"}), 502
    except Exception as e :
        return jsonify({"Error response": f"Internal server error Error : {str(e)}"}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)