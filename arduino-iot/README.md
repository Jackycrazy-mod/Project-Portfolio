# Arduino IoT Sensing System – Warehouse Environmental Monitoring

A complete IoT solution for warehouse environmental monitoring, featuring **BLE sensor networks**, **real‑time data aggregation**, **MQTT cloud upload**, **automatic alerts** (PushPlus), and **local LCD display**. Designed to prevent goods deterioration and enable smart lighting control.

**My Role:** Project Leader, System Architect, Main Embedded Developer (Central Hub)  
**Team:** 4 members (BLE peripheral code by teammates; central hub, cloud integration, alerts by me)

---

## Project Overview

This system monitors temperature, humidity, and light level in a warehouse environment. It consists of:

- **BLE peripheral nodes** (Arduino Nano 33 BLE Sense) measuring temperature, humidity, and gyroscope data.
- **Central hub** (Arduino Nano 33 IoT + DHT11 + light sensor + buzzer + LED) that:
  - Scans and connects to BLE peripherals to read sensor data.
  - Reads local DHT11 and light sensor.
  - Uploads all data to **ThingSpeak** via MQTT every 20 seconds.
  - Triggers **buzzer & warning LED** if temperature > 20°C or humidity > 80%.
  - Sends **push notification** to mobile phone via PushPlus API.
  - Displays real‑time messages on a **16x2 LCD**.
- **ThingSpeak** dashboard for data visualisation.
- **Optional smart lighting**: When light level drops below threshold, an LED (simulated light) turns on.

---

## My Contributions (Code & System Integration)

I designed and implemented the **central hub** (the main intelligence of the system). My code handles:

- **WiFi connection & auto‑reconnect** (handles unstable networks).
- **BLE scanning** for two different peripheral UUIDs, reading temperature/humidity/gyroscope.
- **Local sensor reading**: DHT11 (temperature/humidity), photoresistor (light intensity).
- **Data aggregation** into a single MQTT payload (field1–field7) and publish to ThingSpeak.
- **Threshold monitoring**: If temperature > 20°C or humidity > 80%, activate buzzer and LED.
- **PushPlus API integration** – sends a detailed alert message with which sensor exceeded threshold and by how much.
- **Serial logging** for debugging (both main serial and secondary Serial1).
- **LCD output** (using LiquidCrystal library) to show messages like "LED is on/off" or incoming serial data.

The BLE peripheral code (`peripheral_ble_1.ino`, `peripheral_ble_2.ino`) and the basic LCD sketch were implemented by my teammates. I integrated their BLE data into my central hub.

---

## Key Code Snippet (Alert & Push Notification)

Below is the part I wrote that checks thresholds and sends a rich alert via PushPlus.

```cpp
// From central_IoT_V4.ino (my code)
int warring_tempreature = 20;
int warring_humidity = 80;
String content = "";
String title = "";
if (temperature_ble1 > warring_tempreature || iot_DHT11_temperature > warring_tempreature
    || humidity_ble1 > warring_humidity || iot_DHT11_humidity > warring_humidity
    || temperature_ble2 > warring_tempreature || humidity_ble2 > warring_humidity) {
  digitalWrite(10, HIGH);  // warning LED
  digitalWrite(br, HIGH);  // buzzer
  if (temperature_ble1 > warring_tempreature) {
    title += "BLE1温度超标/";
    content += "BLE1        温度：" + String(temperature_ble1) + "℃\n";
  }
  // ... similar checks for other sensors ...
  
  // Build JSON payload for PushPlus
  String json = "{";
  json += String("\"token\":\"") + token + "\",";
  json += String("\"title\":\"") + title + "\",";
  json += String("\"content\":\"") + content + "\",";
  json += "}";
  
  // Send HTTP POST to www.pushplus.plus
  client.print(request);
  // ...
}
