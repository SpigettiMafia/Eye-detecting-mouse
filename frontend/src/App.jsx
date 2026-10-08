import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <Header />

      <div className="flex">
        <Sidebar />
        <Dashboard />
      </div>

    </div>
  )
}

export default App