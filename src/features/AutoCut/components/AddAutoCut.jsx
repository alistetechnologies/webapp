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

  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [searchText, setSearchText] = useState("");

  console.log("Selected deices", selectedAppliances);
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

  console.log("duration", duration);
  async function handleSubmit() {
    console.log("ON Sumbit", duration);
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

  const sorted = (arr) =>
    arr.sort((a, b) => {
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
            <div className=" relative">
              <p className="text-lg font-bold">Select Devices</p>
              <div className="max-h-80 overflow-y-scroll my-4">
                <Table className="w-full bg-white p-2">
                  <TableHeader className="sticky top-0 z-10 bg-white">
                    <TableRow className="sticky top-0">
                      <TableHead className="text-black">Appliance</TableHead>
                      <TableHead className="text-black">Select</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-64 overflow-y-scroll">
                    {house &&
                      sorted(house?.rooms).map((room) => {
                        return (
                          <>
                            <div className="text-black font-semibold text-lg underline mt-4 pl-2">
                              {room.roomName}
                            </div>

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
