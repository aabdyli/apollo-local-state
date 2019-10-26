import React from 'react'

export default function NoteList({notes, onOpenNote}) {
  return (
    <>
      { 
        notes.sort((a, b) => b.id > a.id).map(note => (
          <a href="#" key={note.id} className="focus:bg-gray-400" onClick={() => onOpenNote(note.id)}>
            <div className="h-auto pl-2 py-4 items-center border-b border-gray-400 hover:bg-gray-400">
              <h1 className="text-lg font-semibold pb-1">{note.title}</h1>
              <p className="h-6 text-gray-600 overflow-hidden">{note.content}</p>
            </div>
          </a>
        ))
      }
    </>
  )
}