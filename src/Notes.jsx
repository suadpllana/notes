import React from 'react'
import {useState , useEffect} from "react"
const Notes = () => {
    const [notes, setNotes] = useState(() => {
     const notesData = localStorage.getItem("notesData");
     return notesData ? JSON.parse(notesData) : []   
    })
    const [storedNotes, setStoredNotes]  = useState(() => {
        const notesData = localStorage.getItem("notesData");
        return notesData ? JSON.parse(notesData) : []
    })
    
    const [ title,setTitle] = useState("")
  
        useEffect(() => {
            localStorage.setItem("notesData" , JSON.stringify(notes)
            )
        } ,[notes])
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
        setStoredNotes((prev) => [
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
        setStoredNotes(filteredNotes)
    }
    function handleFilterNotes(text) {

        const filteredNotes = storedNotes.filter(note => note.title.includes(text));
        setNotes(filteredNotes);
    }
    function saveNote(text, id){
        setNotes((prev) => 
            prev.map((n) => n.id === id ? {...n , title: text} : n)
         )
         setStoredNotes((prev) => 
            prev.map((n) => n.id === id ? {...n , title: text} : n)
         )
        
        
        }

        function getCurrentDate(){
            const months = ["January", "February" , "March","April","May","June","July","August","September","October","November","December"]
            const date = new Date();
            const monthIndex = date.getMonth();
            const year = date.getFullYear();
            const day = date.getDate();

            return `${year}/${day}/${months[monthIndex]}`

        }




  return (
    <div>
       <h1>📒Notes</h1>
    <button id="addNote" onClick={addNote}>Create Note</button><br />
    <input className="search-input" type="text" placeholder="Search for a text in the note" name="" id="" onChange={(e) => handleFilterNotes(e.target.value)}/>
    <div id="notesContainer">
        {notes.map((note) => (
 <div key={note.id}>
    
    <textarea defaultValue={note.title} onChange={(e) => saveNote(e.target.value , note.id)} cols="40" rows="10">
    
    </textarea><br/>
    <p className="currentDate">{getCurrentDate()}</p>
    

 <button className="delete" onClick={() => deleteNote(note.id)}>🗑️</button>
 </div>

        ))}
       
          
    </div>
    </div>
  )
}

export default Notes
