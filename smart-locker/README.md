# Smart Locker System

A web-controlled smart locker system for office document handover, featuring one-time password (OTP) authorization, real-time locker status, and environmental monitoring (temperature, humidity, motion-sensing light).

**My Role:** Project Leader, System Designer, Front-End API Integration, Database Schema Designer  
**Team:** 4 members (hardware, backend, ER diagram by teammates; my contributions as below)

---

## Project Overview

Employees can:
- Sign up / log in to access their assigned locker.
- Unlock/lock their own locker via web control panel.
- Authorize another employee (guest) to access the locker with a one-time password (OTP).
- Receive OTP via email (backend handles email).
- Guest enters OTP + locker ID to unlock.
- Hardware: ESP32 polls API for unlock command, controls electromagnetic lock, reads limit switch, DHT11, HC-SR505, buzzer, LED.

*Designed to eliminate face-to-face handover inconvenience and improve security.*

---

## My Contributions

### 1. Full System Design (Idea & Architecture)
- Proposed the concept and overall system architecture.
- Defined all user workflows: signup → login → unlock → share OTP → guest access.
- Specified the interaction between web frontend, API server, database, and MCU.

### 2. Hardware Interaction Logic (Exterior Wiring & Signal Protocol)
- Defined that the MCU (ESP32) should **poll an API endpoint** every short interval to read `doorCommand` field from database.
- Signal: `unlock: true` (value 1) → unlock; `unlock: false` (0) → no action / lock.
- Selected components: electromagnetic lock (XG-07E), limit switch (door status feedback), DHT11 (temp/humidity), HC-SR505 (motion sensor), buzzer, LED.
- Designed feedback loop: when door closes, limit switch triggers MCU to send API request updating `doorStatus` to "closed".

### 3. Database Schema Design (MongoDB)
I designed the following collections and fields (ER diagram and actual implementation were done by teammates based on my design):

**Users**  
- `emp_id` (number, unique)  
- `password` (string)  
- `name` (string)  
- `locker_id` (number, reference to lockers)  
- `email` (string)

**Lockers**  
- `locker_id` (number)  
- `doorCommand` (boolean) – written by frontend, read by MCU  
- `doorStatus` (string: "open"/"closed") – written by MCU, read by frontend  
- `assigned_user_id` (number)

**OTP**  
- `otp` (number, 6-digit)  
- `locker_id` (number)  
- `receiver_id` (number)  
- `expiry` (timestamp)

### 4. Front-End API Integration (JavaScript)
I wrote the entire front-end logic that interacts with the backend API. Below are key code examples from my `index.js`.

#### Login Function
```javascript
async function login() {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            emp_id: Number(document.getElementById("login_emp_id").value),
            password: document.getElementById("login_password").value
        })
    }
    const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/login", requestOptions)
    const data = await response.json()
    if (data.match == true) {
        sessionStorage.setItem("user_id", Number(document.getElementById("login_emp_id").value))
        sessionStorage.setItem("loc_id", data.loc_id)
        location.replace("control_panel.html")
    } else {
        alert("Wrong ID or wrong password")
    }
}
```

#### Unlock Locker Function
```javascript
async function lockerUnLock() {
    const user_id = sessionStorage.getItem("user_id")
    const requestOptions = {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ emp_id: user_id, unlock: true })
    }
    const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/openlocker", requestOptions)
    const data = await response.json()
    if (data.modifiedCount == 1) {
        window.alert("You have successfully unlocked the locker!")
    }
}
```

#### Share Access (Generate OTP)
```javascript
async function giveAccess(name) {
    // get receiver_id from employee list, then
    await getAccess(sender_id, receiver_id)
}

async function getAccess(sender_id, receiver_id) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ sender_id: Number(sender_id), receiver_id: Number(receiver_id), comment: "" })
    }
    const response = await fetch("https://iot-project-api.to-po-chun.repl.co/emp/share", requestOptions)
    const data = await response.json()
    window.alert(`Your OTP is ${data.otp}`)  // OTP also sent via email by backend
}
```

#### Guest Access with OTP
```javascript
async function guest_access() {
    const requestOptions = {
        method: 'PUT',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
            loc_id: Number(document.getElementById("locker_id").value),
            otp: Number(document.getElementById("otp_password").value)
        })
    }
    const response = await fetch("https://iot-project-api.to-po-chun.repl.co/guest/openlocker", requestOptions)
    const data = await response.json()
    if (data.match == true) {
        sessionStorage.setItem("gloc_id", data.find_match.locker_id)
        alert("Login successfully!")
        location.replace("guest_unlock_okay.html")
    } else {
        alert("Your one-time password is wrong!")
    }
}
```
### 5. Technologies Used
- Frontend: HTML, CSS, JavaScript (vanilla, async/await, fetch API, sessionStorage)
- Backend (designed by me, implemented by teammate): Node.js + Express REST API
- Database: MongoDB (schema designed by me)
- Hardware (logic designed by me, implemented by teammate): ESP32, electromagnetic lock, DHT11, HC-SR505, buzzer, LED

### 6. Key Design Diagrams & Screenhots
<div style="display: flex; gap: 20px; justify-content: center; flex-wrap: wrap;">
  <div style="text-align: center; width: 446px;">
    <div style="font-weight: bold; margin-bottom: 8px;">Figure 1: Login page</div>
    <img src="https://github.com/user-attachments/assets/fdc8c0bb-61fd-4a2f-a749-1a30ea3d44e0" width="446" height="247" alt="Login page">
  </div>
  <div style="text-align: center; width: 446px;">
    <div style="font-weight: bold; margin-bottom: 8px;">Figure 2: Control panel</div>
    <img src="https://github.com/user-attachments/assets/d784edd3-2d11-4a3a-8a48-66fd9b015858" width="446" height="247" alt="Control panel">
  </div>
</div>

