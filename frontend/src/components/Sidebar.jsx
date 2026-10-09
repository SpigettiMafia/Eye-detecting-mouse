import { NavLink } from 'react-router-dom'

function Sidebar() {
  const navigationItems = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Eye Control', path: '/eye-control' },
    { name: 'Voice Control', path: '/voice-control' },
    { name: 'Commands', path: '/commands' },
    { name: 'History', path: '/history' },
    { name: 'Settings', path: '/settings' },
  ]

  return (
    <aside className="min-h-[calc(100vh-89px)] w-64 shrink-0 border-r border-slate-800 bg-slate-900 p-6">
      <nav className="space-y-2">
        {navigationItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `block w-full rounded-lg px-4 py-3 text-left transition-colors ${
                isActive
                  ? 'bg-cyan-500/10 text-cyan-400'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar