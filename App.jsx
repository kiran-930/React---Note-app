// App.js
import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';
import './styles.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [noteToEdit, setNoteToEdit] = useState(null);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    fetch('https://noteapp-server-vrzj.onrender.com/notes')
      .then(response => response.json())
      .then(data => setNotes(data));
  };

  const addNote = note => {
    fetch('https://noteapp-server-vrzj.onrender.com/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(note)
    })
      .then(response => response.json())
      .then(data => {
        setNotes([...notes, data]);
      });
  };

  const deleteNote = id => {
    fetch(`https://noteapp-server-vrzj.onrender.com/notes/${id}`, {
      method: 'DELETE'
    }).then(() => {
      setNotes(notes.filter(note => note.id !== id));
    });
  };

  const updateNote = updatedNote => {
    fetch(`https://noteapp-server-vrzj.onrender.com/notes/${updatedNote.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedNote)
    }).then(() => {
      const updatedNotes = notes.map(note =>
        note.id === updatedNote.id ? { ...note, text: updatedNote.text } : note
      );
      setNotes(updatedNotes);
      setNoteToEdit(null);
    });
  };

  return (
    <div className="container mt-5">
      <h1 className='fs-2 text-center fw-bolder text-dark'>Notepad</h1>
      <div className="center">
        <NoteForm addNote={addNote} updateNote={updateNote} noteToEdit={noteToEdit} />
        <NoteList notes={notes} deleteNote={deleteNote} updateNote={setNoteToEdit} />
      </div>
    </div>
  );
};

export default App;
