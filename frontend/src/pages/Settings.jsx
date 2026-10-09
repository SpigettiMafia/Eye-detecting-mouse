import { useState } from 'react'

function Settings() {
  const [settings, setSettings] = useState({
    gazeSensitivity: 50,
    blinkToClick: true,
    voiceCommands: true,
    speechDictation: true,
    soundNotifications: false,
    launchAtStartup: false,
  })

  const [appearance, setAppearance] = useState('Dark')
  const [saved, setSaved] = useState(false)

  function updateSetting(key, value) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }))

    setSaved(false)
  }

  function handleSave() {
    setSaved(true)
  }

  function handleReset() {
    setSettings({
      gazeSensitivity: 50,
      blinkToClick: true,
      voiceCommands: true,
      speechDictation: true,
      soundNotifications: false,
      launchAtStartup: false,
    })

    setAppearance('Dark')
    setSaved(false)
  }

  function Toggle({ label, description, enabled, onChange }) {
    return (
      <div className="flex items-center justify-between gap-4 py-4">
        <div>
          <p className="font-medium text-white">{label}</p>
          <p className="mt-1 text-sm leading-5 text-slate-400">
            {description}
          </p>
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={enabled}
          aria-label={label}
          onClick={() => onChange(!enabled)}
          className={`relative h-6 w-11 shrink-0 rounded-full transition ${
            enabled ? 'bg-cyan-500' : 'bg-slate-700'
          }`}
        >
          <span
            className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
              enabled ? 'left-6' : 'left-1'
            }`}
          />
        </button>
      </div>
    )
  }

  return (
    <main className="min-w-0 flex-1 p-6 md:p-8">
      {/* Heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          PREFERENCES
        </p>

        <h1 className="text-3xl font-bold text-white">Settings</h1>

        <p className="mt-2 text-slate-400">
          Customize your EyeVoice experience and accessibility preferences.
        </p>
      </div>

      {/* Eye control settings */}
      <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            👁️ Eye Control
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Configure your gaze-tracking preferences.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <label
                htmlFor="gaze-sensitivity"
                className="font-medium text-white"
              >
                Gaze Sensitivity
              </label>

              <p className="mt-1 text-sm text-slate-400">
                Adjust the sensitivity level for eye movement.
              </p>
            </div>

            <span className="text-sm font-semibold text-cyan-400">
              {settings.gazeSensitivity}%
            </span>
          </div>

          <input
            id="gaze-sensitivity"
            type="range"
            min="0"
            max="100"
            value={settings.gazeSensitivity}
            onChange={(event) =>
              updateSetting(
                'gazeSensitivity',
                Number(event.target.value),
              )
            }
            className="mt-4 w-full accent-cyan-400"
          />

          <div className="flex justify-between text-xs text-slate-500">
            <span>Low</span>
            <span>High</span>
          </div>
        </div>

        <div className="mt-4 divide-y divide-slate-800 border-t border-slate-800">
          <Toggle
            label="Blink to Click"
            description="Use a blink gesture to trigger a mouse click."
            enabled={settings.blinkToClick}
            onChange={(value) => updateSetting('blinkToClick', value)}
          />
        </div>
      </section>

      {/* Voice settings */}
      <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            🎙️ Voice Control
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Choose which voice features you want enabled.
          </p>
        </div>

        <div className="divide-y divide-slate-800 border-t border-slate-800">
          <Toggle
            label="Voice Commands"
            description="Allow the application to interpret spoken commands."
            enabled={settings.voiceCommands}
            onChange={(value) => updateSetting('voiceCommands', value)}
          />

          <Toggle
            label="Speech Dictation"
            description="Allow speech to be converted into text."
            enabled={settings.speechDictation}
            onChange={(value) => updateSetting('speechDictation', value)}
          />
        </div>
      </section>

      {/* Appearance settings */}
      <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          🖥️ Appearance
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Select your preferred appearance.
        </p>

        <div className="mt-5">
          <label
            htmlFor="appearance"
            className="mb-2 block text-sm font-medium text-white"
          >
            Theme preference
          </label>

          <select
            id="appearance"
            value={appearance}
            onChange={(event) => {
              setAppearance(event.target.value)
              setSaved(false)
            }}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400 sm:max-w-xs"
          >
            <option value="Dark">Dark</option>
            <option value="Light">Light (preference only)</option>
            <option value="System">Follow system (preference only)</option>
          </select>

          <p className="mt-2 text-xs text-slate-500">
            The theme selector currently stores a preference in this page
            only. It does not change the application's appearance.
          </p>
        </div>
      </section>

      {/* Notifications and startup */}
      <section className="mb-6 rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="text-lg font-semibold text-white">
          🔔 General Preferences
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          Configure optional application preferences.
        </p>

        <div className="mt-4 divide-y divide-slate-800 border-t border-slate-800">
          <Toggle
            label="Sound Notifications"
            description="Enable sound notifications for application events."
            enabled={settings.soundNotifications}
            onChange={(value) =>
              updateSetting('soundNotifications', value)
            }
          />

          <Toggle
            label="Launch at Startup"
            description="Remember your preference for launching at startup."
            enabled={settings.launchAtStartup}
            onChange={(value) =>
              updateSetting('launchAtStartup', value)
            }
          />
        </div>
      </section>

      {/* Save and reset */}
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-6">
        <h2 className="font-semibold text-white">Manage Settings</h2>

        <p className="mt-1 text-sm text-slate-400">
          Review your preferences before saving the demonstration state.
        </p>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleSave}
            className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Save Preferences
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
          >
            Reset to Defaults
          </button>
        </div>

        {saved && (
          <p
            role="status"
            className="mt-4 rounded-lg border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-400"
          >
            Preferences confirmed for this demonstration. They have not
            been saved permanently.
          </p>
        )}
      </section>

      {/* Demo notice */}
      <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-sm leading-6 text-amber-200">
          <strong>Demo mode:</strong> These settings update the frontend
          interface only. They do not change the Python application's
          behavior, persist after a page reload, or configure your operating
          system. We will connect them to the backend later.
        </p>
      </div>
    </main>
  )
}

export default Settings
