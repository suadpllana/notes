import React, { useState, useEffect } from "react";

const Notes = () => {
  const [notes, setNotes] = useState(() => {
    const notesData = localStorage.getItem("notesData");
    return notesData ? JSON.parse(notesData) : [];
  });
  
  const [storedNotes, setStoredNotes] = useState(notes); 
  const [title, setTitle] = useState("");


  useEffect(() => {
    if (notes.length > 0) {
      localStorage.setItem("notesData", JSON.stringify(notes));
    }
  }, [notes]);

  function addNote() {
    const newNote = {
      id: Math.random(),
      title: title,
    };

    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    setStoredNotes(updatedNotes); 
    setTitle(""); 
  }

  function deleteNote(id) {
    const updatedNotes = notes.filter((note) => note.id !== id);
    setNotes(updatedNotes);
    setStoredNotes(updatedNotes);
  }

  function handleFilterNotes(text) {
    if (text === "") {
      setNotes(storedNotes);
    } else {
      const filteredNotes = storedNotes.filter((note) =>
        note.title.toLowerCase().includes(text.toLowerCase())
      );
      setNotes(filteredNotes); 
    }
  }

  function saveNote(text, id) {
    const updatedNotes = notes.map((n) => (n.id === id ? { ...n, title: text } : n));
    setNotes(updatedNotes);
    setStoredNotes(updatedNotes); 
  }

  function getCurrentDate() {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    const date = new Date();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const day = date.getDate();

    return `${year}/${day}/${months[monthIndex]}`;
  }

  return (
    <div>
      <h1>📒Notes</h1>
      <button id="addNote" onClick={addNote}>
        Create Note
      </button>
      <br />
      <input
        className="search-input"
        type="text"
        placeholder="Search for a text in the note"
        onChange={(e) => handleFilterNotes(e.target.value)}
      />
      <div id="notesContainer">
        {notes.map((note) => (
          <div key={note.id}>
            <textarea
              value={note.title}
              onChange={(e) => saveNote(e.target.value, note.id)}
              cols="40"
              rows="10"
            ></textarea>
            <br />
            <p className="currentDate">{getCurrentDate()}</p>
            <button className="delete" onClick={() => deleteNote(note.id)}>
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notes;
