import React from 'react'
import './NoteItem.css'

const NoteItem = (props) => {
  return (
        <div id="note-item-box">
            <div id="note-title">{props.title}</div>
            <div id="note-desc">{props.desc}</div>
        </div>
  )
}

export default NoteItem