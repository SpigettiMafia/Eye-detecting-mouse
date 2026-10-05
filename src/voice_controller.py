import re
import threading

import speech_recognition as sr

from config import VOICE_LANGUAGE, VOICE_PHRASE_TIME_LIMIT, VOICE_TIMEOUT


class VoiceController:
    """Listen for speech and execute voice commands or type dictated text."""

    # All phrases here are treated as commands instead of being typed.
    COMMANDS = {
        # Clipboard
        "copy": "copy",
        "copy this": "copy",
        "copy it": "copy",
        "copy selected": "copy",
        "copy selection": "copy",
        "copy all": "copy_all",
        "copy everything": "copy_all",

        "paste": "paste",
        "paste it": "paste",
        "paste here": "paste",

        # Selection
        "select all": "select_all",
        "select everything": "select_all",
        "select all text": "select_all",

        # Mouse
        "click": "click",
        "left click": "click",
        "click here": "click",
        "double click": "double_click",
        "double-click": "double_click",
        "double click here": "double_click",
        "right click": "right_click",
        "right-click": "right_click",

        # Keyboard
        "enter": "enter",
        "press enter": "enter",
        "backspace": "backspace",
        "press backspace": "backspace",
        "space": "space",
        "press space": "space",
        "escape": "escape",
        "esc": "escape",
        "press escape": "escape",

        # Shutdown
        "exit": "exit",
        "quit": "exit",
        "stop": "exit",
        "exit program": "exit",
        "quit program": "exit",
        "stop program": "exit",
    }

    def __init__(self, mouse_controller, stop_event: threading.Event):
        self.mouse = mouse_controller
        self.stop_event = stop_event
        self.recognizer = sr.Recognizer()
        self.microphone = sr.Microphone()

    @staticmethod
    def _normalize_text(text: str) -> str:
        """Normalize recognition output before command matching."""
        text = text.lower().strip()
        text = re.sub(r"[^\w\s-]", "", text)
        text = re.sub(r"\s+", " ", text)
        return text

    def _handle_command(self, text: str) -> None:
        text = self._normalize_text(text)
        command = self.COMMANDS.get(text)

        if command == "copy":
            print("[Voice] Command: COPY")
            self.mouse.copy()

        elif command == "copy_all":
            # Natural-language "copy all" means:
            # select everything first, then copy it.
            print("[Voice] Command: SELECT ALL + COPY")
            self.mouse.select_all()
            self.mouse.copy()

        elif command == "paste":
            print("[Voice] Command: PASTE")
            self.mouse.paste()

        elif command == "select_all":
            print("[Voice] Command: SELECT ALL")
            self.mouse.select_all()

        elif command == "click":
            print("[Voice] Command: CLICK")
            self.mouse.click()

        elif command == "double_click":
            print("[Voice] Command: DOUBLE CLICK")
            self.mouse.double_click()

        elif command == "right_click":
            print("[Voice] Command: RIGHT CLICK")
            self.mouse.right_click()

        elif command == "enter":
            print("[Voice] Command: ENTER")
            self.mouse.key_press("enter")

        elif command == "backspace":
            print("[Voice] Command: BACKSPACE")
            self.mouse.key_press("backspace")

        elif command == "space":
            print("[Voice] Command: SPACE")
            self.mouse.key_press("space")

        elif command == "escape":
            print("[Voice] Command: ESCAPE")
            self.mouse.key_press("esc")

        elif command == "exit":
            print("[Voice] Exit command received.")
            self.stop_event.set()

        else:
            # Anything that isn't a recognized command is treated as dictation.
            print(f"[Voice] Dictation: {text}")
            self.mouse.type_text(text)

    def run(self) -> None:
        """Run the voice loop until the shared stop event is set."""
        try:
            with self.microphone as source:
                print("[Voice] Calibrating microphone for background noise...")
                self.recognizer.adjust_for_ambient_noise(source, duration=1)
                print("[Voice] Calibration complete.")

                while not self.stop_event.is_set():
                    try:
                        audio = self.recognizer.listen(
                            source,
                            timeout=VOICE_TIMEOUT,
                            phrase_time_limit=VOICE_PHRASE_TIME_LIMIT,
                        )
                    except sr.WaitTimeoutError:
                        continue

                    if self.stop_event.is_set():
                        break

                    try:
                        text = self.recognizer.recognize_google(
                            audio,
                            language=VOICE_LANGUAGE,
                        )
                    except sr.UnknownValueError:
                        continue
                    except sr.RequestError as exc:
                        print(f"[Voice] Recognition service error: {exc}")
                        continue

                    text = self._normalize_text(text)

                    if not text:
                        continue

                    print(f"[Voice] Heard: {text}")
                    self._handle_command(text)

        except (OSError, AttributeError) as exc:
            print(f"[Voice] Microphone unavailable: {exc}")
        except Exception as exc:
            print(f"[Voice] Controller stopped due to error: {exc}")
        finally:
            if self.stop_event.is_set():
                print("[Voice] Voice controller stopped.")
