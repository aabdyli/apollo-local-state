import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import NoteViewer from './components/NoteViewer'
import NoteEditor from './components/NoteEditor';
import {gql} from 'apollo-boost'
import {useQuery, useMutation} from 'react-apollo'

const GET_NOTES = gql`
query getNotes{
  notes{
    id
    title
  }
}
`

const items = [
  {
    id: 1,
    title: "Note 1",
    content: `# Live demo`
  },
  {
  id: 2,
  title: "Note 2",
  content: `# Live demo`}
];

let id = 3;

export default function App() {

  
  // State
  const [notes, setNotes] = React.useState([])
  const [activeNote, setActiveNote] = React.useState({title: '', content: ''})
  const [editable, setEditable] = React.useState(true)
  
  // GraphQL
  const query = useQuery(GET_NOTES)

  // Mounting emulating network lag
  React.useEffect(() => {
    setTimeout(() => setNotes(items), 850)
  }, [])

  // Mutations
  function cancel() {
    const note = notes.find(note => note.id === activeNote.id)
    if(note) {
      setActiveNote(note)
    } else {
      newNote()
    }
    return setEditable(!editable)
  }

  function changeTitle(e) {
    return setActiveNote(Object.assign({}, activeNote, {
      title: e.target.value
    }))
  }
  
  function changeContent(e) {
    return setActiveNote(Object.assign({}, activeNote, {
      content: e.target.value
    }))
  }

  function openNote(key = 1) {
    setActiveNote(notes.find(note => note.id === key))
    setEditable(false)
  }
  
  function updateNote() {
    let index = notes.findIndex(note => note.id === activeNote.id)
    if(index !== -1) {
      setNotes([
        ...notes.slice(0, index),
        activeNote,
        ...notes.slice(index + 1)
      ])
    } else if (index === -1) {
      setNotes([
        ...notes,
        Object.assign({}, activeNote, {id: id++}),
      ])
    }
    setEditable(false)
  }

  function deleteNote() {
    let index = notes.findIndex(note => note.id === activeNote.id)
    setNotes([
      ...notes.slice(0, index),
      ...notes.slice(index + 1)
    ])
    newNote()
  }
  function newNote() {
    setActiveNote({title: '', content: ''})
    setEditable(true)
  }
  
  console.log(query)
  return (
    <div className="h-screen">
      <Header />
      <div className="border-2 flex h-max bg-gray-300">
        <Sidebar onNewNote={newNote} notes={notes} onOpenNote={openNote}/>
        { !editable
        ? <NoteViewer 
            note={activeNote}
            onUpdateClick={() => setEditable(!editable)}
            onDeleteNote={deleteNote}
          />
        : <NoteEditor
            note={activeNote}
            onChangeTitle={changeTitle} 
            onChangeContent={changeContent}
            onCancel={cancel}
            onUpdateNote={updateNote}
          />
        }
      </div>
    </div>
  );
}
