import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import moment from "moment";
import React, { useState } from "react";
import UnlockRecored from "./Pop/UnLockRecord/UnlockRecored";
import { data } from "autoprefixer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function TTLockRow({
  lock,
  index,
  setLockDetails,
  setUnlockingHistory,
  setOtpHistory,
  setTimeSyncHistory,
  hubConneted,
  lockHubId,
}) {
  let battery = hubConneted.find((e) => e.lockId === lock.lockId)?.electricQuantity || null
  return (
    <TableRow className="text-lg" key={lock?.lockId}>
      <TableCell className=" text-center">{index + 1}</TableCell>
      <TableCell className=" text-center">{lock?.lockId}</TableCell>
      <TableCell className=" text-center">{lock?.roomName}</TableCell>

      <TableCell className=" text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              {hubConneted.length > 0
                ? hubConneted.some((e) => e.lockId === lock.lockId)
                  ? <span className=" text-green-600">Yes</span>
                  : <span className=" text-red-600">NO</span>
                : "---"}
            </TooltipTrigger>
            <TooltipContent>
              <p>Hub Id : {lockHubId[lock.lockId]}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className=" text-center">
        {hubConneted.length > 0
          ? battery!==null && <span className={`${battery<20?"text-red-600":battery<40?" text-orange-300":""}`}>{battery}</span>
          : "---"}
      </TableCell>
      <TableCell className=" text-center" style={{ whiteSpace: "nowrap" }}>
        {moment(lock.lastUpdatedTime).format("DD MMMM YYYY, LT")}
      </TableCell>
      <TableCell>
        <div style={{ display: "flex", gap: "5px" }}>
          <Button
            onClick={() => {
              setLockDetails(lock);
              setUnlockingHistory(true);
            }}
          >
            Unlocking History
          </Button>

          <Button
            onClick={() => {
              setLockDetails(lock);
              setOtpHistory(true);
            }}
          >
            OTP History
          </Button>
          <Button
            onClick={() => {
              setTimeSyncHistory(true);
              setLockDetails(lock);
            }}
          >
            Time Sync History
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}

export default TTLockRow;
