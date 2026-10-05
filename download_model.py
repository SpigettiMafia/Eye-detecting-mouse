from pathlib import Path
import ssl
import urllib.request

import certifi


MODEL_URL = (
    "https://storage.googleapis.com/mediapipe-models/face_landmarker/"
    "face_landmarker/float16/1/face_landmarker.task"
)
MODEL_DIR = Path(__file__).resolve().parent / "models"
MODEL_PATH = MODEL_DIR / "face_landmarker.task"


def main():
    if MODEL_PATH.exists() and MODEL_PATH.stat().st_size > 1_000_000:
        print(f"Model already exists: {MODEL_PATH}")
        return

    MODEL_DIR.mkdir(parents=True, exist_ok=True)
    print("Downloading the MediaPipe Face Landmarker model...")
    print("Source: Google MediaPipe model storage")

    context = ssl.create_default_context(cafile=certifi.where())
    with urllib.request.urlopen(MODEL_URL, context=context, timeout=60) as response:
        with MODEL_PATH.open("wb") as destination:
            while True:
                chunk = response.read(1024 * 1024)
                if not chunk:
                    break
                destination.write(chunk)

    print(f"Model downloaded successfully: {MODEL_PATH}")


if __name__ == "__main__":
    main()
