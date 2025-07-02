import React from 'react';
import './Components.css';

const NoteCard = ({ title, content }) => {
  return (
    <div className="note-card">
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default NoteCard;
