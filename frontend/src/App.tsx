import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import LandingPage from './components/LandingPage.jsx'
import UniversitiesPage from './components/UniversitiesPage.jsx'
import EntryPage from './components/EntryPage.jsx'
import SecretCodePage from './components/SecretCodePage.jsx'
import ResultsPage from './components/ResultsPage.jsx'
import AdminPortal from './components/AdminPortal.jsx'
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
