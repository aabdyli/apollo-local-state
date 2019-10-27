import React from 'react'
import { useQuery } from 'react-apollo'
import Sidebar from './Sidebar'
import NoteViewer from './NoteViewer'
import NoteEditor from './NoteEditor';
import { EDITABLE_NOTE } from '../helpers/localGql'

export default function Main() {
  const {data: {editable}} = useQuery(EDITABLE_NOTE)

  return (
    <main className="border-2 flex h-max bg-gray-300">
      <Sidebar />
      { !editable
        ? <NoteViewer />
        : <NoteEditor />
      }
    </main>
  )
}
