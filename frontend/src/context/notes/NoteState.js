import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = [];
  const [theme,setTheme] = useState("light");
  const [notes, setNotes] = useState(notesInitial)
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [note, updateNote] = useState({ "title":"", "desc": "" })
  const [noteToBeEdited, setNoteToBeEdited] = useState("");
  const [noteToBeDeleted, setNoteToBeDeleted] = useState("");
  const [loginState, setLoginState] = useState(false);
  const [auth_token,setAuthToken] = useState("");
  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchall`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": auth_token
      }
    });
    const json = await response.json()
    console.log(json.notes)
    setNotes(json.notes)
  }

  // Add a Note
  const addNote = async (title, desc) => {
    console.log(title+desc)
    const body = {"title":title,"desc":desc}
    const response = await fetch(`${host}/api/notes/addnote`,{
      method:"POST",
      headers:{
        'Content-Type': 'application/json',
        "auth-token":auth_token
      },
      body: JSON.stringify(body)
    })

    const json = await response.json()
    setNotes(notes.concat(json.note));
  }

  // Delete a Note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`${host}/api/notes/deletenote`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": auth_token
      },
      body:JSON.stringify({"id":id})
    });
    const json = response.json(); 
    console.log(json)
    const newNotes = notes.filter((note) => { return note._id !== noteToBeDeleted })
    setNotes(newNotes)
  }

  // Edit a Note
  const editNote = async (id, title, desc) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/editnote`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": auth_token
      },
      body: JSON.stringify({"id":id,"title":title,"desc":desc})
    });
    const json = await response.json(); 
    console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes))
    // Logic to edit in client
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].desc = desc;
        break; 
      }
    }  
    setNotes(newNotes);
  }

  //Login user
  const loginUser = async (username, password)=>{
    const response = await fetch(`${host}/api/auth/login`,{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({"username":username,"password":password})
    });
    let json = await response.json();
    console.log(json.status)
    if(json.status===404){
      console.log("Invalid creds");
      return false;
    }else{
      let auth_token = json["auth-token"];
      localStorage.setItem("auth-token",auth_token);
      setAuthToken(auth_token);
      return true;
    }
  }

  return (
    <noteContext.Provider value={{auth_token,setAuthToken,loginUser,loginState, setLoginState,noteToBeDeleted, setNoteToBeDeleted,noteToBeEdited, setNoteToBeEdited,note,updateNote,theme,setTheme,isAddingNote,setIsAddingNote, notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </noteContext.Provider>
  )

}
export default NoteState;