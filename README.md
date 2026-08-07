# KrishiRover

KrishiRover is an autonomous smart farming rover with soil monitoring, smart irrigation, obstacle detection, IoT dashboard, and Bangla AI voice interaction. The project uses an ESP32-based rover for hardware control and a Next.js web application for the dashboard, AI agent, and voice system.

The Bangla AI assistant is named **সেচবন্ধু**. It can answer real-life field questions using live rover data such as soil moisture, temperature, humidity, pump status, obstacle distance, and current zone.

---

## Project Title

**KrishiRover: An Autonomous Farming Rover for Soil Monitoring, Smart Irrigation, and Bangla Voice Interaction**

---

## Software Stack

### Web Application

- **Next.js** — full-stack web application framework
- **React** — frontend UI
- **TypeScript** — type-safe JavaScript
- **Tailwind CSS** — UI styling
- **Next.js API Routes** — backend API for rover data, AI agent, TTS, and robot voice communication

### AI and Voice

- **Groq API** — AI response generation
- **Groq SDK** — connection between Next.js and Groq AI
- **Google TTS API** — Bangla text-to-speech audio generation
- **Browser Speech Recognition API** — laptop microphone voice input
- **Bangla AI Assistant** — real-life field interaction assistant named **সেচবন্ধু**

### ESP32 / Embedded System

- **Arduino IDE** — ESP32 code upload and testing
- **ESP32 Arduino Core** — ESP32 board support
- **WiFi Library** — ESP32 Wi-Fi connection
- **HTTPClient Library** — ESP32 API communication with Next.js server
- **ArduinoJson** — JSON data creation and parsing
- **DHT Sensor Library** — temperature and humidity reading
- **ESP8266Audio Library** — MP3 audio playback on ESP32
- **MAX98357A I2S Audio Output** — speaker output for AI voice

---

## Hardware Used

- ESP32 Dev Module
- L298N Motor Driver
- 4 DC Motors
- 3 HC-SR04 Ultrasonic Sensors
- Capacitive Soil Moisture Sensor
- DHT11 Temperature and Humidity Sensor
- 5V Relay Module
- Mini DC Water Pump
- MAX98357A I2S Audio Amplifier
- Speaker
- Red LED
- Green LED
- Buck Converter
- Battery / Power Bank
- Jumper Wires

---

## Main Features

- Autonomous rover movement through field zones
- Soil moisture detection
- Dry/wet soil classification
- Automatic irrigation for dry soil
- Pump ON for a fixed time to reduce water waste
- Red LED when pump is running
- Green LED when soil is wet
- Temperature and humidity monitoring
- Obstacle detection using ultrasonic sensors
- Live IoT dashboard
- Bangla AI voice assistant
- Laptop microphone based Bangla speech input
- ESP32 speaker output using MAX98357A
- Motor and pump stop during AI voice playback for safety

---

## How the System Works

The ESP32 controls the physical rover. It reads soil moisture, temperature, humidity, and obstacle distance. It controls the motor driver, relay pump, LEDs, and speaker.

The ESP32 sends live data to the Next.js server through:

```txt
POST /api/rover-data
node -v
npm -v
git --version
git clone https://github.com/your-username/your-repository-name.git
cd your-repository-name
npm install
npm install next react react-dom groq-sdk google-tts-api
npm install -D typescript tailwindcss
rmdir /s /q node_modules
del package-lock.json
npm install