import React from 'react'
import {useMutation} from '@apollo/react-hooks'
import {gql} from 'apollo-boost'

const ADD_NOTE = gql`
  mutation addNote($note: Note!) {
    addNote(note: $note) @client
  }
`;

const GET_NOTES = gql`
  query getNotes {
    notes: getNotes @client {
      id
      title
      content
    }
  }
`

export default function NoteEditor({note, onChangeTitle, onChangeContent, onUpdateNote, onCancel}) {
  const [addNote] = useMutation(
    ADD_NOTE,
    {variables: {note}}
  )

  return (
    <div className="w-4/5 bg-indigo-100 flex flex-col">
      <div className="flex-1 ">
        <input className="w-full h-16 pl-8 pt-4 text-3xl border-b border-teal-500" onChange={onChangeTitle} type="text" value={note.title} placeholder="Note Title"></input>
        <textarea className="w-full h-full overflow-y-scroll pl-4 pt-4" onChange={onChangeContent} value={note.content}></textarea>
      </div>
      <div className="h-16 border-t border-teal-500 -ml-4 bg-gray-100 flex items-center justify-end">
        <button href="#update" onClick={onUpdateNote} className="py-2 px-6 mx-2 rounded-lg bg-teal-700 text-teal-200 focus:outline-none focus:shadow-outline hover:text-teal-100 hover:bg-teal-800">Save</button>
        <a href="#delete" onClick={onCancel} className="py-2 px-6 mx-2 rounded-lg bg-gray-300 focus:outline-none focus:shadow-outline hover:text-gray-900 hover:bg-gray-400">Cancel</a>
      </div>
    </div>
  )
}
