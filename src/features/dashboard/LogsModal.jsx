import React, { useState, useEffect } from "react";
import moment from "moment";
import toast from "react-hot-toast";
import { fetchDayAnalysis } from "./api/device";
import ControlLogs from "./ControlLogs";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function LogsModal({ open, onClose, deviceId, switchId, applianceName }) {
  const [date, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [loading, setLoading] = useState(false);
  const [analysisData, setAnalysisData] = useState(null);

  useEffect(() => {
    if (open) {
      setDate(moment().format("YYYY-MM-DD"));
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
    try {
      const resp = await fetchDayAnalysis({
        deviceId,
        day: moment(date).startOf("day").valueOf(),
      });

      if (!resp || !resp.success) {
        toast.error(resp?.message || "Failed to fetch logs");
        setLoading(false);
        return;
      }

      setAnalysisData(resp.data);
    } catch (err) {
      toast.error("Error fetching logs");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl p-6 rounded-2xl shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">
            View Logs For - <strong>{applianceName || `${deviceId}_${switchId}`}</strong>
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row sm:items-end gap-4 my-4">
          <div className="flex-1">
            <Label htmlFor="log-date" className="text-sm font-medium text-gray-700">
              Select Date
            </Label>
            <Input
              id="log-date"
              type="date"
              value={date}
              max={moment().format("YYYY-MM-DD")}
              onChange={(e) => {
                setDate(e.target.value)
                setAnalysisData(null)
              }}

              disabled={loading}
              className="mt-2"
            />
          </div>

          <Button
            onClick={handleViewLogs}
            disabled={loading}
            className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-800"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Loading...
              </span>
            ) : (
              "View Logs"
            )}
          </Button>
        </div>

        {analysisData && (
          <div className="max-h-[500px] overflow-y-auto border rounded-lg p-4 bg-gray-50">
            <ControlLogs
              selectedDate={new Date(date)}
              data={analysisData}
              appliance={`${deviceId}_${switchId}`}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
