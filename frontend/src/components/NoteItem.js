import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import './NoteItem.css'

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {setIsAddingNote, updateNote} = context;
  const {setAction,note} = props;
  return (
        <div id="note-item-box">
          <div id="note-header">
          <div id="note-title">{note.title}</div>
          <div id="note-controls">
            <div className="control-btn" onClick={()=>{setAction("edit");updateNote({"title":note.title,"desc":note.desc});setIsAddingNote(true)}}><i class="fa-solid fa-pen-to-square"></i></div>
            <div className="control-btn"><i class="fa-solid fa-trash"></i></div>
          </div>
          </div>
            <div id="note-desc">{note.desc}</div>
        </div>
  )
}

export default NoteItem