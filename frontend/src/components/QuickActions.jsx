function QuickActions() {
  const actions = [
    {
      title: "Start Eye Control",
      description: "Begin gaze-based mouse control",
      icon: "👁️",
    },
    {
      title: "Start Voice Control",
      description: "Enable voice commands",
      icon: "🎤",
    },
    {
      title: "View Commands",
      description: "See available voice commands",
      icon: "⌨️",
    },
  ]

  return (
    <section className="mt-8">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-gray-400">
          Quickly access the main EyeVoice controls.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {actions.map((action) => (
          <button
            key={action.title}
            className="rounded-2xl border border-white/10 bg-white/5 p-5 text-left transition hover:border-cyan-400/40 hover:bg-white/10"
          >
            <div className="mb-4 text-2xl">
              {action.icon}
            </div>

            <h3 className="font-semibold text-white">
              {action.title}
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              {action.description}
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}

export default QuickActions