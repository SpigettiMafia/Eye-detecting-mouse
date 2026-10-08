function RecentActivity() {
  const activities = [
    {
      command: "Copy",
      type: "Voice",
      time: "Just now",
    },
    {
      command: "Left Click",
      type: "Eye",
      time: "2 min ago",
    },
    {
      command: "Select All",
      type: "Voice",
      time: "5 min ago",
    },
    {
      command: "Paste",
      type: "Voice",
      time: "8 min ago",
    },
  ]

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-white">
            Recent Activity
          </h2>

          <p className="mt-1 text-sm text-gray-400">
            Your latest EyeVoice actions
          </p>
        </div>

        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-400">
          Live
        </span>
      </div>

      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-white/5 bg-black/20 px-4 py-3"
          >
            <div>
              <p className="font-medium text-white">
                {activity.command}
              </p>

              <p className="text-xs text-gray-500">
                {activity.type} control
              </p>
            </div>

            <span className="text-xs text-gray-500">
              {activity.time}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity