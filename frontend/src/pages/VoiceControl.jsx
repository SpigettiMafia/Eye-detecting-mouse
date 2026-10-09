import { useState } from 'react'

function VoiceControl() {
  const [isListening, setIsListening] = useState(false)
  const [mode, setMode] = useState('commands')
  const [transcript, setTranscript] = useState('')

  const commands = [
    { command: 'Copy', description: 'Copy selected content' },
    { command: 'Paste', description: 'Paste copied content' },
    { command: 'Select All', description: 'Select all available content' },
    { command: 'Click', description: 'Perform a left click' },
    { command: 'Double Click', description: 'Perform a double click' },
    { command: 'Right Click', description: 'Perform a right click' },
    { command: 'Enter', description: 'Press the Enter key' },
    { command: 'Backspace', description: 'Delete the previous character' },
    { command: 'Space', description: 'Insert a space' },
    { command: 'Escape', description: 'Press the Escape key' },
    { command: 'Exit', description: 'Close the desktop application' },
  ]

  return (
    <main className="min-w-0 flex-1 p-6 md:p-8">
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium text-cyan-400">
          ACCESSIBILITY CONTROLS
        </p>

        <h1 className="text-3xl font-bold text-white">Voice Control</h1>

        <p className="mt-2 text-slate-400">
          Control your computer using voice commands and speech dictation.
        </p>
      </div>

      {/* Status cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Listening Status</p>

          <p
            className={`mt-3 text-xl font-semibold ${
              isListening ? 'text-emerald-400' : 'text-slate-300'
            }`}
          >
            {isListening ? 'Listening (Demo)' : 'Stopped'}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            {isListening
              ? 'The interface is in demo listening mode.'
              : 'Start listening to change the demo status.'}
          </p>
        </section>

        <section className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Current Mode</p>

          <p className="mt-3 text-xl font-semibold text-cyan-400">
            {mode === 'commands' ? 'Voice Commands' : 'Speech Dictation'}
          </p>

          <p className="mt-2 text-sm text-slate-500">
            Choose whether you want to issue commands or dictate text.
          </p>
        </section>
      </div>

      {/* Main controls */}
      <div className="grid gap-6 xl:grid-cols-5">
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 xl:col-span-3">
          <h2 className="text-lg font-semibold text-white">
            Voice Assistant
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Manage listening mode and view the demonstration transcript.
          </p>

          <div className="mt-8 flex flex-col items-center rounded-xl border border-dashed border-slate-700 bg-slate-950 p-8 text-center">
            <div
              className={`mb-5 flex h-20 w-20 items-center justify-center rounded-full text-4xl ${
                isListening
                  ? 'bg-emerald-400/10'
                  : 'bg-cyan-400/10'
              }`}
            >
              🎙️
            </div>

            <h3 className="text-xl font-semibold text-white">
              {isListening ? 'Demo Listening Mode' : 'Voice Assistant Ready'}
            </h3>

            <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
              {isListening
                ? 'The interface status has changed, but no microphone audio is being processed.'
                : 'Start the demonstration to see how the voice-control interface responds.'}
            </p>

            <div className="mt-6 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={() => setIsListening(true)}
                disabled={isListening}
                className="rounded-lg bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Start Listening
              </button>

              <button
                type="button"
                onClick={() => setIsListening(false)}
                disabled={!isListening}
                className="rounded-lg border border-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Stop Listening
              </button>
            </div>
          </div>

          {/* Mode selection */}
          <div className="mt-8">
            <label
              htmlFor="voice-mode"
              className="mb-3 block font-medium text-white"
            >
              Voice Mode
            </label>

            <select
              id="voice-mode"
              value={mode}
              onChange={(event) => setMode(event.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            >
              <option value="commands">Voice Commands</option>
              <option value="dictation">Speech Dictation</option>
            </select>
          </div>

          {/* Transcript */}
          <div className="mt-8 border-t border-slate-800 pt-6">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="font-semibold text-white">
                Transcript Preview
              </h3>

              <button
                type="button"
                onClick={() => setTranscript('')}
                className="text-sm text-cyan-400 hover:text-cyan-300"
              >
                Clear
              </button>
            </div>

            <textarea
              value={transcript}
              onChange={(event) => setTranscript(event.target.value)}
              placeholder={
                mode === 'commands'
                  ? 'Recognized voice commands will appear here later...'
                  : 'Your dictated speech will appear here later...'
              }
              rows={4}
              className="w-full resize-y rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
            />

            <p className="mt-2 text-xs text-slate-500">
              You can type here to test the interface. Speech recognition
              has not been connected yet.
            </p>
          </div>
        </section>

        {/* Supported commands */}
        <section className="rounded-xl border border-slate-800 bg-slate-900 p-6 xl:col-span-2">
          <h2 className="text-lg font-semibold text-white">
            Supported Commands
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Commands supported by the desktop application.
          </p>

          <div className="mt-5 space-y-3">
            {commands.map((item) => (
              <div
                key={item.command}
                className="rounded-lg border border-slate-800 bg-slate-950 p-3"
              >
                <p className="font-medium text-cyan-400">{item.command}</p>

                <p className="mt-1 text-sm text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Demo notice */}
      <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
        <p className="text-sm leading-6 text-amber-200">
          <strong>Demo mode:</strong> These controls currently update the
          interface only. They do not access your microphone, recognize
          speech, or execute computer commands. We will connect them to
          the Python application later.
        </p>
      </div>
    </main>
  )
}

export default VoiceControl