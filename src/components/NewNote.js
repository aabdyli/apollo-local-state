import React from 'react'

export default function NewNote({onNewNote}) {
  return (
    <>
      <a onClick={onNewNote} className="outline-none bg-gray-300 focus:bg-gray-400 sticky top-0" href="#">
        <div className="h-12 pl-2 flex items-center  border-b border-gray-400  hover:bg-gray-400">
          <svg className="fill-current text-blue-600 h-6 w-6 inline-block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
          </svg>
          <span className="pl-2">Add Note</span>
        </div>
      </a>
    </>
  )
}