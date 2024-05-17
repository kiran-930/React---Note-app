// NoteList.js
import React, { useState, useEffect } from 'react';

const NoteList = ({ notes, deleteNote, updateNote }) => {
  return (
    <div className=' mt-2'>
      <h2 className='fw-bolder text-center text-muted'>Notes</h2> 
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              {note.text}
              <button className='btn btn-danger ms-2 mt-2' onClick={() => deleteNote(note.id)}>Delete</button>
              <button className='btn btn-success ms-2 mt-2' onClick={() => updateNote(note)}>Edit</button>
            </li>
          ))}
        </ul>
     
    </div>
  );
};

export default NoteList;
