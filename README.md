# KrishiRover: Autonomous Smart Farming Rover with Bangla Voice AI and IoT Dashboard

KrishiRover is an autonomous smart farming rover prototype designed for soil monitoring, smart irrigation, obstacle-aware movement, live IoT monitoring, and Bangla voice interaction. The system uses an ESP32-based rover, a Next.js web application, an IoT dashboard, and a Bangla AI voice assistant named **সেচবন্ধু**.

The rover can move through a prototype field, check soil moisture zone by zone, water only dry zones, avoid close obstacles, send live sensor data to a dashboard, and answer user questions in Bangla using live rover data.

---

## Project Title

**KrishiRover: An Autonomous Farming Rover for Soil Monitoring, Smart Irrigation, and Bangla Voice Interaction**

---

## Table of Contents

- [Overview](#overview)
- [Main Features](#main-features)
- [Main Innovation](#main-innovation)
- [How the System Works](#how-the-system-works)
- [AI Voice Assistant Architecture](#ai-voice-assistant-architecture)
- [IoT Dashboard Architecture](#iot-dashboard-architecture)
- [Hardware Components](#hardware-components)
- [ESP32 Pin Connection](#esp32-pin-connection)
- [Power Connection](#power-connection)
- [Software Technologies](#software-technologies)
- [Environment Variables](#environment-variables)
- [How to Run the Web Application](#how-to-run-the-web-application)
- [How to Upload ESP32 Code](#how-to-upload-esp32-code)
- [Website Pages](#website-pages)
- [API Routes](#api-routes)
- [Example Voice Commands](#example-voice-commands)
- [Demo Checklist](#demo-checklist)
- [Troubleshooting](#troubleshooting)
- [Team Members](#team-members)
- [Future Improvements](#future-improvements)
- [Conclusion](#conclusion)

---

## Overview

KrishiRover is built to demonstrate how robotics, IoT, and AI can support smart agriculture. The rover works as a field assistant. It moves through different zones, checks soil condition, detects obstacles, controls a water pump, and updates a live dashboard.

A Bangla AI voice assistant named **সেচবন্ধু** allows the user to interact with the rover naturally. For example, a user can walk beside the rover and ask:

- “সেচবন্ধু, আমি মাঠে হাঁটছি, সামনে কী অবস্থা?”
- “এই জোনে পানি লাগবে?”
- “মাটি শুকনা নাকি ভেজা?”
- “তাপমাত্রা কত?”
- “রোভার এখন কী করছে?”

The assistant answers using live rover sensor data and project knowledge.

---

## Main Features

- Autonomous rover movement from Zone A to Zone G and back
- Soil moisture monitoring for dry/wet soil detection
- Automatic irrigation only when dry soil is detected
- Pump runs for a short fixed time to save water
- Red LED indication when pump is running
- Green LED indication when soil is wet
- DHT11-based temperature and humidity monitoring
- Three ultrasonic sensors for obstacle detection
- Live IoT dashboard for real-time rover monitoring
- Bangla AI voice assistant named **সেচবন্ধু**
- Laptop microphone based Bangla speech input
- ESP32 speaker output using MAX98357A I2S amplifier
- Real-life field interaction style AI response
- Safety behavior: rover motor and pump stop while AI voice is speaking

---

## Main Innovation

The main innovation of KrishiRover is the integration of **autonomous field monitoring, smart irrigation, live IoT data, and Bangla AI voice interaction** in one low-cost farming rover prototype.

Most simple irrigation systems only turn a pump on or off based on soil moisture. KrishiRover extends this idea by adding rover mobility, zone-based monitoring, obstacle awareness, real-time dashboard updates, and Bangla voice interaction.

The system is designed to feel like a real field assistant. Instead of only showing sensor numbers, the AI assistant can explain the current field condition in simple Bangla. It can answer whether the soil is dry, whether water is needed, what the temperature is, what zone the rover is in, and whether there is an obstacle in front of the rover.

---

## How the System Works

1. The rover starts from Zone A.
2. It checks soil moisture at each zone.
3. If the soil is wet:
   - Green LED turns ON
   - Pump remains OFF
   - Rover continues moving
4. If the soil is dry:
   - Rover stops
   - Red LED turns ON
   - Pump turns ON for a short fixed time
   - Pump turns OFF
   - Rover continues to the next zone
5. While moving, the rover checks obstacles using ultrasonic sensors.
6. If an obstacle is close, the rover stops, turns, and avoids it.
7. After reaching Zone G, the rover turns back and moves from G to A.
8. The ESP32 sends live sensor data to the IoT dashboard.
9. The Bangla AI assistant reads the latest rover data and answers user questions.
10. When the AI voice is speaking, the rover motor and pump pause for safety.

---

## AI Voice Assistant Architecture

The Bangla voice assistant is named **সেচবন্ধু**.

The voice architecture works like this:

```txt
User speaks Bangla using laptop microphone
        ↓
Browser speech recognition converts speech to text
        ↓
Next.js /api/esp32-agent receives the question
        ↓
AI generates a Bangla answer using project knowledge + live rover data
        ↓
/api/bangla-tts converts the Bangla answer into audio
        ↓
/api/robot-speak stores the latest reply and TTS audio URL
        ↓
ESP32 polls /api/robot-speak
        ↓
ESP32 downloads the audio
        ↓
MAX98357A amplifier plays the answer through the speaker
