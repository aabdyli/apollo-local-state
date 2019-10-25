import React from 'react'
import ReactMarkdown from 'react-markdown'

export default function NoteViewer({note, onUpdateClick, onDeleteNote}) {
  return (
    <div className="w-4/5 pt-4 pl-4 flex flex-col"> 
      <div className="flex-1 overflow-y-scroll">
        <h1 className="text-3xl border-b border-teal-500 mb-2 px-4 inline-block">{note.title}</h1>
        <ReactMarkdown className="markdown" source={note.content.replace('\n', '')} escapeHtml={false}/>
      </div>
      <div className="h-16 border-t border-teal-500 -ml-4 bg-gray-100 flex items-center justify-end">
        <a href="#update" onClick={onUpdateClick} className="py-2 px-6 mx-2 rounded-lg bg-teal-700 text-teal-200 focus:outline-none focus:shadow-outline hover:text-teal-100 hover:bg-teal-800">Update</a>
        <a href="#delete" onClick={onDeleteNote} className="py-2 px-6 mx-2 rounded-lg bg-red-700 text-red-200 focus:outline-none focus:shadow-outline hover:text-red-100 hover:bg-red-800">Delete</a>
      </div>
    </div>
  )
}