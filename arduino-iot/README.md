# Arduino IoT Sensing System – Warehouse Environmental Monitoring

A complete IoT solution for warehouse environmental monitoring, featuring **BLE sensor networks**, **real‑time data aggregation**, **MQTT cloud upload**, **automatic alerts** (PushPlus), **local LCD display**, and a **Python data retrieval template**. Designed to prevent goods deterioration and enable smart lighting control.

**My Role:** Hardware Wiring, Python Data Scripting  
**Team:** 4 members (BLE peripheral code by teammates; central hub, cloud integration, alerts, hardware, Python template by me)

---

## Project Overview

This system monitors temperature, humidity, and light level in a warehouse environment. It consists of:

- **BLE peripheral nodes** (Arduino Nano 33 BLE Sense) measuring temperature, humidity, and gyroscope data.
- **Central hub** (Arduino Nano 33 IoT + DHT11 + light sensor + buzzer + LED + LCD) that:
  - Scans and connects to BLE peripherals to read sensor data.
  - Reads local DHT11 and light sensor.
  - Uploads all data to **ThingSpeak** via MQTT every 20 seconds.
  - Triggers **buzzer & warning LED** if temperature > 20°C or humidity > 80%.
  - Sends **push notification** to mobile phone via PushPlus API.
  - Displays real‑time messages on a **16x2 LCD**.
- **ThingSpeak** dashboard for data visualisation.
- **Python script** to fetch and format data from ThingSpeak API (used by teammate for web display).
- **Smart lighting**: When light level drops below threshold, an LED (simulated light) turns on.

---

## My Contributions (Code, Hardware, Scripts)

### 1. Central Hub Embedded Code (Arduino)
I designed and implemented the **central hub** (the main intelligence of the system). My code handles:
- WiFi connection & auto‑reconnect.
- BLE scanning for two different peripheral UUIDs, reading temperature/humidity/gyroscope.
- Local sensor reading: DHT11, photoresistor.
- Data aggregation into a single MQTT payload (field1–field7) and publish to ThingSpeak.
- Threshold monitoring (temp >20°C, humidity >80%) → activate buzzer and LED.
- PushPlus API integration – sends detailed alert message.
- Serial logging and LCD output.
```
int warring_tempreature = 20;
int warring_humidity = 80;
String content = "";
String title = "";
if (temperature_ble1 > warring_tempreature || ... ) {
  digitalWrite(10, HIGH);  // warning LED
  digitalWrite(br, HIGH);  // buzzer
  if (temperature_ble1 > warring_tempreature) {
    title += "BLE1温度超标/";
    content += "BLE1        温度：" + String(temperature_ble1) + "℃\n";
  }
  // ... build JSON and send to PushPlus
}
```

### 2. Hardware Wiring & Assembly
I physically connected all components to the Arduino Nano 33 IoT:
- DHT11 (data pin 3)
- Photoresistor (A3)
- Buzzer (pin 8)
- Warning LED (pin 10), Light simulation LED (pin 7)
- LCD (pins 13,12,11,10,9,8 – see code) – *some pins may overlap; actual wiring followed schematic in report.*

### 3. Python Data Collection Template
I wrote a Python script that fetches the latest 20 records from the ThingSpeak API and prints them in a formatted table. This script served as a template for my teammate to integrate into a web dashboard.

```python
# import requests.py – my script
import requests

response = requests.get("https://api.thingspeak.com/channels/2076060/feeds.json?")
data = response.json()

for i in range(len(data["feeds"])):
    time = data["feeds"][i]["created_at"]
    ble1_temp = data["feeds"][i]["field1"]
    iot_temp = data["feeds"][i]["field2"]
    ble2_temp = data["feeds"][i]["field3"]
    ble1_hum = data["feeds"][i]["field4"]
    iot_hum = data["feeds"][i]["field5"]
    ble2_hum = data["feeds"][i]["field6"]
    light = data["feeds"][i]["field7"] or 0
    print(f"Record created in {time}:")
    print(f"Temperature\t|Humidity\t|Luminance")
    print(f"BLE1: {float(ble1_temp):.2f}\t|BLE1: {float(ble1_hum):.2f}\t|{float(light):.2f}")
    print(f"BLE2: {float(ble2_temp):.2f}\t|BLE2: {float(ble2_hum):.2f}\t|{float(light):.2f}")
```

## Hardware Components
| Component | Purpose |
| -------- | -------- |
| Arduino Nano 33 IoT | Main controller |
| Row 2, Col 1 | Row 2, Col 2 |

## Screenshots
<img width="940" height="527" alt="image" src="https://github.com/user-attachments/assets/f59474f4-bf8f-495b-aaa2-bc3a471bd6e6" />
<img width="684" height="376" alt="image" src="https://github.com/user-attachments/assets/5ad5fb00-a1df-44b6-8be0-c92e0f61b6bb" />
<img width="1920" height="1080" alt="image4" src="https://github.com/user-attachments/assets/35d0b82a-87ac-46af-8cde-bdf4ddaf541c" />

