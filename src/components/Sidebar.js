import React from 'react'
import NoteList from './NoteList'
import NewNote from './NewNote'


export default function Sidebar() {
  return (
    <div className="w-1/5 overflow-y-scroll">
      <NewNote />
      <NoteList />
    </div>
  )
}
