import pyperclip


def get_clipboard() -> str:
    """Return text currently stored in the system clipboard."""
    return pyperclip.paste()


def set_clipboard(text: str) -> None:
    """Put text into the system clipboard."""
    pyperclip.copy(text)
