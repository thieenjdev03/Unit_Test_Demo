import { useState } from 'react'
import './App.css'
import Register from './components/Register/Register'
import Homepage from './components/Homepage/Homepage'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {

  return (
    <>
        <Router>
          <Routes>
            <Route path="/Homepage" element={<Homepage />} />
          </Routes>
        </Router>
    </>
  )
}

export default App
