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

export function AddAutoCut() {
  const house = useHouseStore((state) => state.house);
  const [open, setOpen] = useState(false);
  const [duration, setDuration] = useState({
    hours: "",
    minutes: "",
    seconds: "",
  });
  const [loading, setLoading] = useState(false);

  const [appliancesData, setAppliancesData] = useState([]);

  const [selectedAppliances, setSelectedAppliances] = useState([]);

  console.log("{state}", selectedAppliances);

  useEffect(() => {
    const applianceData = () => {
      const appliances = [];

      if (!house?.rooms) return;

      for (const room of house?.rooms) {
        for (let d of room.devices) {
          for (let s of d.switches) {
            if (s.deviceType !== DeviceTypeMap.NA) {
              appliances.push({
                value: {
                  deviceId: d.deviceId,
                  switchId: s.switchId,
                },
                label: `${s.switchName} - ${room.roomName}`,
              });
            }
          }
        }
      }

      setAppliancesData(appliances);
    };
    applianceData();
  }, [house]);

  //
  console.log("[duration]", duration);

  async function handleSubmit() {
    const turnOffAfter =
      duration.hours * 3600 + duration.minutes * 60 + duration.seconds;

    if (turnOffAfter <= 0) {
      toast.error("Invalid AutoCut Time!!");
      return;
    }

    // Generating Payload, adding turnOffAfter
    const payload = {
      payload: selectedAppliances.map((item) => ({ ...item, turnOffAfter })),
    };

    setLoading(true);

    const response = await setAutoCut(payload);

    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    toast.success(response.message || "Successfully created Autocut.");
    setLoading(false);
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="mb-4" onClick={() => setOpen(true)}>
          <Plus />
          Add Auto Cut
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Auto Cut</DialogTitle>
          <DialogDescription>
            Automatically turn off your appliance whenever they are turned on
            and save on electricity.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <h4 className="text-lg font-bold">Run Time</h4>
          <AutoCutTimeInput state={duration} setState={setDuration} />

          {/* Appliances Data */}
          <div className="max-h-64 overflow-y-scroll">
            <p>Select Devices</p>
            <Table className="w-full bg-white">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Appliance</TableHead>

                  <TableHead className="text-black">Select</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="max-h-64 overflow-y-scroll">
                {house &&
                  house.rooms.map((room) => {
                    return (
                      <>
                        <div className="text-muted-foreground my-2">
                          {room.roomName}
                        </div>

                        {room.devices.map((device) => {
                          return device.switches.map((swit) => {
                            if (swit.deviceType !== DeviceTypeMap.NA) {
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
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? <Spinner /> : "Create"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
