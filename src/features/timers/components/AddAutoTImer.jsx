import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DeviceTypeMap } from "@/constants/config";
import useHouseStore from "@/features/dashboard/houseStore";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import Select from "react-select";
import { DurationInput } from "./DurationInput";
import toast from "react-hot-toast";
import { setAutoTimers } from "../api/AutoTimers";
import { Spinner } from "@/components/ui/spinner";

export function AddAutoTImer() {
  const houseData = useHouseStore((state) => state.house);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [onTime, setOnTime] = useState({
    hours: 0,
    minutes: 0,
  });
  const [offTime, setOffTime] = useState({
    hours: 0,
    minutes: 0,
  });

  const [selectedAppliances, setSelectedAppliances] = useState([]);
  const [active, setActive] = useState("Always");

  const [appliancesData, setAppliancesData] = useState([]);

  useEffect(() => {
    const applianceData = () => {
      const appliances = [];

      if (!houseData?.rooms) return;

      for (const room of houseData?.rooms) {
        for (let d of room.devices) {
          for (let s of d.switches) {
            if (s.deviceType !== DeviceTypeMap.NA) {
              if (s.autoTurnOff) {
                appliances.push({
                  value: {
                    deviceId: d.deviceId,
                    switchId: s.switchId,
                  },
                  label: `${s.switchName} - ${room.roomName} - AutoCut Enabled`,
                  isDisabled: true,
                });
              } else {
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
      }

      setAppliancesData(appliances);
    };
    applianceData();
  }, [houseData]);

  const createAutoTimers = async () => {
    let payload = [];
    for (const appliance of selectedAppliances) {
      let startTimeDateObject = "";

      if (startTime) {
        startTimeDateObject = new Date();
        startTimeDateObject.setHours(startTime.split(":")[0]);
        startTimeDateObject.setMinutes(startTime.split(":")[1]);
        startTimeDateObject.setMinutes(0);
      }

      let stopTimeDateObject = "";
      if (stopTime) {
        stopTimeDateObject = new Date();

        stopTimeDateObject.setHours(stopTime.split(":")[0]);
        stopTimeDateObject.setMinutes(stopTime.split(":")[1]);
        stopTimeDateObject.setSeconds(0);
      }

      payload.push({
        deviceId: appliance.value.deviceId,
        switchId: appliance.value.switchId,
        mode: active,
        startTime: startTimeDateObject,
        stopTime: stopTimeDateObject,
        turnOnAfter: offTime.hours * 60 * 60 + offTime.minutes * 60,
        turnOffAfter: onTime.hours * 60 * 60 + onTime.minutes * 60,
      });
    }

    if (
      (onTime.hours === 0 && onTime.minutes == 0) ||
      (offTime.hours === 0 && offTime.minutes === 0)
    ) {
      toast.error("Invalid OnTime and OffTime");
      return;
    }
    setLoading(true);

    const resp = await setAutoTimers(payload);

    setLoading(false);
    if (resp.success) {
      toast.success("Successfully created AutoTimer.");
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="mb-4" onClick={() => setOpen(true)}>
          <Plus />
          Add Auto Timers
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Auto Timers</DialogTitle>
          <DialogDescription>
            Set up your energy savings system by fixing the frequency of
            regulating your appliances operation. For example, you can set your
            AC to turn off for 5 minutes every 30 minutes during the night :
            Thereby reducing your power consumption by 17%
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <h4 className="text-lg font-bold">Run Time</h4>
          <Tabs
            defaultValue="Always"
            onValueChange={(value) => {
              setActive(value);
              setStartTime("");
              setStopTime("");
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="Always">Always</TabsTrigger>
              <TabsTrigger value="Particular">Particular Time</TabsTrigger>
            </TabsList>
            <TabsContent value="Always" className="space-y-4">
              <DurationInput
                onTime={onTime}
                setOnTime={setOnTime}
                offTime={offTime}
                setOffTime={setOffTime}
              />
              <p className="text-sm text-muted-foreground">
                The Ac will be turned off for the selected frequency in every
                selected interval
              </p>

              <Select
                options={appliancesData}
                isMulti={true}
                placeholder="Select Appliances"
                closeMenuOnSelect={false}
                value={selectedAppliances}
                onChange={(selected) => setSelectedAppliances(selected)}
              />

              <Button
                className="w-full"
                onClick={() => createAutoTimers()}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Create"}
              </Button>
            </TabsContent>

            <TabsContent value="Particular" className="space-y-4">
              <div className="flex justify-between mt-4">
                <div className="flex flex-col gap-4">
                  <p>Start Time</p>
                  <Input
                    type="time"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="border-none focus:border-none"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <p>Stop Time</p>
                  <Input
                    type="time"
                    value={stopTime}
                    onChange={(e) => setStopTime(e.target.value)}
                    className="border-none"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                The energy savings system will run only for the selected window
                of time.
              </p>

              <DurationInput
                onTime={onTime}
                setOnTime={setOnTime}
                offTime={offTime}
                setOffTime={setOffTime}
              />

              <p className="text-sm text-muted-foreground">
                The AC will be turned off for the selected frequency in every
                selected interval.
              </p>

              <Select
                options={appliancesData}
                isMulti={true}
                placeholder="Select Appliances"
                closeMenuOnSelect={false}
                value={selectedAppliances}
                onChange={(selected) => setSelectedAppliances(selected)}
              />

              <Button
                className="w-full"
                onClick={() => createAutoTimers()}
                disabled={loading}
              >
                {loading ? <Spinner /> : "Create"}
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
