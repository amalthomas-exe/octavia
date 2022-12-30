from flask import Flask, request, jsonify
import pymongo

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["test-database"]
users = db["users"]
notes = db["notes"]

app = Flask(__name__)

"""Authorisation endpoint"""

@app.route("/api/login",methods=["POST"])
def login():
    if request.method=="POST":
        username = request.json["username"]
        password = request.json["password"]
        if(users.count_documents({"username":username})==0):
            return jsonify({"status":404,"message":"No user found with the specified username"})
        else:
            x = users.find_one({"username":username})
            if(x["password"]==password):
                return jsonify({"status":200,"message":"User logged in"})
            else:
                return jsonify({"status":404,"message":"Invalid credentials"})

@app.route("/api/signup",methods=["POST"])
def signup():
    if request.method=="POST":
        email = request.json["email"]
        name = request.json["name"]
        username = request.json["username"]
        password = request.json["password"]
        if(users.count_documents({"email":email}) > 0):
            return jsonify({"status":401,"message":"User already exists"})
        else:
            user = {"email":email,"name":name,"username":username,"password":password}
            x = users.insert_one(user)
            if x.acknowledged:
                return jsonify({"status":200,"message":"User created"})

"""NOTES ENDPOINT"""


if __name__=="__main__":
    app.run(debug=True)