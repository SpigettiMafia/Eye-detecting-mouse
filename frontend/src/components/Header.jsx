function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900/80">
      <div className="flex items-center justify-between px-8 py-5">

        {/* Brand */}
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">
            EyeVoice
          </h1>

          <p className="text-sm text-slate-400">
            Assistive Human-Computer Interaction
          </p>
        </div>

        {/* System Status */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-emerald-400"></span>

          <span className="text-sm text-emerald-400">
            System Online
          </span>
        </div>

      </div>
    </header>
  )
}

export default Header