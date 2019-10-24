import React from 'react';
import ReactMarkdown from 'react-markdown';

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

export default function App() {
  const [notes, setNotes] = React.useState(items)
  const [activeNote, setActiveNote] = React.useState({
    id: 1,
    title: "",
    content: ""
  })
  const [editable, setEditable] = React.useState(true)

  function openNote(key = 1) {
    return setActiveNote(notes.find(note => note.id === key))
  }

  function cancel() {
    setActiveNote(notes.find(note => note.id === activeNote.id))
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

  function updateNote() {
    let index = notes.findIndex(note => note.id === activeNote.id)
    console.log(index)
    setNotes([
      ...notes.slice(0, index),
      activeNote,
      ...notes.slice(index + 1)
    ])
    setEditable(false)
  }

  function deleteNote() {
    let index = notes.findIndex(note => note.id === activeNote.id)
    setNotes([
      ...notes.slice(0, index),
      ...notes.slice(index + 1)
    ])
  }

  return (
    <div className="h-screen">
      <header className="bg-blue-500">
        <div className="h-16 mx-auto px-12 flex justify-between items-center text-blue-100">
          <div><a href="#">App</a></div>
          <ul className="flex">
            <li className="ml-6"><a href="#">Settings</a></li>
            <li className="ml-6"><a href="#">Username</a></li>
          </ul>
        </div>
      </header>
      <div className="border-2 flex h-max bg-gray-300">
        <div className="w-1/5 overflow-y-scroll">
          <div className="h-12 pl-2 flex items-center border-b border-gray-400 hover:bg-gray-400">
            <a className="flex" href="#">
              <svg className="fill-current text-blue-600 h-6 w-6 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
              </svg>
              <span className="pl-2">Add Note</span>
            </a>
          </div>
          { 
            notes.map(note => (
              <a href="#" className="" onClick={() => openNote(note.id)}>
                <div className="h-auto pl-2 py-4 items-center border-b border-gray-400 hover:bg-gray-400">
                  <h1 className="text-lg font-semibold pb-1">{note.title}</h1>
                  <p className="h-6 text-gray-600 overflow-hidden">{note.content}</p>
                </div>
              </a>
            ))
          }
        </div>
        { !editable
        ? <div className="w-4/5 pt-4 pl-4 flex flex-col"> 
            <div className="flex-1 overflow-y-scroll">
              <h1 className="text-3xl border-b border-teal-500 mb-2 px-4 inline-block">{activeNote.title}</h1>
              <ReactMarkdown className="markdown" source={activeNote.content.replace('\n', '')} escapeHtml={false}/>
            </div>
            <div className="h-16 border-t border-teal-500 -ml-4 bg-gray-100 flex items-center justify-end">
              <a href="#update" onClick={() => setEditable(!editable)} className="py-2 px-6 mx-2 rounded-lg bg-teal-700 text-teal-200 hover:text-teal-100 hover:bg-teal-800">Update</a>
              <a href="#delete" onClick={deleteNote} className="py-2 px-6 mx-2 rounded-lg bg-red-700 text-red-200 hover:text-red-100 hover:bg-red-800">Delete</a>
            </div>
          </div>
        : <div className="w-4/5 bg-indigo-100 flex flex-col">
            <div className="flex-1 ">
              <input className="w-full h-16 pl-8 pt-4 text-3xl border-b border-teal-500" onChange={changeTitle} type="text" value={activeNote.title} placeholder="Note Title"></input>
              <textarea className="w-full h-full overflow-y-scroll pl-4 pt-4" onChange={changeContent} defaultValue={activeNote.content}></textarea>
            </div>
            <div className="h-16 border-t border-teal-500 -ml-4 bg-gray-100 flex items-center justify-end">
              <button href="#update" onClick={updateNote} className="py-2 px-6 mx-2 rounded-lg bg-teal-700 text-teal-200 hover:text-teal-100 hover:bg-teal-800">Update</button>
              <a href="#delete" onClick={cancel} className="py-2 px-6 mx-2 rounded-lg bg-gray-300 hover:text-gray-900 hover:bg-gray-400">Cancel</a>
            </div>
          </div> }
      </div>
    </div>
  );
}
