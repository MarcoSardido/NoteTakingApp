import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewNote from './components/NewNote/NewNote'
import { Container } from 'react-bootstrap'

// Types
import { RawNote, RawNoteData, Note, NoteData, Tag } from './types'

const App = () => {
  // Hooks
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])

  // Functions
  return (
    <Container className='my-4'>
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote />} />

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