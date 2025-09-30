import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import toast from "react-hot-toast";

import { fetchDayAnalysis } from "./apis";
import ControlLogs from "./components/ControlLogs";
import CommandStats from "./components/CommandStats";
import TotalOnTime from "./components/TotalOnTime";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";

export default function AnalyticsV3() {
  const themes = useSelector((state) => state.color);
  const rooms = useSelector((state) => state.rooms);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedAppliance, setSelectedAppliance] = useState("");
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [roomsData, setRoomsData] = useState([]);
  const [appliancesData, setAppliancesData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    const processedRooms = [];
    if (rooms && rooms.list && Array.isArray(rooms.list)) {
      for (const room of rooms.list) {
        processedRooms.push({ label: room.roomName, value: room._id });
      }
    } else {
      processedRooms.push({ label: "No Rooms", value: null });
    }
    setRoomsData(processedRooms);
  }, [rooms]);

  useEffect(() => {
    const processedAppliances = [];

    if (selectedRoom && rooms && rooms.list) {
      const room = rooms.list.find((room) => room._id === selectedRoom);
      const devices = room?.devices;

      if (devices && Array.isArray(devices)) {
        if (devices.length === 0) {
          processedAppliances.push({
            label: "No Appliance available",
            value: null,
          });
        } else {
          for (const device of devices) {
            if (device.switches && Array.isArray(device.switches)) {
              for (const s of device.switches) {
                if (s?.deviceType === 7) continue;
                processedAppliances.push({
                  label: s.switchName,
                  value: `${device.deviceId}_${s.switchId}`,
                });
              }
            }
          }
        }
      }
    }

    setAppliancesData(processedAppliances);
  }, [rooms, selectedRoom]);

  useEffect(() => {
    setAnalysisData(null);
  }, [selectedAppliance]);

  const handleSubmit = async () => {
    if (!selectedAppliance) {
      toast.error("Select an appliance!");
      return;
    }
    const formData = {
      deviceId: selectedAppliance.split("_")[0],
      day: selectedDate.startOf("day").valueOf(),
    };
    setLoading(true);
    const response = await fetchDayAnalysis(formData);
    setLoading(false);
    if (!response.success) {
      toast.error(response.message);
    } else {
      setAnalysisData(response.data);
    }
  };

  return (
    <div className="p-5 max-w-xl mx-auto">
      <div className="flex items-center mb-4">
        <Button onClick={() => navigate(-1)} variant="outline">
          Back
        </Button>
        <h2 className="text-xl font-semibold flex-1 text-center">Analytics</h2>
      </div>
      <div className="bg-white p-5 rounded-xl shadow mb-5">
        <h3 className="text-lg font-semibold mb-4 text-center">Select</h3>
        <div className="mb-4">
          <Label>Room</Label>
          <Select value={selectedRoom} onValueChange={(val) => setSelectedRoom(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Room" />
            </SelectTrigger>
            <SelectContent>
              {roomsData.map((room) => (
                <SelectItem key={room.value} value={room.value}>
                  {room.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label>Appliance</Label>
          <Select value={selectedAppliance} onValueChange={(val) => setSelectedAppliance(val)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Appliance" />
            </SelectTrigger>
            <SelectContent>
              {appliancesData.map((app) => (
                <SelectItem key={app.value} value={app.value}>
                  {app.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mb-4">
          <Label>Date</Label>
          <Calendar
            mode="single"
            selected={selectedDate.toDate()}
            onSelect={(date) => setSelectedDate(dayjs(date))}
            className="w-full border rounded"
          />
        </div>
        <Button
          className="w-full mt-2"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          ) : (
            "Get Data"
          )}
        </Button>
      </div>
      {analysisData && (
        <>
          <CommandStats data={analysisData} appliance={selectedAppliance} />
          <TotalOnTime data={analysisData} appliance={selectedAppliance} />
          <div className="mb-5">
            <ControlLogs
              selectedDate={selectedDate}
              data={analysisData}
              appliance={selectedAppliance}
            />
          </div>
        </>
      )}
    </div>
  );
}
