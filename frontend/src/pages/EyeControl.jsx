import { useState } from 'react'

function EyeControl() {
  const [isTracking, setIsTracking] = useState(false)
  const [sensitivity, setSensitivity] = useState(50)
  const [blinkClick, setBlinkClick] = useState(true)

  return (
    <main className="min-w-0 flex-1 p-6 md:p-8">

      {/* Page Header */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          ACCESSIBILITY CONTROLS
        </p>

        <h1 className="text-3xl font-bold text-white">
          Eye Control
        </h1>

        <p className="mt-2 text-slate-400">
          Control your computer using eye movement and blink gestures.
        </p>
      </div>

      {/* Status Cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Tracking Status</p>

          <p className={`mt-3 text-xl font-semibold ${
            isTracking ? 'text-emerald-400' : 'text-slate-300'
          }`}>
            {isTracking ? 'Running' : 'Stopped'}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {isTracking
              ? 'Tracking is enabled in this interface.'
              : 'Start tracking to change the demo status.'}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Blink Click</p>

          <p className={`mt-3 text-xl font-semibold ${
            blinkClick ? 'text-emerald-400' : 'text-slate-400'
          }`}>
            {blinkClick ? 'Enabled' : 'Disabled'}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Toggle blink-click preference below.
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 sm:col-span-2 xl:col-span-1">
          <p className="text-sm text-slate-400">Sensitivity</p>

          <p className="mt-3 text-xl font-semibold text-cyan-400">
            {sensitivity}%
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Adjust the demo sensitivity setting.
          </p>
        </div>

      </div>

      {/* Main Control Area */}
      <div className="grid gap-6 xl:grid-cols-5">

        {/* Camera Preview */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 xl:col-span-3">

          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Camera Preview
              </h2>

              <p className="mt-1 text-sm text-slate-400">
                Live camera integration will be added later.
              </p>
            </div>

            <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-400">
              Preview unavailable
            </span>
          </div>

          <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">

            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-cyan-400/10 text-3xl">
              👁️
            </div>

            <h3 className="text-lg font-semibold text-white">
              Eye Tracking Preview
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-slate-400">
              Your camera feed and gaze-tracking indicators will appear here
              after we connect the Python desktop agent.
            </p>

            <span className="mt-5 rounded-full bg-slate-800 px-3 py-1 text-xs text-slate-400">
              Desktop agent not connected
            </span>

          </div>

        </section>

        {/* Tracking Controls */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">

          <h2 className="text-lg font-semibold text-white">
            Tracking Controls
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage the demo tracking state.
          </p>

          <div className="mt-6 space-y-4">

            <button
              type="button"
              onClick={() => setIsTracking(true)}
              disabled={isTracking}
              className="w-full rounded-lg bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Start Tracking
            </button>

            <button
              type="button"
              onClick={() => setIsTracking(false)}
              disabled={!isTracking}
              className="w-full rounded-lg border border-slate-700 px-4 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Stop Tracking
            </button>

          </div>

          {/* Sensitivity */}
          <div className="mt-8 border-t border-slate-800 pt-6">

            <div className="flex items-center justify-between">
              <label
                htmlFor="sensitivity"
                className="font-medium text-white"
              >
                Gaze Sensitivity
              </label>

              <span className="text-sm text-cyan-400">
                {sensitivity}%
              </span>
            </div>

            <input
              id="sensitivity"
              type="range"
              min="0"
              max="100"
              value={sensitivity}
              onChange={(event) =>
                setSensitivity(Number(event.target.value))
              }
              className="mt-4 w-full accent-cyan-400"
            />

            <div className="flex justify-between text-xs text-slate-500">
              <span>Low</span>
              <span>High</span>
            </div>

          </div>

          {/* Blink Click */}
          <div className="mt-8 flex items-center justify-between border-t border-slate-800 pt-6">

            <div>
              <p className="font-medium text-white">
                Blink to Click
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Enable blink-click preference
              </p>
            </div>

            <button
              type="button"
              role="switch"
              aria-checked={blinkClick}
              aria-label="Blink to Click"
              onClick={() => setBlinkClick((current) => !current)}
              className={`relative h-6 w-11 rounded-full transition ${
                blinkClick ? 'bg-cyan-500' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                  blinkClick ? 'left-6' : 'left-1'
                }`}
              />
            </button>

          </div>

        </section>

      </div>

      {/* Information Notice */}
      <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-sm leading-6 text-amber-200">
          <strong>Demo mode:</strong> These controls currently update the
          interface only. They do not activate your camera or control your
          mouse. We'll connect them to the Python desktop application later.
        </p>
      </div>

    </main>
  )
}

export default EyeControl