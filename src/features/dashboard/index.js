import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { setAppLoading, showToast } from "../../actions";
import { fetchDayAnalysis } from "./apis";

import ControlLogs from "./components/ControlLogs";
import CommandStats from "./components/CommandStats";
import TotalOnTime from "./components/TotalOnTime";

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
      showToast("Select an appliance!");
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
      showToast(response.message);
    }
    setAnalysisData(response.data);
  };

  return (
    <Box sx={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>

      {/* Header */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button variant="outlined" onClick={() => navigate(-1)}>
          Back
        </Button>
        <Typography variant="h5" sx={{ flex: 1, textAlign: "center" }}>
          Analytics
        </Typography>
      </Box>

      {/* Form */}
      <Box
        sx={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "12px",
          boxShadow: 2,
          mb: 3,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          Select
        </Typography>

        {/* Room Select */}
        <Select
          value={selectedRoom}
          onChange={(e) => setSelectedRoom(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select Room
          </MenuItem>
          {roomsData.map((room) => (
            <MenuItem key={room.value} value={room.value}>
              {room.label}
            </MenuItem>
          ))}
        </Select>

        {/* Appliance Select */}
        <Select
          value={selectedAppliance}
          onChange={(e) => setSelectedAppliance(e.target.value)}
          displayEmpty
          fullWidth
          sx={{ mb: 2 }}
        >
          <MenuItem value="" disabled>
            Select Appliance
          </MenuItem>
          {appliancesData.map((app) => (
            <MenuItem key={app.value} value={app.value}>
              {app.label}
            </MenuItem>
          ))}
        </Select>

        {/* Date Picker */}
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Select Date"
            value={selectedDate}
            onChange={(newValue) => setSelectedDate(newValue)}
            maxDate={dayjs()}
            format="DD/MM/YYYY"
            renderInput={(params) => (
              <TextField fullWidth sx={{ mb: 2 }} {...params} />
            )}
          />
        </LocalizationProvider>

        {/* Submit */}
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Get Data"}
        </Button>
      </Box>

      {/* Analysis Data */}
      {analysisData && (
        <>
          <CommandStats data={analysisData} appliance={selectedAppliance} />
          <TotalOnTime data={analysisData} appliance={selectedAppliance} />
          <Box sx={{ mb: 5 }}>
            <ControlLogs
              selectedDate={selectedDate}
              data={analysisData}
              appliance={selectedAppliance}
            />
          </Box>
        </>
      )}
    </Box>
  );
}
