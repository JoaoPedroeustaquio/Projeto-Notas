import { ChangeEvent, useState } from "react";
import Logo from "./assets/Logo.svg";
import { NewNoteCard } from "./componentes/New-Note-Card";
import { NoteCard } from "./componentes/Note-card";

interface notes{
  id: string,
  data: Date,
  content: string
}


export function App() {
    const [search, setSearch] = useState('')

    const [notes, setNotes] = useState<notes[]>(() => {
      const notesOnStorege = localStorage.getItem('Notes')

      if (notesOnStorege){
        return JSON.parse(notesOnStorege)
      }

      return[]
    })

    function onNoteCreat(content: string) {
      const newNote = {
        id: crypto.randomUUID(),
        data: new Date(),
        content,
      }
      
      const notesArrey= [newNote, ...notes]

      setNotes(notesArrey)

      localStorage.setItem('Notes', JSON.stringify(notesArrey))
    }

    function onNoteDelete( id: string) {
      const notesArrey = notes.filter(notes => {
        return notes.id !== id
      })
      setNotes(notesArrey)

      localStorage.setItem('Notes', JSON.stringify(notesArrey))
    }

    function handleSearch(event: ChangeEvent<HTMLInputElement>){
      const querry = event.target.value

      setSearch(querry)
    }

    const filteredNotes = search !== '' 
    ? notes.filter(note => note.content.toLowerCase().includes(search.toLowerCase())) 
    : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-6 px-5">
      <img src={Logo} alt="nlw-experte" />
      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreat={onNoteCreat} />

        {filteredNotes.map(note => {
          return <NoteCard key={note.id} note={note} onNoteDelete={onNoteDelete} />
        })}
          
         
        
      </div>
      </div>
  );
}
