from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_cors import cross_origin
import ollama

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

@app.route("/generate", methods=["POST"])
@cross_origin(origin="http://localhost:3000")
def generate_text():
    info=request.json
    prompt = "only provide sql query no other thing for"+info.get('data')
    prompt = prompt.lower()
    response = ollama.chat(model='llama3', messages=[{'role': 'user', 'content':prompt}])
    ans = response['message']['content']
    print(ans)
    return jsonify({
        "output": ans,
    })

if __name__ == "__main__":
    app.run(debug=True)