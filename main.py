import threading

from src.gaze_tracker import GazeTracker
from src.mouse_controller import MouseController
from src.voice_controller import VoiceController


def main():
    print("=" * 60)
    print("EYE MOUSE + VOICE CONTROL")
    print("=" * 60)
    print("Starting eye and voice control...")
    print("Press Q in the camera window or say 'exit' to stop.")

    stop_event = threading.Event()
    mouse = MouseController()
    gaze = None

    try:
        gaze = GazeTracker(mouse, stop_event)
        voice = VoiceController(mouse, stop_event)

        voice_thread = threading.Thread(
            target=voice.run,
            name="voice-controller",
            daemon=True,
        )
        voice_thread.start()

        gaze.run()

    except KeyboardInterrupt:
        print("\n[Main] Ctrl+C received. Stopping...")
        stop_event.set()
    except Exception as exc:
        print(f"[Main] Error: {exc}")
        stop_event.set()
    finally:
        stop_event.set()
        if gaze is not None:
            # GazeTracker.run() owns camera/MediaPipe cleanup in its finally block.
            pass
        print("[Main] Program stopped.")


if __name__ == "__main__":
    main()
