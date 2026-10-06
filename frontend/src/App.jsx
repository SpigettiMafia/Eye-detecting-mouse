function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80">
        <div className="flex items-center justify-between px-8 py-5">
          
          <div>
            <h1 className="text-2xl font-bold text-cyan-400">
              EyeVoice
            </h1>
            <p className="text-sm text-slate-400">
              Assistive Human-Computer Interaction
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-400"></span>
            <span className="text-sm text-emerald-400">
              System Online
            </span>
          </div>

        </div>
      </header>

      {/* Main Layout */}
      <div className="flex">

        {/* Sidebar */}
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

        {/* Dashboard Content */}
        <main className="flex-1 p-8">

          <div className="mb-8">
            <h2 className="text-3xl font-bold">
              Welcome to EyeVoice
            </h2>

            <p className="mt-2 text-slate-400">
              Control your computer using eye movement and voice.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid gap-6 md:grid-cols-3">

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Eye Tracking
              </p>

              <h3 className="mt-2 text-2xl font-semibold text-emerald-400">
                Active
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Gaze tracking is ready.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Voice Control
              </p>

              <h3 className="mt-2 text-2xl font-semibold text-cyan-400">
                Ready
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Microphone is available.
              </p>
            </div>

            <div className="rounded-xl border border-slate-800 bg-slate-900 p-6">
              <p className="text-sm text-slate-400">
                Camera
              </p>

              <h3 className="mt-2 text-2xl font-semibold text-emerald-400">
                Connected
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Camera feed is available.
              </p>
            </div>

          </div>

          {/* Recent Activity */}
          <section className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-6">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">
                  Recent Activity
                </h3>

                <p className="mt-1 text-sm text-slate-400">
                  Latest actions performed by EyeVoice.
                </p>
              </div>

              <span className="rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
                Demo Data
              </span>
            </div>

            <div className="mt-6 space-y-3">

              <div className="flex items-center justify-between rounded-lg bg-slate-800/60 px-4 py-3">
                <span>Voice command: "Copy"</span>
                <span className="text-sm text-slate-500">
                  Just now
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-800/60 px-4 py-3">
                <span>Eye tracking started</span>
                <span className="text-sm text-slate-500">
                  2 min ago
                </span>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-slate-800/60 px-4 py-3">
                <span>Voice control initialized</span>
                <span className="text-sm text-slate-500">
                  5 min ago
                </span>
              </div>

            </div>

          </section>

        </main>

      </div>

    </div>
  )
}

export default App