import os
import time
import threading

import cv2
import mediapipe as mp
import numpy as np
from mediapipe.tasks import python
from mediapipe.tasks.python import vision

from config import (
    BLINK_CONSECUTIVE_FRAMES,
    BLINK_COOLDOWN_SECONDS,
    BLINK_THRESHOLD,
    CAMERA_HEIGHT,
    CAMERA_INDEX,
    CAMERA_WIDTH,
    GAZE_SMOOTHING,
    MODEL_PATH,
)


LEFT_EYE_LEFT = 33
LEFT_EYE_RIGHT = 133
LEFT_EYE_TOP = 159
LEFT_EYE_BOTTOM = 145
LEFT_IRIS_CENTER = 468

RIGHT_EYE_LEFT = 362
RIGHT_EYE_RIGHT = 263
RIGHT_EYE_TOP = 386
RIGHT_EYE_BOTTOM = 374
RIGHT_IRIS_CENTER = 473


class GazeTracker:
    """Track gaze, perform stable blink-to-click, and provide diagnostics."""

    def __init__(self, mouse_controller, stop_event: threading.Event):
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(
                f"MediaPipe model not found: {MODEL_PATH}\n"
                "Run 'python download_model.py' from the project root first."
            )

        self.mouse = mouse_controller
        self.stop_event = stop_event
        self.screen_width, self.screen_height = self._get_screen_size()

        base_options = python.BaseOptions(model_asset_path=MODEL_PATH)
        options = vision.FaceLandmarkerOptions(
            base_options=base_options,
            running_mode=vision.RunningMode.VIDEO,
            num_faces=1,
            min_face_detection_confidence=0.5,
            min_face_presence_confidence=0.5,
            min_tracking_confidence=0.5,
            output_face_blendshapes=False,
            output_facial_transformation_matrixes=False,
        )
        self.landmarker = vision.FaceLandmarker.create_from_options(options)

        self.smooth_x = self.screen_width / 2
        self.smooth_y = self.screen_height / 2

        # Blink state.
        self.blink_frames = 0
        self.blink_active = False
        self.post_blink_hold_frames = 0
        self.last_click_time = 0.0

        self.timestamp_ms = 0

    @staticmethod
    def _get_screen_size():
        import pyautogui

        width, height = pyautogui.size()
        return int(width), int(height)

    @staticmethod
    def _distance(a, b):
        return float(np.hypot(a.x - b.x, a.y - b.y))

    def _eye_aspect_ratio(self, landmarks, left_side=True):
        if left_side:
            left = landmarks[LEFT_EYE_LEFT]
            right = landmarks[LEFT_EYE_RIGHT]
            top = landmarks[LEFT_EYE_TOP]
            bottom = landmarks[LEFT_EYE_BOTTOM]
        else:
            left = landmarks[RIGHT_EYE_LEFT]
            right = landmarks[RIGHT_EYE_RIGHT]
            top = landmarks[RIGHT_EYE_TOP]
            bottom = landmarks[RIGHT_EYE_BOTTOM]

        horizontal = self._distance(left, right)
        vertical = self._distance(top, bottom)

        return vertical / horizontal if horizontal > 1e-6 else 0.0

    def _eye_horizontal_ratio(self, landmarks, left_side=True):
        if left_side:
            eye_left = landmarks[LEFT_EYE_LEFT]
            eye_right = landmarks[LEFT_EYE_RIGHT]
            iris = landmarks[LEFT_IRIS_CENTER]
        else:
            eye_left = landmarks[RIGHT_EYE_LEFT]
            eye_right = landmarks[RIGHT_EYE_RIGHT]
            iris = landmarks[RIGHT_IRIS_CENTER]

        width = eye_right.x - eye_left.x

        if abs(width) < 1e-6:
            return 0.5

        return float(np.clip((iris.x - eye_left.x) / width, 0.0, 1.0))

    def _eye_vertical_ratio(self, landmarks, left_side=True):
        if left_side:
            top = landmarks[LEFT_EYE_TOP]
            bottom = landmarks[LEFT_EYE_BOTTOM]
            iris = landmarks[LEFT_IRIS_CENTER]
        else:
            top = landmarks[RIGHT_EYE_TOP]
            bottom = landmarks[RIGHT_EYE_BOTTOM]
            iris = landmarks[RIGHT_IRIS_CENTER]

        height = bottom.y - top.y

        if abs(height) < 1e-6:
            return 0.5

        return float(np.clip((iris.y - top.y) / height, 0.0, 1.0))

    def _map_gaze_to_screen(self, landmarks):
        x_ratio = (
            self._eye_horizontal_ratio(landmarks, True)
            + self._eye_horizontal_ratio(landmarks, False)
        ) / 2.0

        y_ratio = (
            self._eye_vertical_ratio(landmarks, True)
            + self._eye_vertical_ratio(landmarks, False)
        ) / 2.0

        x = x_ratio * (self.screen_width - 1)
        y = y_ratio * (self.screen_height - 1)

        return x, y, x_ratio, y_ratio

    def _check_blink(self, landmarks):
        """
        Detect a deliberate blink and click once when the eyes reopen.

        Crucially, the caller checks this BEFORE updating the mouse.
        That prevents the temporary iris/eyelid landmark movement caused
        by closing the eyes from moving the cursor vertically.
        """
        left_ear = self._eye_aspect_ratio(landmarks, True)
        right_ear = self._eye_aspect_ratio(landmarks, False)
        ear = (left_ear + right_ear) / 2.0

        if ear < BLINK_THRESHOLD:
            self.blink_frames += 1
            self.blink_active = True

        elif self.blink_active:
            # Eyes have reopened. A sufficiently long closure is a click.
            if self.blink_frames >= BLINK_CONSECUTIVE_FRAMES:
                now = time.time()

                if now - self.last_click_time >= BLINK_COOLDOWN_SECONDS:
                    self.mouse.click()
                    self.last_click_time = now

            self.blink_frames = 0
            self.blink_active = False

            # Ignore a few unstable post-blink frames.
            self.post_blink_hold_frames = 3

        else:
            self.blink_frames = 0

        return ear

    def _update_mouse(self, landmarks):
        x, y, x_ratio, y_ratio = self._map_gaze_to_screen(landmarks)

        self.smooth_x = (
            GAZE_SMOOTHING * x
            + (1.0 - GAZE_SMOOTHING) * self.smooth_x
        )

        self.smooth_y = (
            GAZE_SMOOTHING * y
            + (1.0 - GAZE_SMOOTHING) * self.smooth_y
        )

        mouse_x = int(np.clip(
            self.smooth_x,
            10,
            self.screen_width - 11,
        ))

        mouse_y = int(np.clip(
            self.smooth_y,
            10,
            self.screen_height - 11,
        ))

        self.mouse.move_to(mouse_x, mouse_y)

        return x_ratio, y_ratio, mouse_x, mouse_y

    def run(self):
        cap = cv2.VideoCapture(
            CAMERA_INDEX,
            cv2.CAP_AVFOUNDATION,
        )

        cap.set(cv2.CAP_PROP_FRAME_WIDTH, CAMERA_WIDTH)
        cap.set(cv2.CAP_PROP_FRAME_HEIGHT, CAMERA_HEIGHT)

        if not cap.isOpened():
            self.landmarker.close()
            raise RuntimeError(
                "Could not open the webcam. Check macOS camera permissions."
            )

        print("[Eye] Camera started.")
        print("[Eye] Look around to move the pointer; blink to click.")
        print("[Eye] Press Q in the camera window or say 'exit' to stop.")

        try:
            while not self.stop_event.is_set():
                ok, frame = cap.read()

                if not ok:
                    print("[Eye] Could not read a camera frame.")
                    self.stop_event.set()
                    break

                rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                mp_image = mp.Image(
                    image_format=mp.ImageFormat.SRGB,
                    data=rgb,
                )

                self.timestamp_ms += 33

                result = self.landmarker.detect_for_video(
                    mp_image,
                    self.timestamp_ms,
                )

                display = cv2.flip(frame, 1)

                if result.face_landmarks:
                    landmarks = result.face_landmarks[0]

                    # Blink detection MUST happen before gaze movement.
                    ear = self._check_blink(landmarks)

                    # Freeze the cursor while blinking and for a few frames
                    # after reopening the eyes. This prevents the iris/eyelid
                    # movement during a blink from moving the cursor.
                    if self.blink_active:
                        x_ratio = None
                        y_ratio = None
                        mouse_x = int(self.smooth_x)
                        mouse_y = int(self.smooth_y)
                    elif self.post_blink_hold_frames > 0:
                        self.post_blink_hold_frames -= 1
                        x_ratio = None
                        y_ratio = None
                        mouse_x = int(self.smooth_x)
                        mouse_y = int(self.smooth_y)
                    else:
                        x_ratio, y_ratio, mouse_x, mouse_y = self._update_mouse(
                            landmarks
                        )

                    h, w = display.shape[:2]

                    for iris_index in (
                        LEFT_IRIS_CENTER,
                        RIGHT_IRIS_CENTER,
                    ):
                        point = landmarks[iris_index]

                        px = int((1.0 - point.x) * w)
                        py = int(point.y * h)

                        cv2.circle(
                            display,
                            (px, py),
                            5,
                            (0, 255, 0),
                            -1,
                        )

                    cv2.putText(
                        display,
                        "FACE: YES",
                        (20, 35),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.7,
                        (0, 255, 0),
                        2,
                    )

                    if x_ratio is not None:
                        gaze_text = (
                            f"Gaze X: {x_ratio:.2f}  "
                            f"Y: {y_ratio:.2f}"
                        )
                    else:
                        gaze_text = "Gaze: PAUSED (blink)"

                    cv2.putText(
                        display,
                        gaze_text,
                        (20, 65),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.65,
                        (255, 255, 255),
                        2,
                    )

                    cv2.putText(
                        display,
                        f"Mouse: {mouse_x}, {mouse_y}",
                        (20, 95),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.65,
                        (255, 255, 255),
                        2,
                    )

                    cv2.putText(
                        display,
                        f"EAR: {ear:.2f}",
                        (20, 125),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.65,
                        (255, 255, 255),
                        2,
                    )

                    if self.blink_active:
                        cv2.putText(
                            display,
                            "BLINK DETECTED",
                            (20, 155),
                            cv2.FONT_HERSHEY_SIMPLEX,
                            0.7,
                            (0, 255, 255),
                            2,
                        )

                else:
                    cv2.putText(
                        display,
                        "FACE: NOT DETECTED",
                        (20, 40),
                        cv2.FONT_HERSHEY_SIMPLEX,
                        0.75,
                        (0, 0, 255),
                        2,
                    )

                cv2.putText(
                    display,
                    "Blink = Click | Q = Quit",
                    (20, display.shape[0] - 25),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    0.7,
                    (255, 255, 255),
                    2,
                )

                cv2.imshow("Eye Mouse Control", display)

                key = cv2.waitKey(1) & 0xFF

                if key == ord("q"):
                    self.stop_event.set()
                    break

        finally:
            cap.release()
            cv2.destroyAllWindows()
            self.landmarker.close()
