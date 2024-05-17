// NoteForm.js
import React, { useState } from 'react';

const NoteForm = ({ addNote, updateNote, noteToEdit }) => {
  const [text, setText] = useState(noteToEdit ? noteToEdit.text : '');

  const handleSubmit = e => {
    e.preventDefault();
    if (!text.trim()) {
      alert('Please enter a note.');
      return;
    }
    if (noteToEdit) {
      updateNote({ id: noteToEdit.id, text });
    } else {
      addNote({ text });
    }
    setText('');
  };

  return (
    <form className='mt-2' onSubmit={handleSubmit}>
      <input
      className='note-input'
        type="text"
        placeholder="Enter your note..."
        value={text}
        onChange={e => setText(e.target.value)}
      />
      <button className='btn btn-dark ms-2' type="submit">{noteToEdit ? 'Update Note' : 'Add Note'}</button>
    </form>
  );
};

export default NoteForm;
