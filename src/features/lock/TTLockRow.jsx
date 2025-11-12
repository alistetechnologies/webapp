import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import moment from "moment";
import React, { useEffect, useState } from "react";
import UnlockRecored from "./Pop/UnLockRecord/UnlockRecored";
import { data } from "autoprefixer";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { adminPasswordApi, syncLock } from "./api";
import { octiotFont, token } from "@/constants/config";
import ViewAndUpdateAdminPass from "./ViewAndUpdateAdminPass";
import toast from "react-hot-toast";
import { Spinner } from "react-bootstrap";
import { isOctiot } from "@/utils/browser";

function TTLockRow({
  lock,
  index,
  setLockDetails,
  setUnlockingHistory,
  setOtpHistory,
  setTimeSyncHistory,
  hubConneted,
  lockHubId,
  updateHouse,
  setEkeyDetails,
  setGenerateOtp,
}) {
  const [modal, setModal] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const clickHandler = async () => {
    setLoading(true);
    await fetchPassword();
    setLoading(false);
    setModal(true);
  };

  const fetchPassword = async () => {
    try {
      const res = await adminPasswordApi(
        "fetchAdminPasscode",
        { lockId: lock.lockId },
        token
      );
      if (!res) {
        return;
      }
      setPassword(res?.data?.adminPasscode);
    } catch (err) {
      console.log("error in finding password", err.message);
    }
  };

  let battery =
    hubConneted?.find((e) => e.lockId === lock.lockId)?.electricQuantity ||
    null;
  let updatedLockData =
    hubConneted?.find((e) => e.lockId === lock.lockId) || null;

  const syncLockHandler = async () => {
    setLoading(true);

    const result = await syncLock({ lockIds: [lock.lockId] });

    if (result?.success === false) {
      toast.error(result.message); // Show error message to the user
    } else {
      toast.success("Lock synced successfully!");
      await updateHouse();
    }

    setLoading(false);
  };

  return (
    <TableRow className="text-lg" key={lock?.lockId}>
      <TableCell className=" text-center" style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{index + 1}</TableCell>
      <TableCell className=" text-center" style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{lock?.lockId}</TableCell>
      <TableCell className=" text-center" style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{lock?.roomName}</TableCell>

      <TableCell className=" text-center">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              {hubConneted?.length > 0 ? (
                hubConneted?.some((e) => e.lockId === lock.lockId) ? (
                  <span className=" text-green-600">Yes</span>
                ) : (
                  <span className=" text-red-600">NO</span>
                )
              ) : (
                <span className=" text-red-600">NO</span>
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Hub Id : {lockHubId?.[lock?.lockId] ?? "N.A"}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </TableCell>
      <TableCell className=" text-center">
        {hubConneted?.length > 0
          ? battery !== null && (
            <span
              className={`${battery < 20
                ? "text-red-600"
                : battery < 40
                  ? " text-orange-300"
                  : ""
                }`}
                style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}
              >
                {battery}
              </span>
            )
          : "---"}
      </TableCell>
      <TableCell className=" text-center" style={{ whiteSpace: "nowrap" ,...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}} >
        {updatedLockData
          ? moment(updatedLockData?.updateDate).format("DD MMMM YYYY LT")
          : moment(lock.lastUpdatedTime).format("DD MMMM YYYY, LT")}
      </TableCell>
      <TableCell>
        <div
          style={{
            display: "flex",
            gap: "5px",
            overflowX: "auto", // Allow horizontal scrolling
            width: "100%", // Full width
            maxWidth: "600px", // Set a maximum width for the buttons container
            whiteSpace: "nowrap", // Prevent buttons from breaking into new lines
            
          }}
        >
          <Button
            onClick={() => {
              setLockDetails(lock);
              setUnlockingHistory(true);
            }}
            style={{
              flexShrink: 0,
              minWidth: "150px", // Minimum width to ensure space for text
              width: "auto", // Let it expand based on content
              whiteSpace: "normal", // Allow text wrapping if needed
            }}
          >
            Unlocking History
          </Button>

          <Button
            onClick={() => {
              setLockDetails(lock);
              setGenerateOtp(true);
            }}
            style={{
              flexShrink: 0,
              minWidth: "150px",
              width: "auto",
              whiteSpace: "normal",
            }}
          >
            Generate OTP
          </Button>
          <Button
            onClick={() => {
              setLockDetails(lock);
              setOtpHistory(true);
            }}
            style={{
              flexShrink: 0,
              minWidth: "150px",
              width: "auto",
              whiteSpace: "normal",
            }}
          >
            OTP History
          </Button>
          <Button
            onClick={() => {
              setTimeSyncHistory(true);
              setLockDetails(lock);
            }}
            style={{
              flexShrink: 0,
              minWidth: "150px",
              width: "auto",
              whiteSpace: "normal",
            }}
          >
            Time Sync History
          </Button>

          <Button
            disabled={loading}
            className="cursor-pointer"
            onClick={clickHandler}
            style={{
              flexShrink: 0,
              minWidth: "150px",
              width: "auto",
              whiteSpace: "normal",
            }}
          >
            View/Update admin password
          </Button>

          <Button
            disabled={loading}
            className="cursor-pointer"
            onClick={syncLockHandler}
            style={{
              flexShrink: 0,
              minWidth: "150px",
              width: "auto",
              whiteSpace: "normal",
            }}
          >
            {loading ? (
              <>
                Loading... <Spinner size="lg" />
              </>
            ) : (
              "Sync Lock"
            )}
          </Button>
          <Button
            onClick={() => {
              setLockDetails(lock);
              setEkeyDetails(true);
            }}
            style={{
              flexShrink: 0,
              minWidth: "150px",
              width: "auto",
              whiteSpace: "normal",
            }}
          >
            E-Key Details
          </Button>
        </div>
      </TableCell>

      {modal && (
        <ViewAndUpdateAdminPass
          showModal={modal}
          setShowModal={setModal}
          password={password}
          lockId={lock.lockId}
        />
      )}
    </TableRow>
  );
}

export default TTLockRow;
