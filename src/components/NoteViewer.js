import React from 'react'
import ReactMarkdown from 'react-markdown'
import {LOCAL_STATE_QUERY, GET_NOTES, SET_EDITABLE, CLEAR_ACTIVE} from '../helpers/localGql'
import {useQuery, useMutation} from 'react-apollo'
import gql from 'graphql-tag'

const DELETE_NOTE = gql`
mutation deleteNote($where: NoteWhereUniqueInput!) {
  deleteNote(where: $where) {
    id
  }
}
`

export default function NoteViewer() {
  const {data: {activeNote: note}} = useQuery(LOCAL_STATE_QUERY)
  const [deleteNote] = useMutation(DELETE_NOTE)
  const [setEditable] = useMutation(SET_EDITABLE)
  const [clearActive] = useMutation(CLEAR_ACTIVE)

  function removeNote (){
    deleteNote({
      variables: { where: {id: note.id}},
      update: (cache, {data: {deleteNote}}) => {
        const {notes} = cache.readQuery({query: GET_NOTES})
        const newNotes = notes.filter(note => note.id !== deleteNote.id)
        cache.writeQuery({query: GET_NOTES, data: {notes: newNotes}})
      }
    })
    clearActive()
    setEditable({variables: {state: true}})
  }

  return (
    <div className="w-4/5 pt-4 pl-4 flex flex-col"> 
      <div className="flex-1 overflow-y-scroll">
        <h1 className="text-3xl border-b border-teal-500 mb-2 px-4 inline-block">{note.title}</h1>
        <ReactMarkdown className="markdown" source={note.content.replace('\n', '')} escapeHtml={false}/>
      </div>
      <div className="h-16 border-t border-teal-500 -ml-4 bg-gray-100 flex items-center justify-end">
        <button href="#update" onClick={() => setEditable({variables:{state: true}})} className="btn btn-success">Update</button>
        <button href="#delete" onClick={removeNote} className="btn btn-danger">Delete</button>
      </div>
    </div>
  )
}