"use client";

import { useEffect, useState } from "react";

type RoverData = {
  soilValue: number;
  soilStatus: "DRY" | "WET";
  temperature: number | null;
  humidity: number | null;
  pumpStatus: "ON" | "OFF";
  redLed: "ON" | "OFF";
  greenLed: "ON" | "OFF";
  frontDistance: number | null;
  leftDistance: number | null;
  rightDistance: number | null;
  roverStatus: string;
  updatedAt: string;
};

export default function IotDashboardPage() {
  const [data, setData] = useState<RoverData | null>(null);
  const [status, setStatus] = useState("Loading...");

  async function loadData() {
    try {
      const res = await fetch("/api/rover-data", {
        cache: "no-store",
      });

      const json = await res.json();

      if (json.ok) {
        setData(json.data);
        setStatus("Connected");
      } else {
        setStatus("API error");
      }
    } catch (error) {
      console.error(error);
      setStatus("Disconnected");
    }
  }

  useEffect(() => {
    loadData();
    const timer = setInterval(loadData, 1500);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-slate-950 text-white p-6">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-4xl font-bold mb-2">Krishi Rover IoT Dashboard</h1>
        <p className="text-slate-300 mb-6">
          Live sensor data from ESP32 rover.
        </p>

        <div className="mb-6 rounded-2xl bg-slate-900 border border-slate-700 p-4">
          <p className="text-sm text-slate-400">Connection Status</p>
          <p className="text-xl font-bold">{status}</p>
          <p className="text-sm text-slate-400 mt-1">
            Last Update: {data?.updatedAt || "No data yet"}
          </p>
        </div>

        {!data ? (
          <div className="rounded-2xl bg-slate-900 border border-slate-700 p-6">
            No rover data received yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card
              title="Soil Moisture"
              value={`${data.soilValue}`}
              sub={data.soilStatus === "DRY" ? "Dry Soil" : "Wet/Okay Soil"}
              highlight={data.soilStatus === "DRY" ? "red" : "green"}
            />

            <Card
              title="Temperature"
              value={
                data.temperature === null
                  ? "Error"
                  : `${data.temperature.toFixed(1)} °C`
              }
              sub="DHT11 reading"
            />

            <Card
              title="Humidity"
              value={
                data.humidity === null
                  ? "Error"
                  : `${data.humidity.toFixed(1)} %`
              }
              sub="DHT11 reading"
            />

            <Card
              title="Pump Status"
              value={data.pumpStatus}
              sub={data.pumpStatus === "ON" ? "Watering active" : "Pump off"}
              highlight={data.pumpStatus === "ON" ? "red" : "green"}
            />

            <Card
              title="LED Status"
              value={`Red: ${data.redLed} | Green: ${data.greenLed}`}
              sub="Dry/Wet indicator"
            />

            <Card
              title="Rover Status"
              value={data.roverStatus}
              sub="Current movement/action"
            />

            <Card
              title="Front Distance"
              value={
                data.frontDistance === null ? "N/A" : `${data.frontDistance} cm`
              }
              sub="Front ultrasonic"
            />

            <Card
              title="Left Distance"
              value={
                data.leftDistance === null ? "N/A" : `${data.leftDistance} cm`
              }
              sub="Left ultrasonic"
            />

            <Card
              title="Right Distance"
              value={
                data.rightDistance === null ? "N/A" : `${data.rightDistance} cm`
              }
              sub="Right ultrasonic"
            />
          </div>
        )}
      </div>
    </main>
  );
}

function Card({
  title,
  value,
  sub,
  highlight,
}: {
  title: string;
  value: string;
  sub: string;
  highlight?: "red" | "green";
}) {
  const color =
    highlight === "red"
      ? "border-red-500 text-red-300"
      : highlight === "green"
      ? "border-green-500 text-green-300"
      : "border-slate-700 text-white";

  return (
    <div className={`rounded-2xl bg-slate-900 border p-5 ${color}`}>
      <p className="text-sm text-slate-400">{title}</p>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-slate-400 mt-2">{sub}</p>
    </div>
  );
}