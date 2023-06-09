import React, { useMemo } from 'react'
import { Route, Routes } from 'react-router-dom'
import { v4 as uuidV4 } from "uuid"
import NewNote from './components/NewNote/NewNote'

// Custom Hooks
import useLocalStorage from './hooks/useLocalStorage'

// Types
import { NoteData, RawNote, Tag } from './types'
import NoteList from './components/NoteList/NoteList'
import NoteLayout from './components/NoteLayout/NoteLayout'
import Note from './components/Note/Note'
import EditNote from './components/EditNote/EditNote'
import Login from './components/Login/Login'
import Header from './components/Header/Header'


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

  const onUpdateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        if (note.id === id) {
          return { ...note, ...data, tagIds: tags.map(tag => tag.id) }
        } else {
          return note
        }
      })
    })
  }

  const onDeleteNote = (id: string) => {
    setNotes(prevNotes => {
      return prevNotes.filter(note => note.id !== id)
    })
  }

  const addTag = (tag: Tag) => {
    setTags(prevTags => [...prevTags, tag])
  }

  const updateTag = (id: string, label: string) => {
    setTags(prevTags => {
      return prevTags.map(tag => {
        if (tag.id === id) {
          return { ...tag, label }
        } else {
          return tag
        }
      })
    })
  }

  const deleteTag = (id: string) => {
    setTags(prevTags => {
      return prevTags.filter(tag => tag.id !== id)
    })
  }


  return (
    <div className='bg-gradient-to-tr from-[#000000] to-[#130F40] text-white h-screen'>
      <Header />
    </div>
    
    // <Container className='my-4'>
    //   <Routes>
    //     <Route path="/" element={
    //       <NoteList 
    //         availableTags={tags} 
    //         notes={noteWithTags}
    //         updateTag={updateTag}
    //         deleteTag={deleteTag} />
    //     }/>
    //     <Route path="/new" element={
    //       <NewNote
    //         onSubmit={onCreateNote}
    //         onAddTag={addTag}
    //         availableTags={tags} />
    //     } />

    //     <Route path="/:id" element={<NoteLayout notes={noteWithTags} />}>
    //       <Route index element={<Note onDelete={onDeleteNote} />} />
    //       <Route path="edit" element={
    //         <EditNote
    //           onSubmit={onUpdateNote}
    //           onAddTag={addTag}
    //           availableTags={tags} />
    //       } />
    //     </Route>

    //     <Route path="*" element={<h1>404</h1>} />
    //   </Routes>
    // </Container>
  )
}

export default App