import React from 'react'
import { useMutation } from 'react-apollo'
import { SET_EDITABLE, CLEAR_ACTIVE } from '../helpers/localGql'

export default function NewNote() {

  const [updateActiveNote] = useMutation(CLEAR_ACTIVE)
  const [setEditable] = useMutation(SET_EDITABLE)

  function createNewNote() {
    const note = {
      id: '',
      title: '',
      content: '',
      __typename: 'Note'
    }
    updateActiveNote({variables: {
      activeNote: note
    }})
    setEditable({variables: {state: true}})
  }

  return (
    <button onClick={createNewNote} className="outline-none bg-gray-300 focus:bg-gray-400 sticky top-0 block w-full">
      <div className="h-12 pl-2 flex items-center border-b border-gray-400 hover:bg-gray-400">
        <svg className="fill-current text-blue-600 h-6 w-6 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
        </svg>
        <span className="pl-2">Add Note</span>
      </div>
    </button>
  )
}