import { useState } from 'react'

function History() {
  const [search, setSearch] = useState('')
  const [selectedType, setSelectedType] = useState('All')

  // Sample data for demonstration.
  const [activities, setActivities] = useState([
    {
      id: 1,
      command: 'Copy',
      type: 'Voice',
      time: '10:42 AM',
      status: 'Success',
    },
    {
      id: 2,
      command: 'Left Click',
      type: 'Eye Control',
      time: '10:40 AM',
      status: 'Success',
    },
    {
      id: 3,
      command: 'Select All',
      type: 'Voice',
      time: '10:38 AM',
      status: 'Success',
    },
    {
      id: 4,
      command: 'Paste',
      type: 'Voice',
      time: '10:35 AM',
      status: 'Success',
    },
    {
      id: 5,
      command: 'Double Click',
      type: 'Eye Control',
      time: '10:31 AM',
      status: 'Success',
    },
    {
      id: 6,
      command: 'Enter',
      type: 'Voice',
      time: '10:28 AM',
      status: 'Failed',
    },
    {
      id: 7,
      command: 'Right Click',
      type: 'Eye Control',
      time: '10:25 AM',
      status: 'Success',
    },
  ])

  const filteredActivities = activities.filter((activity) => {
    const matchesSearch = activity.command
      .toLowerCase()
      .includes(search.toLowerCase())

    const matchesType =
      selectedType === 'All' || activity.type === selectedType

    return matchesSearch && matchesType
  })

  function clearHistory() {
    setActivities([])
  }

  return (
    <main className="min-w-0 flex-1 p-6 md:p-8">
      {/* Page heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          ACTIVITY MONITOR
        </p>

        <h1 className="text-3xl font-bold text-white">
          Activity History
        </h1>

        <p className="mt-2 text-slate-400">
          Review recent voice commands and eye-control actions.
        </p>
      </div>

      {/* Summary cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Total Activities</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {activities.length}
          </p>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Voice Activities</p>
          <p className="mt-2 text-3xl font-bold text-cyan-400">
            {activities.filter((item) => item.type === 'Voice').length}
          </p>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Successful Activities</p>
          <p className="mt-2 text-3xl font-bold text-emerald-400">
            {activities.filter((item) => item.status === 'Success').length}
          </p>
        </section>
      </div>

      {/* Search and filters */}
      <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <label
          htmlFor="history-search"
          className="mb-2 block text-sm font-medium text-white"
        >
          Search activity
        </label>

        <input
          id="history-search"
          type="text"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search commands..."
          className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none placeholder:text-slate-500 focus:border-cyan-400"
        />

        <div className="mt-4 flex flex-wrap gap-2">
          {['All', 'Voice', 'Eye Control'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setSelectedType(type)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                selectedType === type
                  ? 'bg-cyan-500 text-slate-950'
                  : 'border border-slate-700 text-slate-300 hover:bg-slate-800'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* Activity table */}
      <section className="overflow-hidden rounded-xl border border-slate-800 bg-slate-900">
        <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-semibold text-white">Recent Activities</h2>
            <p className="mt-1 text-sm text-slate-400">
              Showing {filteredActivities.length} of {activities.length} records
            </p>
          </div>

          <button
            type="button"
            onClick={clearHistory}
            disabled={activities.length === 0}
            className="rounded-lg border border-red-400/30 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-400/10 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear History
          </button>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-sm">
              <thead className="bg-slate-950/60 text-slate-400">
                <tr>
                  <th className="px-5 py-4 font-medium">Command</th>
                  <th className="px-5 py-4 font-medium">Source</th>
                  <th className="px-5 py-4 font-medium">Time</th>
                  <th className="px-5 py-4 font-medium">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-800">
                {filteredActivities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="transition hover:bg-slate-800/40"
                  >
                    <td className="px-5 py-4 font-medium text-white">
                      {activity.command}
                    </td>

                    <td className="px-5 py-4 text-slate-300">
                      {activity.type}
                    </td>

                    <td className="px-5 py-4 text-slate-400">
                      {activity.time}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          activity.status === 'Success'
                            ? 'bg-emerald-400/10 text-emerald-400'
                            : 'bg-red-400/10 text-red-400'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-10 text-center">
            <h3 className="font-semibold text-white">No activities found</h3>
            <p className="mt-2 text-sm text-slate-400">
              Try another search or clear the filters.
            </p>
          </div>
        )}
      </section>

      {/* Demo notice */}
      <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-sm leading-6 text-amber-200">
          <strong>Demo data:</strong> These activities are sample records
          stored in the page's temporary state. They are not actual events
          from your Python application, and clearing the history does not
          affect the desktop application.
        </p>
      </div>
    </main>
  )
}

export default History