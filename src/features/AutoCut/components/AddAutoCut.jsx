import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DeviceTypeMap } from "@/constants/config";
import useHouseStore from "@/features/dashboard/houseStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import Select from "react-select";
// import { DurationInput } from "./DurationInput";
import toast from "react-hot-toast";
// import { setAutoTimers } from "../api/AutoTimers";
import { Spinner } from "@/components/ui/spinner";
import { AutoCutTimeInput } from "./AutoCutTimeInput";
import { AutoCutSelectAppliance } from "./AutoCutSelectAppliance";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setAutoCut } from "../api/autocut";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";

function convertToHMS(seconds) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return {
    hours,
    minutes,
    seconds: remainingSeconds,
  };
}
export function AddAutoCut({ update = false, data }) {
  const house = useHouseStore((state) => state.house);
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [loading, setLoading] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (update) {
      setSelectedAppliances([
        {
          deviceId: data.deviceId,
          switchId: data.switchId,
          turnOffAfter: data.autoTurnOff,
        },
      ]);

      setDuration(convertToHMS(data.autoTurnOff));
    }
  }, [update, data, open]);

  async function handleSubmit() {
    const turnOffAfter = Number(
      Number(duration.hours) * 3600 +
      Number(duration.minutes) * 60 +
      Number(duration.seconds)
    );

    if (turnOffAfter <= 0) {
      toast.error("Invalid AutoCut Time!!");
      return;
    }

    // Generating Payload, adding turnOffAfter
    if (selectedAppliances.length === 0) {
      toast.error("Please select a device");
      return;
    }
    const payload = {
      payload: selectedAppliances?.map((item) => ({ ...item, turnOffAfter })),
    };

    setLoading(true);

    const response = await setAutoCut(payload);

    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    toast.success(response.message || "Successfully created Auto cut.");
    setLoading(false);
    setOpen(false);
    setDuration({
      hours: "",
      minutes: "",
      seconds: "",
    });
    setSelectedAppliances([]);
  }

  function handleSelectAll() {
    for (const room of house?.rooms) {
      for (const device of room?.devices) {
        const filteredDevices = device.switches
          .filter(
            (s) =>
              s?.deviceType !== DeviceTypeMap.NA &&
              `${s.switchName} ${room.roomName}`
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              !(
                s.autoTimers?.turnOffAfter ||
                s.autoTimers?.turnOnAfter ||
                s.autoTurnOff
              )
          )
          .map((s) => ({
            deviceId: device?.deviceId,
            switchId: s?.switchId,
            turnOffAfter: 0,
          }));

        setSelectedAppliances((prevState) => [
          ...prevState,
          ...filteredDevices,
        ]);
      }
    }
  }

  function handleUnSelect() {
    let devicesToRemove = [];

    if (!house?.rooms) return;

    for (const room of house.rooms) {
      if (!room?.devices) continue;

      for (const device of room.devices) {
        if (!device?.switches) continue;

        const filteredDevices = device.switches
          .filter(
            (s) =>
              s?.deviceType !== DeviceTypeMap.NA &&
              `${s.switchName} ${room.roomName}`
                .toLowerCase()
                .includes(searchText.toLowerCase()) &&
              !(
                s.autoTimers?.turnOffAfter ||
                s.autoTimers?.turnOnAfter ||
                s.autoTurnOff
              )
          )
          .map((s) => ({
            deviceId: device?.deviceId,
            switchId: s?.switchId,
            turnOffAfter: 0,
          }));

        devicesToRemove = [...devicesToRemove, ...filteredDevices];
      }
    }

    setSelectedAppliances((prevState) => {
      return prevState.filter(
        (deviceData) =>
          !devicesToRemove.some(
            (device) =>
              device.deviceId === deviceData.deviceId &&
              device.switchId === deviceData.switchId
          )
      );
    });
  }

  const sorted = (arr) =>
    arr?.sort((a, b) => {
      if (a?.devices?.length === 0 && b?.devices?.length > 0) return 1;

      if (b?.devices?.length === 0 && a?.devices?.length > 0) return -1;

      if (a?.devices?.length === 0 && b?.devices?.length === 0) return 0;

      return a.roomName.localeCompare(b.roomName, undefined, {
        sensitivity: "base",
      });
    });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {update ? (
          <span className="text-blue-500">Update</span>
        ) : (
          <Button className="mb-4" onClick={() => setOpen(true)}>
            <Plus />
            Add Auto Cut
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[1100px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Auto Cut</DialogTitle>
          <DialogDescription className="text-center">
            Automatically turn off your appliance whenever they are turned on
            and save on electricity.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full">
          <div className="w-1/2 p-6 bg-gray-50">
            <div className="space-y-8">
              <h4 className="text-lg font-bold">Select Run Time</h4>
              <AutoCutTimeInput state={duration} setState={setDuration} />
            </div>
          </div>
          <Separator orientation="vertical" className="mx-0.5" />
          <div className="w-1/2 p-6 bg-gray-50 space-y-6">
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Appliances"
            />

            {/* Appliances Data */}
            <div className="relative">
              <div className="flex justify-between bg-re-200">
                <p className="text-lg font-bold">Select Devices</p>
                <div className="flex align-bottom text-sm text-muted-foreground gap-1">
                  <p className="cursor-pointer" onClick={handleSelectAll}>
                    Select All
                  </p>

                  <span> / </span>
                  <p className="cursor-pointer" onClick={handleUnSelect}>
                    Clear
                  </p>
                </div>
              </div>
              <div className="max-h-80 overflow-y-scroll my-4">
                <Table className="w-full bg-white p-2">
                  <TableHeader className="sticky top-0 z-10 bg-white">
                    <TableRow className="sticky top-0">
                      <TableHead className="text-black">
                        Appliance Name
                      </TableHead>
                      <TableHead></TableHead>
                      <TableHead className="text-black">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-64 overflow-y-scroll">
                    {house &&
                      sorted(house?.rooms)?.map((room) => {
                        return (
                          <>
                            {room?.devices?.length ? (
                              <div className="text-black font-semibold text-lg underline mt-4 pl-2">
                                {room.roomName}
                              </div>
                            ) : (
                              ""
                            )}

                            {room.devices.map((device) => {
                              return device.switches.map((swit) => {
                                if (
                                  swit.deviceType !== DeviceTypeMap.NA &&
                                  `${swit.switchName} ${room.roomName}`
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                                ) {
                                  return (
                                    <>
                                      <AutoCutSelectAppliance
                                        data={{
                                          ...swit,
                                          deviceId: device.deviceId,
                                        }}
                                        state={selectedAppliances}
                                        updateState={setSelectedAppliances}
                                      />
                                    </>
                                  );
                                }
                              });
                            })}
                          </>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? <Spinner /> : update ? "Update" : "Create"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
