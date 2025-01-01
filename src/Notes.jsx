import React from 'react'
import {useState , useEffect} from "react"
const Notes = () => {
    const [notes, setNotes] = useState(() => {
     const notesData = localStorage.getItem("notesData");
     return notesData ? JSON.parse(notesData) : []   
    })
    const [ title,setTitle] = useState("")

    useEffect(() => {
        localStorage.setItem("notesData" , JSON.stringify(notes))

    } ,[notes])
    

    function addNote(){
        setNotes((prev) => [
            ...prev , 
            {
                id:Math.random(),
                title: title
            }
        ])
      
    }
    function deleteNote(id){
        const filteredNotes = notes.filter((note) => note.id !== id);
        setNotes(filteredNotes);
    }


  return (
    <div>
       <h1>📒Notes</h1>
    <button id="addNote" onClick={addNote}>Create Note</button>
    <div id="notesContainer">
        {notes.map((note) => (
 <div key={note.id}>
 <textarea defaultValue={note.title} onChange={(e) => setNotes((prev) => 
    prev.map((n) => n.id === note.id ? {...n , title: e.target.value} : n)
 )} cols="40" rows="10"></textarea><br/>
 <button className="delete" onClick={() => deleteNote(note.id)}>🗑️</button>
 </div>

        ))}
       
          
    </div>
    </div>
  )
}

export default Notes
