import React,{useContext,useEffect} from 'react'
import noteContext from '../context/notes/noteContext'
import './NoteItem.css'

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const {setIsAddingNote, updateNote,noteToBeDeleted,setNoteToBeEdited, setNoteToBeDeleted,deleteNote} = context;
  const {setAction,note} = props;

  useEffect(()=>{
      deleteNote(noteToBeDeleted)
  },[noteToBeDeleted])

  const handleDeleteClick = ()=>{
    setNoteToBeDeleted(note._id)
  }

  return (
        <div id="note-item-box">
          <div id="note-header">
          <div id="note-title">{note.title}</div>
          <div id="note-controls">
            <div className="control-btn" onClick={()=>{setAction("edit");updateNote({"title":note.title,"desc":note.desc});setNoteToBeEdited(note._id);setIsAddingNote(true)}}><i class="fa-solid fa-pen-to-square"></i></div>
            <div className="control-btn" onClick={handleDeleteClick}><i class="fa-solid fa-trash"></i></div>
          </div>
          </div>
            <div id="note-desc">{note.desc}</div>
        </div>
  )
}

export default NoteItem