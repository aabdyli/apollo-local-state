import {gql} from 'apollo-boost'

export const LOCAL_STATE_QUERY = gql`
  query {
    activeNote @client{
      id
      title
      content
    }
  }
`

export const EDITABLE_NOTE = gql`
  query {
    editable @client
  }
`
export const SET_EDITABLE = gql`
  mutation setEditable($state: state) {
    setEditable(state: $state) @client
  }
`

export const UPDATE_ACTIVE_NOTE_MUTATION = gql`
  mutation updateActiveNote($note: NoteUpdateInput!){
    updateNote(note: $note) @client
  }
`

export const CLEAR_ACTIVE = gql`
  mutation clearActive{
    clearActive @client
  }
`

export const GET_NOTES = gql`
  query getNotes{
    notes{
      id
      title
      content
    }
  }
`
