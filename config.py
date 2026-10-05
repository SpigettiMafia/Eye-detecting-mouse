from pathlib import Path
import platform

# Project paths
BASE_DIR = Path(__file__).resolve().parent
MODEL_PATH = str(BASE_DIR / "models" / "face_landmarker.task")

# Gaze tracking
GAZE_SMOOTHING = 0.25
BLINK_THRESHOLD = 0.20
BLINK_CONSECUTIVE_FRAMES = 2
BLINK_COOLDOWN_SECONDS = 0.70

# Camera
CAMERA_INDEX = 0
CAMERA_WIDTH = 1280
CAMERA_HEIGHT = 720

# Mouse
MOUSE_MOVE_DURATION = 0.03
MOUSE_SAFETY_MARGIN = 10

# Voice
VOICE_LANGUAGE = "en-IN"
VOICE_TIMEOUT = 4
VOICE_PHRASE_TIME_LIMIT = 6

OPERATING_SYSTEM = platform.system()
