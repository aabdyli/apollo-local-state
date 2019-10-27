import React from 'react'
import {useMutation, useQuery} from '@apollo/react-hooks'
import {LOCAL_STATE_QUERY, GET_NOTES, SET_EDITABLE} from '../helpers/localGql'
import gql from 'graphql-tag';

const CREATE_NOTE = gql`
  mutation createNote($note: NoteCreateInput!){
    createNote(data: $note){
      id
      title
      content
    }
  }
`

const UPDATE_NOTE = gql`
  mutation updateNote($data: NoteUpdateInput! ,$id: NoteWhereUniqueInput!){
    updateNote(data: $data, where: $id){
      id
      title
      content
    }
  }
`

export default function NoteEditor() {
  let title;
  let content;
  
  const {data: {activeNote}} = useQuery(LOCAL_STATE_QUERY)
  const [createNote] = useMutation(CREATE_NOTE)
  const [updateNote] = useMutation(UPDATE_NOTE)
  const [setEditable] = useMutation(SET_EDITABLE)

  function submitForm(event) {
    event.preventDefault()
    const note = {
      title: title.value,
      content: content.value,
    }
    if(activeNote.id) {
      updateNote({
        variables: {
          data: note,
          id: { id: activeNote.id}
        },
        update: (cache, {data: {updateNote}}) => {
          const {notes} = cache.readQuery({query: GET_NOTES})
          const newNotes = notes.filter(note => note.id !== updateNote.id)
          cache.writeQuery({
            query: GET_NOTES,
            data: { notes: newNotes.concat([updateNote])}
          })
        }
      })
    } else {
      createNote({
        variables: {
          note: note
        },
        update: (cache, {data: {createNote}}) => {
          const {notes} = cache.readQuery({query: GET_NOTES})
          cache.writeQuery({
            query: GET_NOTES,
            data: { notes: notes.concat([createNote])}
          })
          cache.writeQuery({
            query: LOCAL_STATE_QUERY,
            data: {activeNote: createNote}
          })
        },
      })
    }
    setEditable({variables: {state: false}})
  }
  function cancel() {
    if(activeNote.id) {
      return setEditable({variables:{state: false}})
    }
  }

  return (
    <div className="w-4/5 bg-indigo-100 flex flex-col">
      <form className="h-full flex flex-col" onSubmit={submitForm}>
        <div className="flex-1 flex flex-col">
          <input className="w-full h-16 pl-8 pt-4 text-3xl border-b border-teal-500" ref={node => (title = node)} type="text" defaultValue={activeNote.title} placeholder="Note Title"></input>
          <textarea className="w-full h-full overflow-y-scroll pl-4 pt-4 font-mono" ref={node => (content = node)} defaultValue={activeNote.content}></textarea>
        </div>
        <div className="flex-initial h-16 border-t border-teal-500 -ml-4 bg-gray-100 flex items-center justify-end">
          <button href="#update" type="submit" className="btn btn-success">Save</button>
          <button href="#delete" type="reset" onClick={cancel} className="btn">Cancel</button>
        </div>
      </form>
    </div>
  )
}
