import React from 'react'

export default function Header() {
  return (
    <header className="bg-blue-500">
      <div className="h-16 mx-auto px-12 flex justify-between items-center text-blue-100">
        <div><a href="#">Mark My Note</a></div>
        <ul className="flex">
          <li className="ml-6"><a href="#">Settings</a></li>
          <li className="ml-6"><a href="#">Username</a></li>
        </ul>
      </div>
    </header>
  )
}
