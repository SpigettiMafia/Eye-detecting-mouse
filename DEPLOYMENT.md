# Deployment Guide

## GitHub

This project is ready to publish as a normal Git repository.

```bash
git init
git add .
git commit -m "Initial Eye Mouse and Voice Control project"
git branch -M main
git remote add origin YOUR_GITHUB_REPOSITORY_URL
git push -u origin main
```

The repository intentionally excludes `.venv/` and the downloaded
`models/face_landmarker.task` model.

## Running after cloning

Use Python 3.12:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
python download_model.py
python main.py
```

On macOS, grant Camera, Microphone, and Accessibility permissions to the
application that launches Python (for example VS Code or Terminal).

## About "live deployment"

The current application is a native desktop accessibility tool. It directly
controls the operating system mouse and keyboard through PyAutoGUI and uses
the local webcam and microphone. Therefore it is **not a conventional web
server application** and cannot be meaningfully deployed to services such as
Render, Railway, or Vercel as a web app without redesigning the input layer.

A GitHub repository is the correct deployment/distribution target for this
current architecture. A browser-based live demo would require a separate
web implementation using browser camera/microphone APIs and browser-side
pointer/keyboard interaction, with appropriate browser security constraints.

## Model download

The MediaPipe model is downloaded on first setup by:

```bash
python download_model.py
```

This keeps the Git repository small and avoids committing a binary model.
