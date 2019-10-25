import React from 'react'
import NoteList from './NoteList'
import NewNote from './NewNote'


export default function Sidebar({notes, onNewNote, onOpenNote}) {
  return (
    <div className="w-1/5 overflow-y-scroll">
      <NewNote onNewNote={onNewNote} />
      <NoteList notes={notes} onOpenNote={onOpenNote}/>
    </div>
  )
}
