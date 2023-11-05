import React, { useState, useEffect,useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import './NotesPage.css';

const NotesPage = () => {
    const context = useContext(noteContext);
    const {theme,notes,addNote,isAddingNote, setIsAddingNote, getNotes, loginState,setLoginState, auth_token,setAuthToken} = context;
    const [action, setAction] = useState("");
    const redirect = useNavigate();
    useEffect( () => {
        let token = localStorage.getItem("auth-token");
        if(token!==null){
            console.log("Valid token found");
            console.log(token);
            setLoginState(true);
            setAuthToken(token);
        }
        else{
            redirect("/login")
        }
    },[loginState]);
    useEffect(()=>{
        console.log("Auth: "+auth_token)
        if(auth_token!==""){
            getNotes();
        }
    },[auth_token])
    return (
        <div>
            {isAddingNote && <AddNote action={action} />}
            <div className="page-body">
                <div className={`notes-container ${(theme==="light")?"":"dark-box-container"}`}>
                    <div className="text-large">
                        Your notes
                    </div>
                    <div id="notes-box">
                        {(notes.length === 0) ? "No notes to show" :
                            notes.map((note) => {
                                return <NoteItem setAction={setAction} key={note._id} note={note} />
                            })}
                    </div>
                </div>
                <div id="add-note-btn-div">
                    <div id="add-note-btn" onClick={()=>{
                        setAction("add");
                        setIsAddingNote(true);
                    }}>
                        <i className="fa-solid fa-note-sticky"></i>
                        <div id="add-note-btn-text">
                            Add new note
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotesPage