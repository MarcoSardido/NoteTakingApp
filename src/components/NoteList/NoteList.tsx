import React, { useMemo, useState } from 'react'
import { Button, Col, Row, Stack, Form } from 'react-bootstrap'
import ReactSelect from "react-select"
import { Link } from 'react-router-dom'

// Types
import { Note, Tag } from '../../types'
import NoteCard, { SimplifiedNote } from './NoteCard'
import EditTagsModal from '../EditTagsModal/EditTagsModal'

type NoteListProps = {
    availableTags: Tag[]
    notes: SimplifiedNote[]
}

const NoteList = ({ availableTags, notes }: NoteListProps) => {
    // Hooks
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [title, setTitle] = useState("")
    const [ediTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)

    const filteredNotes = useMemo(() => {
        return notes.filter(note => {
            // If title blank don't do anything, otherwise. Check if note have the same title
            return (title === "" || note.title.toLowerCase().includes(title.toLowerCase())) && (selectedTags.length === 0 || selectedTags.every(tag => note.tags.some(noteTag => noteTag.id === tag.id)))
            // Loop through all `selectedTags` and make sure every single one returns
            // True for this code <note.tags.some(noteTag => noteTag.id === tag.id)>
        })
    }, [title, selectedTags, notes])


    return (
        <>
            <Row className='align-items-center mb-4'>
                <Col><h1>Notes</h1></Col>
                <Col xs="auto">
                    <Stack gap={2} direction="horizontal">
                        <Link to="/new">
                            <Button variant="primary">Create</Button>
                        </Link>
                        <Button onClick={() => setEditTagsModalIsOpen(true)} variant="outline-secondary">Edit Tags</Button>
                    </Stack>
                </Col>
            </Row>
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId="title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text"
                                value={title}
                                onChange={e => setTitle(e.currentTarget.value)}
                            />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="tags">
                            <Form.Label>Tags</Form.Label>
                            <ReactSelect
                                value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                options={availableTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })}
                                onChange={tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti
                            />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row sx={1} sm={2} lg={3} xl={4} className='g-3'>
                {filteredNotes.map(note => (
                    <Col key={note.id}>
                        <NoteCard id={note.id} title={note.title} tags={note.tags} />
                    </Col>
                ))}
            </Row>
            <EditTagsModal availableTags={availableTags} show={ediTagsModalIsOpen} handleClose={() => {setEditTagsModalIsOpen(prev => !prev)}} />
        </>
    )
}

export default NoteList