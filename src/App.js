import React from 'react'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import NoteViewer from './components/NoteViewer'
import NoteEditor from './components/NoteEditor';

const items = [
  {
    id: 1,
    title: "Note 1",
    content: `
# Live demo

Changes are automatically rendered as you type.

## Table of Contents`
  },
  {
  id: 2,
  title: "Note 2",
  content: `
# Live demo

Changes are automatically rendered as you type.

## Table of Contents

* Implements [GitHub Flavored Markdown](https://github.github.com/gfm/)
* Renders actual, "native" React DOM elements
* Allows you to escape or skip HTML (try toggling the checkboxes above)
* If you escape or skip the HTML, no \`dangerouslySetInnerHTML\` is used! Yay!

## HTML block below

<blockquote>
  This blockquote will change based on the HTML settings above.
</blockquote>

## How about some code?
\`\`\`js
var React = require('react');
var Markdown = require('react-markdown');

React.render(
  <Markdown source="# Your markdown here" />,
  document.getElementById('content')
);
\`\`\`

Pretty neat, eh?

## Tables?

| Feature   | Support |
| --------- | ------- |
| tables    | ✔ |
| alignment | ✔ |
| wewt      | ✔ |

## More info?

Read usage information and more on [GitHub](//github.com/rexxars/react-markdown)

---------------

A component by [Espen Hovlandsdal](https://espen.codes/)`
  }
];

let id = 3;

export default function App() {
  const [notes, setNotes] = React.useState(items)
  const [activeNote, setActiveNote] = React.useState(notes[0])
  const [editable, setEditable] = React.useState(false)

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
            onUpdateNote={updateNote}
            onCancel={cancel}
          />
        }
      </div>
    </div>
  );
}
