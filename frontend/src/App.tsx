import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import LandingPage from './pages/LandingPage'
import UniversitiesPage from './pages/UniversitiesPage'
import EntryPage from './pages/EntryPage'
import SecretCodePage from './pages/SecretCodePage'
import ResultsPage from './pages/ResultsPage'
import AdminPortal from './pages/AdminPortal'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen" style={{ backgroundColor: 'var(--gray-50)' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/universities" element={<UniversitiesPage />} />
            <Route path="/entry" element={<EntryPage />} />
            <Route path="/secret-code" element={<SecretCodePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/admin" element={<AdminPortal />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
