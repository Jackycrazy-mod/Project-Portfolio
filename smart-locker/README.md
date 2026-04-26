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
