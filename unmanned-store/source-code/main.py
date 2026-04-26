import cv2
import supervision as sv
from ultralytics import YOLO
import numpy as np

# Load the YOLOv8 model
model = model = YOLO('yolov8l.pt')

def detect():
    shopping_dict = {"shopping_list":[]}

    # Open a video stream
    cap = cv2.VideoCapture("./Videos/books_bottle.mp4")

    # Read the first frame
    ret, frame = cap.read()

    # Check if the video opened successfully
    if not ret:
        print("Error opening video stream or file")
        exit()


    # Detect
    results = model.track(frame, imgsz=1280)[0]
    detections = sv.Detections.from_yolov8(results)

    if results.boxes.id is not None:
        detections.tracker_id = results.boxes.id.cpu().numpy().astype(int)

    detections = detections[(detections.class_id != 0)]

    for _, confidence, class_id, tracker_id in detections:
        item = model.names[class_id]
        if item == "bottle" or item == "banana" or item == "book":
            shopping_dict["shopping_list"].append(f"{item}")
        else:
            continue

    # Annotate
    box_annotator = sv.BoxAnnotator(thickness=2, 
                                    text_thickness=2, 
                                    text_scale=1)
    labels = [f"{tracker_id}#{model.names[class_id]} {confidence:0.2f}" for _, confidence, class_id, tracker_id in detections]
    annotated_frame = box_annotator.annotate(scene=frame, 
                                                detections=detections, 
                                                labels=labels)


    # Display the annotated frame
    # cv2.imshow('Frame', annotated_frame)

    # Break the loop if the 'q' key is pressed
    cv2.waitKey(1)


    # Read the next frame
    ret, frame = cap.read()

    # Release the video stream and close windows
    cap.release()
    cv2.destroyAllWindows()

    return shopping_dict

detect()