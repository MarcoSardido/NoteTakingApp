import React from 'react'
import { Tag } from '../../types'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

// CSS Modules
import styles from "../../assets/NoteList.module.css"

export type SimplifiedNote = {
    tags: Tag[]
    title: string
    id: string
}

const NoteCard = ({ id, title, tags }: SimplifiedNote) => {
  return (
    <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-none ${styles.card}`}>
        <Card.Body></Card.Body>
    </Card>
  )
}

export default NoteCard