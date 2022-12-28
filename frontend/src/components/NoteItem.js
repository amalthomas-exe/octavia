import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
import './NoteItem.css'

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {setIsAddingNote} = context;
  return (
        <div id="note-item-box">
          <div id="note-header">
          <div id="note-title">{props.title}</div>
          <div id="note-controls">
            <div className="control-btn" onClick={()=>{setIsAddingNote(true)}}><i class="fa-solid fa-pen-to-square"></i></div>
            <div className="control-btn"><i class="fa-solid fa-trash"></i></div>
          </div>
          </div>
            <div id="note-desc">{props.desc}</div>
        </div>
  )
}

export default NoteItem