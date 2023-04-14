import React from 'react'
import { Route, Routes } from 'react-router-dom'
import NewNote from './components/NewNote/NewNote'
import { Container } from 'react-bootstrap'

const App = () => {
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