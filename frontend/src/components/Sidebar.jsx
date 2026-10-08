function Sidebar() {
  return (
    <aside className="min-h-[calc(100vh-89px)] w-64 border-r border-slate-800 bg-slate-900 p-6">
      <nav className="space-y-2">

        <button className="w-full rounded-lg bg-cyan-500/10 px-4 py-3 text-left text-cyan-400">
          Dashboard
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
          Eye Control
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
          Voice Control
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
          Commands
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
          History
        </button>

        <button className="w-full rounded-lg px-4 py-3 text-left text-slate-400 hover:bg-slate-800 hover:text-white">
          Settings
        </button>

      </nav>
    </aside>
  )
}

export default Sidebar
