import { useState } from 'react'

function Commands() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')

  const commands = [
    {
      name: 'Copy',
      phrase: 'Copy',
      category: 'Keyboard',
      description: 'Copy the currently selected content.',
      shortcut: 'Cmd/Ctrl + C',
    },
    {
      name: 'Paste',
      phrase: 'Paste',
      category: 'Keyboard',
      description: 'Paste content from the clipboard.',
      shortcut: 'Cmd/Ctrl + V',
    },
    {
      name: 'Select All',
      phrase: 'Select All',
      category: 'Keyboard',
      description: 'Select all content in the current application.',
      shortcut: 'Cmd/Ctrl + A',
    },
    {
      name: 'Left Click',
      phrase: 'Click',
      category: 'Mouse',
      description: 'Perform a standard left mouse click.',
      shortcut: 'Voice command',
    },
    {
      name: 'Double Click',
      phrase: 'Double Click',
      category: 'Mouse',
      description: 'Perform a double mouse click.',
      shortcut: 'Voice command',
    },
    {
      name: 'Right Click',
      phrase: 'Right Click',
      category: 'Mouse',
      description: 'Open the context menu at the cursor position.',
      shortcut: 'Voice command',
    },
    {
      name: 'Enter',
      phrase: 'Enter',
      category: 'Keyboard',
      description: 'Press the Enter key.',
      shortcut: 'Voice command',
    },
    {
      name: 'Backspace',
      phrase: 'Backspace',
      category: 'Keyboard',
      description: 'Delete the character before the cursor.',
      shortcut: 'Voice command',
    },
    {
      name: 'Space',
      phrase: 'Space',
      category: 'Keyboard',
      description: 'Insert a space.',
      shortcut: 'Voice command',
    },
    {
      name: 'Escape',
      phrase: 'Escape',
      category: 'Keyboard',
      description: 'Press Escape to close or cancel an active action.',
      shortcut: 'Voice command',
    },
    {
      name: 'Exit',
      phrase: 'Exit',
      category: 'System',
      description: 'Close the desktop application.',
      shortcut: 'Voice command',
    },
  ]

  const categories = ['All', 'Mouse', 'Keyboard', 'System']

  const filteredCommands = commands.filter((command) => {
    const matchesSearch = [
      command.name,
      command.phrase,
      command.description,
    ]
      .join(' ')
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesCategory =
      selectedCategory === 'All' ||
      command.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className="min-w-0 flex-1 p-6 md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          COMMAND REFERENCE
        </p>

        <h1 className="text-3xl font-bold text-white">
          Voice Commands
        </h1>

        <p className="mt-2 text-slate-400">
          Explore the commands available in the EyeVoice desktop application.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Total Commands</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {commands.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Mouse Commands</p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {commands.filter((command) => command.category === 'Mouse').length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Keyboard Commands</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {commands.filter((command) => command.category === 'Keyboard').length}
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <label
          htmlFor="command-search"
          className="mb-2 block text-sm font-medium text-white"
        >
          Search commands
        </label>

        <input
          id="command-search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search by command name or description..."
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                selectedCategory === category
                  ? 'bg-cyan-500 text-slate-950'
                  : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Command list */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="border-b border-slate-800 p-5">
          <h2 className="font-semibold text-white">
            Available Commands ({filteredCommands.length})
          </h2>
        </div>

        {filteredCommands.length > 0 ? (
          <div className="divide-y divide-slate-800">
            {filteredCommands.map((command) => (
              <div
                key={command.name}
                className="flex flex-col gap-4 p-5 transition hover:bg-slate-800/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-3">
                    <h3 className="font-semibold text-white">
                      {command.name}
                    </h3>

                    <span className="rounded-md bg-cyan-400/10 px-2 py-1 text-xs text-cyan-400">
                      Say: "{command.phrase}"
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-slate-400">
                    {command.description}
                  </p>
                </div>

                <div className="flex shrink-0 items-center justify-between gap-4 sm:flex-col sm:items-end">
                  <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
                    {command.category}
                  </span>

                  <span className="text-xs text-slate-500">
                    {command.shortcut}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <p className="font-medium text-white">No commands found</p>
            <p className="mt-2 text-sm text-slate-400">
              Try another search term or select a different category.
            </p>
          </div>
        )}
      </section>

      {/* Information notice */}
      <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-sm leading-6 text-amber-200">
          <strong>Reference only:</strong> This page documents the expected
          commands. Selecting a command does not execute it. The available
          phrases should be verified against the Python application's
          actual command handler.
        </p>
      </div>
    </main>
  )
}

export default Commands