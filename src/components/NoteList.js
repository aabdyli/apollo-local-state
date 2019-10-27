import React from 'react'
import { useQuery, useMutation } from 'react-apollo'
import {UPDATE_ACTIVE_NOTE_MUTATION, GET_NOTES} from '../helpers/localGql'

export default function NoteList() {
  const {data, loading, error } = useQuery(GET_NOTES)
  const [updateActiveNote] = useMutation(UPDATE_ACTIVE_NOTE_MUTATION)

  function changeActiveNote(note) {
    updateActiveNote({variables: {note}})
  }
  
  if(error) return <p>Error</p>
  if(loading) return <p>Loading...</p>
  const {notes} = data
  return (
    <>
      { 
        notes.sort((a, b) => b.id > a.id).map(note => (
          <button key={note.id} className="text-left outline-none bg-gray-300 focus:bg-gray-400 sticky top-0 block w-full" onClick={() => changeActiveNote(note)}>
            <div className="h-auto pl-2 py-4 items-center border-b border-gray-400 hover:bg-gray-400">
              <h1 className="text-lg font-semibold pb-1">{note.title}</h1>
              <p className="h-6 text-gray-600 overflow-hidden">{note.content}</p>
            </div>
          </button>
        ))
      }
    </>
  )
}