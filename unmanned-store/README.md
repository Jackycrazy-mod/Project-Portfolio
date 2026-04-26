# Unmanned Store (Take & Go) – Final Year Project

An autonomous retail system that provides a seamless, cashier‑free shopping experience. Customers tap their NFC membership card to enter, pick items, and check out automatically via AI object detection. The system includes a membership management portal, inventory control, and sales analytics.

**My Role:** System Designer, AI Model Tuning, Database Schema Design, Hardware Interaction Logic, Front‑end & API Development (Core Modules)  
**Team:** 4 members – backend/sales analytics by teammates; my contributions as below.

---

## Project Overview

The Unmanned Store (inspired by Amazon Go) solves common retail pain points: long checkout queues, limited operating hours, high labour costs, and inefficient inventory management.

**Customer workflow:**
1. Register online → receive NFC card with UUID.
2. Tap card at entrance → gate opens, age‑based advert shown.
3. Pick items (weight sensors optional for verification).
4. At checkout counter: tap card again → camera runs YOLOv8 object detection → shopping list confirmed → bill deducted from balance → email receipt sent.

**Staff/Manager portal:**
- Inventory dashboard (stock levels, auto‑refresh).
- Daily/monthly sales reports with AI‑generated summaries (implemented by teammate).
- Membership management (top‑up, cancellation).

---

## My Contributions

### 1. Project Leadership & System Architecture
- Proposed the concept and overall workflow.
- Designed the end‑to‑end system architecture (entry → shopping → checkout → billing).
- Coordinated team members and integrated all modules.

### 2. AI Model Setup (YOLOv8 – Tuning & Restriction)
- Downloaded the pre‑trained YOLOv8l model.
- **Restricted detection to only three item classes:** `bottle`, `banana`, `book` (others ignored).
- Tuned the confidence threshold and filtering logic for the checkout counter.
- Wrote the `detect()` function that processes a video frame and returns a shopping list.

*Code snippet – my detection logic:*
```python
# From main.py (my code)
def detect():
    shopping_dict = {"shopping_list": []}
    cap = cv2.VideoCapture(0)  # or video file
    ret, frame = cap.read()
    results = model.track(frame, imgsz=1280)[0]
    detections = sv.Detections.from_yolov8(results)
    # ... track ID assignment ...
    detections = detections[(detections.class_id != 0)]  # filter out person class
    for _, confidence, class_id, tracker_id in detections:
        item = model.names[class_id]
        if item in ["bottle", "banana", "book"]:
            shopping_dict["shopping_list"].append(item)
    # ... return dictionary ...
