import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { fetchDayAnalysis } from "./apis";
import ControlLogs from "./ControlLogs";
import toast from "react-hot-toast";

export default function LogsModal({
  open,
  onClose,
  deviceId,
  switchId,
  applianceName,
}) {
  const [date, setDate] = useState(dayjs());
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    if (!open) {
      setDate(dayjs());
      setAnalysisData(null);
      setLoading(false);
    }
  }, [open]);

  const handleViewLogs = async () => {
    if (!deviceId) {
      toast.error("Device id missing");
      return;
    }

    setLoading(true);
    const resp = await fetchDayAnalysis({
      deviceId,
      day: date.startOf("day").valueOf(),
    });
    setLoading(false);

    if (!resp || !resp.success) {
      toast.error(resp?.message || "Failed to fetch logs");
      return;
    }

    const data = resp.data;
    if (!data?.snapshot?.appliances && data?.controlLogs) {
      const wrapped = {
        ...data,
        snapshot: {
          ...data.snapshot,
          appliances: {
            [String(switchId)]: {
              controlLogs: data.controlLogs.filter(
                (l) => !l.switchId || String(l.switchId) === String(switchId)
              ),
            },
          },
        },
      };
      setAnalysisData(wrapped);
    } else {
      setAnalysisData(data);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        View Logs For —{" "}
        {applianceName ? (
          <strong>{applianceName}</strong>
        ) : (
          `${deviceId}_${switchId}`
        )}
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Select Date"
              value={date}
              onChange={(newVal) => setDate(newVal)}
              maxDate={dayjs()}
              format="DD/MM/YYYY"
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </LocalizationProvider>

          <Box>
            <Button
              onClick={handleViewLogs}
              disabled={loading}
              sx={{
                backgroundColor: "#0F172A",
                color: "#fff",
                px: 3,
                py: 1,
                borderRadius: "8px",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "#1E293B",
                },
              }}
            >
              {loading ? (
                <CircularProgress size={20} sx={{ color: "#fff" }} />
              ) : (
                "View Logs"
              )}
            </Button>
          </Box>
        </Box>

        {analysisData && (
          <Box sx={{ mt: 2 }}>
            <ControlLogs
              selectedDate={date.toDate()}
              data={analysisData}
              appliance={`${deviceId}_${switchId}`}
            />
          </Box>
        )}
      </DialogContent>

      <DialogActions>
        <Button
          onClick={onClose}
          sx={{
            backgroundColor: "#0F172A",
            color: "#fff",
            px: 3,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#1E293B",
            },
          }}
        >
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
