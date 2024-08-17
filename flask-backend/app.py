from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import mysql.connector
from mysql.connector import Error
import ollama

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

# Configure MySQL connection
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'your_username'
app.config['MYSQL_PASSWORD'] = 'your_password'
app.config['MYSQL_DATABASE'] = 'your_database'

# Initialize MySQL connection
def get_db_connection():
    connection = mysql.connector.connect(
        host=app.config['MYSQL_HOST'],
        user=app.config['MYSQL_USER'],
        password=app.config['MYSQL_PASSWORD'],
        database=app.config['MYSQL_DATABASE']
    )
    return connection

@app.route("/generate", methods=["POST"])
@cross_origin(origin="http://localhost:3000")
def generate_text():
    info = request.json
    prompt = "only provide sql query no other thing for " + info.get('data')
    prompt = prompt.lower()
    
    response = ollama.chat(model='llama3', messages=[{'role': 'user', 'content': prompt}])
    sql_query = response['message']['content']
    
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute(sql_query)
        result = cursor.fetchall()
        columns = [col for col in cursor.column_names]
        rows = result
        
        return jsonify({
            "columns": columns,
            "rows": rows,
        })
    except Error as e:
        return jsonify({"error": str(e)})
    finally:
        cursor.close()
        connection.close()

if __name__ == "__main__":
    app.run(debug=True,port=5001)
