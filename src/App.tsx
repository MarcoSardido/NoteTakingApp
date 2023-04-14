import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuidV4 } from "uuid"
import NewNote from './components/NewNote/NewNote'
import { Container } from 'react-bootstrap'

// Custom Hooks
import useLocalStorage from './hooks/useLocalStorage'

// Types
import { NoteData, RawNote, Tag } from './types'


const App = () => {
  // Hooks
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  /* `const noteWithTags` is a variable that uses the `useMemo` hook to memoize the result of mapping over the `notes` array and adding an array of `tags` to each note object based on the `tagIds` */
  const noteWithTags = useMemo(() => {
    return notes.map(note => {
      return { ...note, tags: tags.filter(tag => note.tagIds.includes(tag.id)) }
    })
  }, [notes, tags])



  // Functions
  const onCreateNote = ({ tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return [...prevNotes, { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }]
    })
  }


  const addTag = (tag: Tag) => {
    setTags(prevTags => [...prevTags, tag])
  }



  return (
    <Container className='my-4'>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote onSubmit={onCreateNote} onAddTag={addTag} availableTags={tags} />} />

        <Route path="/:id">
          <Route index element={<h1>Get</h1>} />
          <Route path="edit" element={<h1>Edit</h1>} />
        </Route>

        <Route path="*" element={<h1>404</h1>} />
      </Routes>
    </Container>
  )
}

export default App