import { BrowserRouter as Router } from 'react-router-dom'
import { Route, Routes } from 'react-router-dom'
import { useState } from 'react'

import { AppHeader } from './comps/AppHeader.jsx'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyDetails } from './pages/ToyDetails.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'

function App() {
  return (
    <Router>
      <AppHeader />
      <section className="app">
        <Routes>
          <Route element={<ToyIndex />} path='/toy' />
          <Route element={<ToyDetails />} path='/:toyId' />
          <Route element={<ToyEdit />} path='/edit/:toyId' />
        </Routes>
      </section>
    </Router>
  )
}

export default App
