import React from 'react'
import { Note } from '../../types'
import { Navigate, Outlet, useParams } from 'react-router-dom'

type NoteLayoutProps = {
    notes: Note[]
}

const NoteLayout = ({ notes }: NoteLayoutProps) => {
    // Hooks
    const { id } = useParams()

    // Functions
    const note = notes.find(n => n.id === id)

    if (note == null) return <Navigate to='/' replace />


    return (
        <Outlet context={note} />
    )
}

export default NoteLayout