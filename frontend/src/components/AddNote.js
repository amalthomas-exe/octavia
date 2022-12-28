import React ,{useState, useContext} from 'react'
import noteContext from '../context/notes/noteContext';
import './AddNote.css'

const AddNote = () => {
  const context = useContext(noteContext);
  const {addNote, setIsAddingNote} = context;
  const [note,updateNote] = useState({"title":"","desc":""});
  const handleChange = (e)=>{
    updateNote(note=>({
      ...note,
      [e.target.name]:e.target.value
    }))
  }

  const handleClick = (e)=>{
    addNote(98,note.title,note.desc);
    setIsAddingNote(false);
  }
  return (
    <div id="page-body">
      <div onClick={()=>{setIsAddingNote(false)}} id="btn-close"><i className="fa-solid fa-xmark"></i></div>
      <div id="modal-box">
        <div id="preview-box">
          {(note.title==="" && note.desc==="")?<div id="no-note-text" className='text-dark'>Add a note</div>:
          <div>
            <div id="preview-title" className=' text-dark'>{note.title}</div>
            <div id="preview-desc" className=' text-dark'>{note.desc}</div>
          </div>
          }
        </div>
        <div id="add-note-box" className='dark-box-container'>
          <div id="add-note-div">
            <div className="entry-field">
              <div className="text-small">Title</div>
              <input onChange={handleChange} className="entry-field-input field-dark" type="text" name="title" id="title" />
            </div>
            <div className="entry-field">
              <div className="text-small">Description</div>
              <textarea onChange={handleChange} className="entry-field-input field-dark" type="text" name="desc" id="desc" />
            </div>
            <div id="submit-btn-div">
              <button id="submit-btn" onClick={handleClick}>Add note</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNote