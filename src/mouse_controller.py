import pyautogui

from config import MOUSE_MOVE_DURATION, MOUSE_SAFETY_MARGIN, OPERATING_SYSTEM


class MouseController:
    """Centralized OS mouse/keyboard control."""

    def __init__(self):
        # Keep the emergency PyAutoGUI fail-safe enabled.
        pyautogui.FAILSAFE = True
        pyautogui.PAUSE = 0.01

    def move_to(self, x: int, y: int) -> None:
        """Move the pointer while avoiding the exact PyAutoGUI corners."""
        width, height = pyautogui.size()
        margin = MOUSE_SAFETY_MARGIN

        safe_x = max(margin, min(int(x), width - margin - 1))
        safe_y = max(margin, min(int(y), height - margin - 1))

        pyautogui.moveTo(safe_x, safe_y, duration=MOUSE_MOVE_DURATION)

    def click(self) -> None:
        pyautogui.click()

    def double_click(self) -> None:
        pyautogui.doubleClick()

    def right_click(self) -> None:
        pyautogui.rightClick()

    def key_press(self, key: str) -> None:
        pyautogui.press(key)

    def type_text(self, text: str) -> None:
        pyautogui.write(text, interval=0.01)

    def copy(self) -> None:
        modifier = "command" if OPERATING_SYSTEM == "Darwin" else "ctrl"
        pyautogui.hotkey(modifier, "c")

    def paste(self) -> None:
        modifier = "command" if OPERATING_SYSTEM == "Darwin" else "ctrl"
        pyautogui.hotkey(modifier, "v")

    def select_all(self) -> None:
        modifier = "command" if OPERATING_SYSTEM == "Darwin" else "ctrl"
        pyautogui.hotkey(modifier, "a")
