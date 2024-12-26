import { Switch } from "@/components/ui/switch";
import { convertSecondsToTime } from "@/utils/format";

import React, { useEffect, useState } from "react";
// import { setAutoTimers, toggleAutoTimers } from "../api/AutoTimers";
// import { UpdateAutoTimer } from "./UpdateAutoTimer";
import toast from "react-hot-toast";
import { setAutoCut, toggleAutoCut } from "../api/autocut";
import { Button } from "@/components/ui/button";
import { AddAutoCut } from "./AddAutoCut";

function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor((seconds % 3600) % 60);

  return `${h !== 0 ? `${h} hr ` : ""}${m !== 0 ? `${m} min ` : ""} ${
    s !== 0 ? `${s} sec` : ""
  }`;
}

export function AutoCutBox({ data = {}, deviceId }) {
  const [active, setActive] = useState(data?.autoTImers?.enabled);
  console.log("[data]", data);
  useEffect(() => {
    setActive(data?.autoTurnOffEnabled);
  }, [data]);

  async function onToggle(event) {
    let payload = {
      deviceId: deviceId,
      switchId: data.switchId,
      enabled: event,
    };
    const resp = await toggleAutoCut(payload);

    if (!resp.success) {
      toast.error(resp.message);
      return;
    }

    toast.success("Updated Autocut.");
  }

  async function onDelete() {
    const resp = await setAutoCut({
      payload: [
        {
          deviceId,
          switchId: data.switchId,
          turnOffAfter: 0,
        },
      ],
    });

    if (!resp.success) {
      toast.error(resp.message);
      return;
    }

    toast.success("Successfully deleted the timer.");
  }

  // const timeData = convertSecondsToTime(data?.autoTurnOff);
  return (
    <div className="group relative">
      <div className="max-w-sm mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
        <div className="flex items-center space-x-4">
          {/* <div className="text-xl font-semibold">
            {timeData.hours ? `${timeData.hours} hr` : ""}{" "}
            {timeData.minutes ? `${timeData.minutes} mins` : ""}{" "}
            {timeData.seconds ? `${timeData.seconds} sec` : ""}
          </div> */}
          <div>{formatTime(data?.autoTurnOff)}</div>

          <div className="flex-1 text-lg font-medium text-gray-700">
            {data.switchName}
          </div>

          <Switch checked={active} onCheckedChange={onToggle} />
        </div>
      </div>
      <div
        className="flex justify-around absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 max-w-sm text-center text- rounded cursor-pointer  w-full bg-slate-400/40 py-1"
        // onClick={onDelete}
      >
        <span className="text-red-400" onClick={onDelete}>
          Delete
        </span>
        <AddAutoCut update={true} data={{ ...data, deviceId }} />
      </div>
    </div>
  );

  return (
    <div className="group relative">
      <div className="p-4 h-52 w-72 rounded-lg shadow-lg">
        <div className="flex flex-col justify-between w-full h-full">
          {/* Device Name and Toggle */}
          <div className="flex justify-between">
            <p className="font-bold" title={deviceId}>
              {data.switchName}
            </p>
            <Switch checked={active} onCheckedChange={onToggle} />
          </div>

          {/* OnTime & OffTime */}
          <div className="flex justify-between">
            <div>
              <p className="text-muted-foreground">On Time</p>

              <p className="font-semibold">{formatTime(data?.autoTurnOff)}</p>
            </div>

            <div>
              <p className="text-muted-foreground">Off Time</p>
              <p className="font-semibold">{formatTime(data?.autoTurnOff)}</p>
            </div>
          </div>

          {/* <UpdateAutoTimer data={data} deviceId={deviceId} /> */}
        </div>
      </div>
      <div
        className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 w-72 text-center text-white rounded cursor-pointer  bg-red-400"
        // onClick={onDelete}
      >
        Delete
      </div>
    </div>
  );
}
