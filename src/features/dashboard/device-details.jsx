import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Appliances } from "./appliances";
import { fetchDayAnalytics } from "./api/device";
import Commands from "./commands";
import { TableCell, TableRow } from "@/components/ui/table";
import NovaContainer from "./nova/NovaContainer";
import { Dot } from "lucide-react";
import RoomDialog from "./EditRoom";
import { isOctiot } from "@/utils/browser";
import { octiotFont } from "@/constants/config";

export function DeviceDetails({
  room,
  sno,
  connectedDevices,
  date,
  reload,
  houseId,
}) {
  const [showAppliances, setShowAppliances] = useState(false);
  const [totalAppliances, setTotalAppliances] = useState(0);
  const [connectedAppliances, setConnectedAppliances] = useState(0);
  const [appliancesAnalysisData, setAppliancesAnalysisData] = useState([]);
  const [appliances, setAppliances] = useState();
  const [onAppliances, setOnAppliances] = useState(0);

  function calculateAppliances() {
    let connectedAppliances = 0;
    let totalAppliances = 0;
    const appliancesData = {};
    let onDevices = 0;

    // for (const devices of room?.devices) {
    // loop in rooms
    for (const device of room?.devices) {
      if (!appliancesData[device?.deviceId]) {
        appliancesData[device?.deviceId] = [];
      }
      // loop in device for switches
      for (const s of device?.switches) {
        // If switch type is N/A
        if (Number(s.deviceType) === 7) {
          continue;
        }
        totalAppliances += 1;

        if (s?.switchState !== "0") {
          onDevices += 1;
        }

        // Connected Devices
        if (connectedDevices.some((d) => d?.deviceId === device?.deviceId)) {
          connectedAppliances += 1;
        }
        appliancesData[device?.deviceId].push({
          deviceId: device?.deviceId,
          switchName: s?.switchName,
          switchState: s?.switchState,
          switchId: s?.switchId,
          deviceType: s?.deviceType,
        });
      }
    }

    setConnectedAppliances(connectedAppliances);
    setTotalAppliances(totalAppliances);
    setAppliances(appliancesData);
    setOnAppliances(onDevices);
  }

  const fetchDeviceAnalytics = async (deviceId) => {
    const response = await fetchDayAnalytics({
      deviceId,
      day: new Date(date).toISOString(),
    });

    return response?.data?.snapshot;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const devicePromises = room?.devices?.map((device) =>
          fetchDeviceAnalytics(device?.deviceId)
        );

        const deviceData = await Promise.all(devicePromises);
        const applianceWiseAnalysisData = [];
        for (const device of deviceData) {
          if (!device) continue;

          for (const s of Object.keys(device.appliances)) {
            applianceWiseAnalysisData.push({
              deviceId: device?.deviceId,
              onlineTime: device?.onlineTime,
              switchId: s,
              ...device?.appliances[s],
            });
          }
        }
        setAppliancesAnalysisData(applianceWiseAnalysisData);
      } catch (error) {}
    };

    fetchData();
  }, [room, date]);

  useEffect(() => {
    calculateAppliances();
  }, [room, connectedDevices, reload]);

  const connectivityStatus = (
    (connectedAppliances / totalAppliances) *
    100
  ).toFixed(0);
  return (
    <>
      <TableRow className="text-lg text-center">
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{String(sno).padStart(2, "0")}</TableCell>
        <TableCell className="flex items-center gap-x-2 text-left">
          <div className="flex justify-end w-full">
            <div className="flex justify-between w-full">
              <span style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{room?.roomName}</span>
            </div>
          </div>
        </TableCell>
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>
          {room?.occupied === null ? (
            "---"
          ) : room?.occupied ? (
            <span className="text-green-500">Yes</span>
          ) : (
            <span className="text-red-400">No</span>
          )}
        </TableCell>
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{totalAppliances}</TableCell>
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{onAppliances}</TableCell>
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>
          {totalAppliances === 0 ? (
            <span className="text-red-600" style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>0 %</span>
          ) : connectivityStatus === "100" ? (
            <span className="text-green-400" style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{connectivityStatus} %</span>
          ) : (
            <span className="text-red-400" style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{connectivityStatus} %</span>
          )}
        </TableCell>
        <Commands analysisData={appliancesAnalysisData} />
        <TableCell className="flex justify-between gap-2" style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>
          <RoomDialog
            roomId={room?._id}
            roomName={room?.roomName}
            houseId={houseId}
          />
          {room?.devices.length !== 0 && (
            <Button onClick={() => setShowAppliances((prev) => !prev)}>
              {showAppliances ? "Hide Details" : "View Details"}
            </Button>
          )}
        </TableCell>
      </TableRow>
      {showAppliances && (
        <>
          <Appliances
            appliances={appliances}
            analysisData={appliancesAnalysisData}
            connectedDevices={connectedDevices}
          />
          {room.novas.length > 0 && <NovaContainer novas={room.novas} />}
        </>
      )}
    </>
  );
}
