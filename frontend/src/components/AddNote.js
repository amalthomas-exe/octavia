import React, { useState, useContext } from 'react'
import noteContext from '../context/notes/noteContext';
import './AddNote.css'

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { theme, addNote, setIsAddingNote, note, updateNote, editNote, noteToBeEdited } = context;
  const { action } = props;
  const [errorField, setErrorField] = useState("");
  const handleChange = (e) => {
    updateNote(note => ({
      ...note,
      [e.target.name]: e.target.value
    }))
  }

  const handleClick = (e) => {
    if (note.title == "" || note.desc == "") {
      if (note.title == "") {
        setErrorField("title");
      } else {
        setErrorField("desc");
      }
      return 0;
    }
    if (action === "edit") {
      editNote(noteToBeEdited, note.title, note.desc);
    }
    else {
      addNote(note.title, note.desc);
    }
    updateNote({ "title": "", "desc": "" })
    setIsAddingNote(false);
  }

  return (
    <div id="page-body">
      <div onClick={() => { updateNote({ "title": "", "desc": "" }); setIsAddingNote(false) }} id="btn-close"><i className="fa-solid fa-xmark"></i></div>
      <div id="modal-box">
        <div id="preview-box">
          {(note.title === "" && note.desc === "") ? <div id="no-note-text" className={(theme === "light") ? "" : 'text-dark'}>Add a note</div> :
            <div>
              <div id="preview-title" className={(theme === "light") ? "" : 'text-dark'}>{note.title}</div>
              <div id="preview-desc" className={(theme === "light") ? "" : 'text-dark'}>{note.desc}</div>
            </div>
          }
        </div>
        <div id="add-note-box" className={(theme === "light") ? "light-box-container" : 'dark-box-container'}>
          <div id="add-note-div">
            <div className="entry-field">
              <div className="text-small">Title</div>
              <input value={note.title} onChange={handleChange} className={`entry-field-input ${(theme === "light") ? "" : "field-dark"}`} type="text" name="title" id="title" />
              {(errorField === "title") && <div style={{ "color": "rgb(201, 99, 99)" }}>Title cannot be blank</div>}
            </div>
            <div className="entry-field">
              <div className="text-small">Description</div>
              <textarea value={note.desc} onChange={handleChange} className={`entry-field-input ${(theme === "light") ? "" : "field-dark"}`} type="text" name="desc" id="desc" />
              {(errorField === "desc") && <div style={{ "color": "rgb(201, 99, 99)" }}>Description cannot be blank</div>}
            </div>
            <div id="submit-btn-div">
              <button id="submit-btn" onClick={handleClick}>{(action === "edit") ? "Edit" : "Add"} note</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNote