# Eye Mouse + Voice Control

An accessibility-focused Python project that combines **eye-gaze mouse control**, **blink-to-click**, **voice commands**, and **voice dictation**.

The project uses the modern **MediaPipe Tasks Face Landmarker API** rather than the removed legacy `mp.solutions.face_mesh` API.

## Features

- 👁️ Move the mouse using eye gaze
- 😉 Blink to left-click
- 🎤 Voice commands for mouse/keyboard actions
- 🗣️ Voice dictation into the active application
- 🍎 macOS Command shortcuts, with Ctrl on Windows/Linux
- 🛑 Press `Q`, say `exit`, or press `Ctrl+C` to stop
- 🧩 Modular Python structure suitable for learning and interviews

## Architecture

```text
                    ┌─────────────────────┐
                    │       Webcam        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │       OpenCV        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │ MediaPipe Face      │
                    │ Landmarker          │
                    └──────────┬──────────┘
                               │
                  ┌────────────┴────────────┐
                  ▼                         ▼
           Iris landmarks             Eye opening
                  │                         │
                  ▼                         ▼
           Gaze estimation            Blink detection
                  │                         │
                  ▼                         ▼
           Screen coordinates          Mouse click
                  │
                  ▼
              PyAutoGUI
                  │
                  ▼
              Mouse/Keyboard

Microphone → SpeechRecognition → Command / Dictation → PyAutoGUI
```

## Project structure

```text
eye_mouse_voice_project/
├── main.py
├── config.py
├── download_model.py
├── requirements.txt
├── README.md
├── .gitignore
├── models/
│   └── face_landmarker.task       # downloaded locally; ignored by Git
└── src/
    ├── __init__.py
    ├── gaze_tracker.py
    ├── mouse_controller.py
    ├── voice_controller.py
    └── clipboard_manager.py
```

## Requirements

- Python **3.12** recommended
- macOS / Windows / Linux
- Webcam
- Microphone for voice control
- Internet connection for Google speech recognition
- macOS Accessibility permission for PyAutoGUI on macOS

## macOS installation

### 1. Open the project

```bash
cd "/Users/vaibhavrai/Documents/Eye Mouse/eye_mouse_voice_project"
```

If VS Code is already opened at the project root, you do not need to run `cd` again.

### 2. Create and activate the virtual environment

```bash
python3.12 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```bash
python -m pip install -r requirements.txt
```

If PyAudio fails to build on macOS, install PortAudio first:

```bash
brew install portaudio
```

Then retry:

```bash
python -m pip install PyAudio
```

### 4. Download the Face Landmarker model

```bash
python download_model.py
```

The script downloads the model into:

```text
models/face_landmarker.task
```

The binary model is ignored by Git so that the repository stays small.

### 5. Run

```bash
python main.py
```

## macOS permissions

Go to **System Settings → Privacy & Security** and allow the application that is actually running Python (for example VS Code or Terminal) to access:

- **Camera** — webcam frames
- **Microphone** — voice commands
- **Accessibility** — mouse and keyboard control through PyAutoGUI

If you change permissions, fully quit and reopen VS Code/Terminal before testing again.

## Controls

| Action | Control |
|---|---|
| Move pointer | Look around |
| Left click | Blink |
| Copy | Say `copy` |
| Paste | Say `paste` |
| Select all | Say `select all` |
| Left click | Say `click` |
| Double click | Say `double click` |
| Right click | Say `right click` |
| Enter | Say `enter` |
| Backspace | Say `backspace` |
| Space | Say `space` |
| Escape | Say `escape` |
| Stop | Press `Q`, say `exit`, or press `Ctrl+C` |

## How the gaze tracker works

1. OpenCV captures a webcam frame.
2. The frame is converted from BGR to RGB.
3. MediaPipe Face Landmarker detects the face and returns facial landmarks.
4. Iris landmarks are compared with the eye boundaries.
5. The normalized iris position is converted into screen coordinates.
6. Exponential smoothing reduces pointer jitter.
7. PyAutoGUI moves the OS pointer.
8. Eye Aspect Ratio (EAR) is used as a simple blink signal.
9. A blink that remains below the threshold for the required number of frames triggers a click.

## How voice control works

1. `SpeechRecognition` captures microphone audio.
2. Ambient noise is calibrated when the program starts.
3. Speech is sent to Google's speech-recognition service.
4. Exact recognized phrases are interpreted as commands.
5. Other phrases are treated as dictation and typed through PyAutoGUI.
6. `exit`, `quit`, and `stop` set a shared `threading.Event`, which cleanly stops both voice and eye-control loops.

## Safety

PyAutoGUI's emergency fail-safe remains **enabled**. The pointer is also clamped away from the exact screen corners so ordinary gaze movement does not accidentally trigger the emergency stop.

If the application behaves unexpectedly, use `Ctrl+C` in the terminal to terminate it.

## Limitations

- This is a simple gaze mapper, not a medically validated eye-tracking system.
- It does not perform multi-point calibration.
- Lighting, camera position, glasses, face angle, and distance can affect accuracy.
- Blink detection is threshold-based and may need tuning for different users.
- Voice recognition requires Internet access.
- PyAutoGUI requires OS-level permissions to control the computer.

## GitHub setup

Before pushing the project:

```bash
git init
git add .
git commit -m "Initial Eye Mouse and Voice Control project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

Do **not** commit `.venv/` or `models/face_landmarker.task`.

## Interview explanation

> I built an accessibility application in Python that converts eye movement into mouse movement, blinking into clicks, and speech into keyboard or mouse commands. OpenCV handles webcam frames, MediaPipe Face Landmarker provides facial and iris landmarks, NumPy performs gaze calculations and smoothing, PyAutoGUI controls OS input, and SpeechRecognition handles voice commands and dictation. I separated camera tracking, input control, voice processing, configuration, and model setup into individual modules to keep the application maintainable.


## Final status

This repository contains the cleaned, GitHub-ready version with stable blink-to-click behavior, command-aware voice control, graceful voice shutdown, and a GitHub Actions syntax check.

For deployment details, see `DEPLOYMENT.md`. The current application is a desktop application; it is not a web server and therefore is not directly deployable as a conventional live website.
