from flask import Flask, request, jsonify
import pymongo
import jwt
from bson.objectid import ObjectId

client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client["test-database"]
users = db["users"]
notes = db["notes"]

app = Flask(__name__)

"""Authorisation endpoint"""

@app.route("/api/auth/login",methods=["POST"])
def login():
    if request.method=="POST":
        username = request.json["username"]
        password = request.json["password"]
        if(users.count_documents({"username":username})==0):
            return jsonify({"status":404,"message":"No user found with the specified username"})
        else:
            x = users.find_one({"username":username})
            if(x["password"]==password):
                payload = {"user":str(x["_id"])}
                print(payload)
                token = jwt.encode(payload=payload,key="secret")
                return jsonify({"status":200,"auth-token":token ,"message":"User logged in"})
            else:
                return jsonify({"status":404,"message":"Invalid credentials"})

@app.route("/api/auth/signup",methods=["POST"])
def signup():
    if request.method=="POST":
        email = request.json["email"]
        name = request.json["name"]
        username = request.json["username"]
        password = request.json["password"]
        if(email=='' or name=='' or username=='' or password==''):
            return jsonify({"status":500,"message":"None of the fields cannot be empty"})

        if(users.count_documents({"email":email}) > 0):
            return jsonify({"status":401,"message":"User already exists"})
        else:
            user = {"email":email,"name":name,"username":username,"password":password}
            x = users.insert_one(user)
            if x.acknowledged:
                return jsonify({"status":200,"message":"User created"})

"""NOTES ENDPOINT"""
@app.route("/api/notes/fetchall",methods=["GET"])
def fetchall():
    if request.method=="GET":
        token = request.headers.get("auth-token")
        try:
            user = jwt.decode(token, key="secret",algorithms=["HS256"])["user"]
        except:
            return jsonify({"status":404,"message":"Invalid auth token"})

        userNotes = notes.find({"user":user})
        allNotes = []
        for i in userNotes:
            allNotes.append(i)
        for i in allNotes:
            i["_id"] = str(i["_id"])
        return jsonify({"status":200,"notes":allNotes})

@app.route("/api/notes/addnote",methods=["POST"])
def addnote():
    if request.method=="POST":
        token = request.headers.get("auth-token")
        title = request.json["title"]
        desc = request.json["desc"]
        try:
            user = jwt.decode(token, key="secret",algorithms=["HS256"])["user"]
        except:
            return jsonify({"status":404,"message":"Invalid auth token"})
        if title=="" or desc=="":
            return jsonify({"status":401,"message":"Neither title nor description cannot be empty"})
        note = {"user":user, "title":title,"desc":desc}
        x = notes.insert_one(note)
        if x.acknowledged:
            return jsonify({"status":200,"message":"Note added","note":{"title":title,"desc":desc}})

@app.route("/api/notes/editnote",methods=["PUT"])
def editnote():
    if request.method=="PUT":
        token = request.headers.get("auth-token")
        title = request.json["title"]
        desc = request.json["desc"]
        id = request.json["id"]
        try:
            user = jwt.decode(token, key="secret",algorithms=["HS256"])["user"]
        except:
            return jsonify({"status":404,"message":"Invalid auth token"})
        newNote = notes.find_one_and_update({"_id":ObjectId(id)},{"$set":{"title":title,"desc":desc}},return_document=pymongo.ReturnDocument.AFTER)
        print(newNote)
        newNote["_id"] = str(newNote["_id"])
        return jsonify({"status":201,"message":"note edited","note":newNote})

if __name__=="__main__":
    app.run(debug=True)