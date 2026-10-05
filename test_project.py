"""Lightweight offline checks for the project structure and Python syntax."""

from pathlib import Path
import py_compile


ROOT = Path(__file__).resolve().parent
FILES = [
    ROOT / "main.py",
    ROOT / "config.py",
    ROOT / "download_model.py",
    ROOT / "src" / "gaze_tracker.py",
    ROOT / "src" / "mouse_controller.py",
    ROOT / "src" / "voice_controller.py",
    ROOT / "src" / "clipboard_manager.py",
]


for path in FILES:
    py_compile.compile(str(path), doraise=True)
    print(f"OK: {path.relative_to(ROOT)}")

print("All Python syntax checks passed.")
