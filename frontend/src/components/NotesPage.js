import React, { useState, useEffect,useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import './NotesPage.css';

const NotesPage = () => {
    const context = useContext(noteContext);
    const {notes,addNote,isAddingNote, setIsAddingNote} = context;
    const [loginState, setlogin] = useState(true);
    const redirect = useNavigate();
    useEffect(() => {
        if (!loginState) {
            redirect("/login");
        }
    });
    return (
        <div>
            {isAddingNote && <AddNote />}
            <div className="page-body">
                <div className="notes-container">
                    <div className="text-large">
                        Your notes
                    </div>
                    <div id="notes-box">
                        {(notes.length === 0) ? "No notes to show" :
                            notes.map((note) => {
                                return <NoteItem key={note.id} title={note.title} desc={note.desc} />
                            })}
                    </div>
                </div>
                <div id="add-note-btn-div">
                    <div id="add-note-btn" onClick={()=>{
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