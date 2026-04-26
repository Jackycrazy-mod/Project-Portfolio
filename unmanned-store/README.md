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
```

### 3. Database Schema Design (MongoDB – Collections & Fields)
I designed the following collections (implementation by teammate):
- Customers – `_id (UUID)`, `name`, `email`, `phone`, `address`, `balance`, `age_group`, `gender`, `active`
- Products – `prod_id`, `name`, `price`, `stock_warehouse`, `stock_shelf`, `weight`, `category`
- Bills – `bill_id`, `customer_id`, `items (list of product+quantity)`, `entry_time`, `exit_time`, `total`
- Entry/Exit logs – `customer_id`, `timestamp`, `type (enter/exit)`

### 4. Hardware Interaction Logic (Signal Flow Design)
- Defined the NFC card entry gate sequence: card read → API call to /customer/login → check balance & active status → servo open → record entry.
- Defined the checkout counter flow: card tap → trigger camera → run YOLO detection → POST to /capture-shoppingList → store data → redirect to shopping list confirmation page.
- Specified weight sensor integration (optional): number of items calculated from weight change.
- Designed the gate device behaviour: HTTP server on ESP32 that listens for "open" command from API.

### 5. Flask API Server
I wrote the central Flask application that handles
- Landing page (entry point for checkout counter)
- Detection trigger endpoint (/capture-shoppingList) – calls my YOLO detection and stores the shopping list in a global data_set.
- Status polling (/get_status) – used by the landing page to detect when a shopping list is ready.
- Order confirmation (/confirm_order) – resets the session after checkout.
- All customer‑facing web pages (login/signup, selection, top‑up, reimbursement, shopping list confirmation).

### 6. Customer Web Portal (Front‑end & API Integration)
- Login & Signup (LogSignPage.html) – complete HTML/CSS/JS with async fetch calls to backend API.
- Selection page (SelectPage.html) – top‑up / reimbursement choices.
- Top‑up flow – amount input, payment method selection, balance update via API.
- Reimbursement (card cancellation) – deactivates the card.
- Shopping list confirmation (shoppingList.html) – displays detected items, total price, confirm button.

### Key Code Highlights
**Flask API – Detection Endpoint**
```python
@app.route("/capture-shoppingList", methods=["POST"])
def capture_shoppingList():
    data = request.get_json()
    shopping_dict = {}
    for i in detect()["shopping_list"]:
        shopping_dict[i] = shopping_dict.get(i, 0) + 1
    data_set["uuid"] = data["uuid"]
    data_set["shopping_list"] = shopping_dict
    data_set["new_status"] = True
    return data_set
```

**Front‑end – Login Function (from `LogSignPage.html`)**
```python
async function login() {
    const response = await fetch("https://.../customer/login", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: input_email, uuid: input_uuid })
    });
    const data = await response.json();
    if (data.match == true) {
        sessionStorage.setItem("email", input_email);
        sessionStorage.setItem("uuid", input_uuid);
        location.replace(extractedUrl + "app/pageSelect");
    } else {
        alert("Wrong ID or wrong password");
    }
}
```

### Screenshots:
<div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
  <figure style="margin: 0; text-align: center; width: 446px;">
    <img src="./images/landing_page.png" width="446" alt="Checkout Landing Page">
    <figcaption>
      Figure 1: Checkout counter – "Tap your card"
    </figcaption>
  </figure>
  <figure style="margin: 0; text-align: center; width: 446px;">
    <img src="./images/shopping_list.png" width="446" alt="Shopping List Confirmation">
    <figcaption>
      Figure 2: Detected items confirmation page
    </figcaption>
  </figure>
</div>
<div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
  <figure style="margin: 0; text-align: center; width: 446px;">
    <img src="./images/login_signup.png" width="446" alt="Login & Signup">
    <figcaption>
      Figure 3: Customer registration / login portal
    </figcaption>
  </figure>
  <figure style="margin: 0; text-align: center; width: 446px;">
    <img src="./images/topup.png" width="446" alt="Top-up page">
    <figcaption>
      Figure 4: Add balance to NFC card
    </figcaption>
  </figure>
</div>

### Note
This was a team final year project. The content above reflects only my personal contributions as project leader, system designer, AI model tuner, database schema designer, hardware interaction logic designer, and developer of the customer‑facing web portal + Flask API core. Backend sales analysis, hardware assembly, and Arduino code were completed by my teammates.
