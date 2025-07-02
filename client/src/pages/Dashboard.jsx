import React, { useState } from 'react';
import './Pages.css';

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  const handleAddNote = () => {
    if (title && content) {
      const newNote = { title, content };

      if (editIndex !== null) {
        // Update note
        const updatedNotes = [...notes];
        updatedNotes[editIndex] = newNote;
        setNotes(updatedNotes);
        setEditIndex(null);
      } else {
        // Add new note
        setNotes([...notes, newNote]);
      }

      // Clear form
      setTitle('');
      setContent('');
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setTitle(notes[index].title);
    setContent(notes[index].content);
  };

  const handleDelete = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    if (editIndex === index) {
      setTitle('');
      setContent('');
      setEditIndex(null);
    }
  };

  return (
    <div className="dashboard">
      {/* <div className="dashboard-header">
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div> */}

      <h2>Your Notes</h2>

      <div className="note-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Note Content"
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button onClick={handleAddNote}>
          {editIndex !== null ? 'Update Note' : 'Add Note'}
        </button>
      </div>

      <div className="note-list">
        {notes.length === 0 ? (
          <p>No notes yet.</p>
        ) : (
          notes.map((note, index) => (
            <div className="note-card" key={index}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <div className="note-actions">
                <button onClick={() => handleEdit(index)}>Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(index)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
