import { Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import Sidebar from './components/Sidebar'

import Dashboard from './pages/Dashboard'
import EyeControl from './pages/EyeControl'
import VoiceControl from './pages/VoiceControl'
import Commands from './pages/Commands'
import History from './pages/History'
import Settings from './pages/Settings'
function PlaceholderPage({ title, description }) {
  return (
    <main className="flex-1 p-8">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <p className="mt-2 text-slate-400">{description}</p>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <p className="text-slate-300">
          This section is under development.
        </p>
      </div>
    </main>
  )
}

function App() {
  return (
    
      <div className="min-h-screen bg-slate-950 text-white">
        <Header />

        <div className="flex">
          <Sidebar />

          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/eye-control" element={<EyeControl />} />

            <Route
              path="/eye-control"
              element={
                <PlaceholderPage
                  title="Eye Control"
                  description="Manage gaze-based mouse control."
                />
              }
            />

            <Route path="/voice-control" element={<VoiceControl />} />

            <Route path="/commands" element={<Commands />} />

            <Route path="/history" element={<History />} />

            <Route path="/settings" element={<Settings />} />

            <Route
              path="*"
              element={
                <PlaceholderPage
                  title="Page Not Found"
                  description="The page you requested doesn't exist."
                />
              }
            />
          </Routes>
        </div>
      </div>
    
  )
}

export default App