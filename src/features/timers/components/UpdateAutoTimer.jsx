import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import { DurationInput } from "./DurationInput";
import { Spinner } from "@/components/ui/spinner";
import { convertTimeStringTo12Hour } from "@/utils/format";
import { ChevronRight } from "lucide-react";
import useHouseStore from "@/features/dashboard/houseStore";
import Select from "react-select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DeviceTypeMap } from "@/constants/config";
import { setAutoTimers } from "../api/AutoTimers";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AutoTimersSelectAppliances } from "./AutoTimersSelectAppliaces";
import { Separator } from "@/components/ui/separator";

export function UpdateAutoTimer({ data, deviceId }) {
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
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    if (!open) return;

    setActive(data.autoTimers.mode);

    // set On Time & Off Time
    setOnTime({
      hours: Math.floor(Number(data.autoTimers.turnOffAfter) / 3600),
      minutes: Math.floor((Number(data.autoTimers.turnOffAfter) % 3600) / 60),
    });

    setOffTime({
      hours: Math.floor(Number(data.autoTimers.turnOnAfter) / 3600),
      minutes: Math.floor((Number(data.autoTimers.turnOnAfter) % 3600) / 60),
    });

    // Set startTime & stopTime
    if (data.autoTimers.mode === "Particular") {
      const startTimeDate = new Date(data.autoTimers.startTime);
      const stopTimeDate = new Date(data.autoTimers.stopTime);

      setStartTime(
        `${String(startTimeDate.getHours()).padStart(2, "0")}:${String(
          startTimeDate.getMinutes()
        ).padStart(2, "0")}`
      );

      setStopTime(
        `${String(stopTimeDate.getHours()).padStart(2, "0")}:${String(
          stopTimeDate.getMinutes()
        ).padStart(2, "0")}`
      );
    }

    setSelectedAppliances([
      {
        deviceId,
        switchId: data.switchId,
      },
    ]);
  }, [data, open]);

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
        deviceId: appliance.deviceId,
        switchId: appliance.switchId,
        mode: active,
        startTime: startTimeDateObject,
        stopTime: stopTimeDateObject,
        turnOnAfter: offTime.hours * 60 * 60 + offTime.minutes * 60,
        turnOffAfter: onTime.hours * 60 * 60 + onTime.minutes * 60,
      });
    }

    if (onTime === 0 && offTime === 0) {
      toast.error("Invalid OnTime and OffTime");
      return;
    }
    setLoading(true);

    const resp = await setAutoTimers(payload);
    setLoading(false);
    if (resp.success) {
      toast.success("Successfully updated AutoTimer.");
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div
          className="flex justify-between text-sm text-blue-700 font-semibold cursor-pointer hover:underline"
          onClick={() => setOpen(true)}
        >
          <p className="text-sm text-blue-700 font-semibold">
            Run Time:{" "}
            {data?.autoTimers?.mode === "Always"
              ? "Always"
              : `${convertTimeStringTo12Hour(
                  data?.autoTimers?.startTime
                )} to ${convertTimeStringTo12Hour(data?.autoTimers?.stopTime)}`}
          </p>
          <ChevronRight />
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-[1000px]">
        <DialogHeader>
          <DialogTitle>Auto Timers</DialogTitle>
          <DialogDescription>
            Set up your energy savings system by fixing the frequency of
            regulating your appliances operation. For example, you can set your
            AC to turn off for 5 minutes every 30 minutes during the night :
            Thereby reducing your power consumption by 17%
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full">
          <div className="w-1/2 pg-6 bg-gray-50 px-2">
            <div className="space-y-4">
              <h4 className="text-lg font-bold">Run Time</h4>
              <Tabs
                defaultValue={active}
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
                <TabsContent value="Always" className="space-y-4 w-full">
                  <DurationInput
                    onTime={onTime}
                    setOnTime={setOnTime}
                    offTime={offTime}
                    setOffTime={setOffTime}
                  />
                  <p className="text-sm text-muted-foreground">
                    The Ac will be turned off for the selected frequency in
                    every selected interval
                  </p>

                  {/* <Separator orientation="vertical" className="mx-0.5" /> */}
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
                    The energy savings system will run only for the selected
                    window of time.
                  </p>

                  <DurationInput
                    onTime={onTime}
                    setOnTime={setOnTime}
                    offTime={offTime}
                    setOffTime={setOffTime}
                  />

                  <p className="text-sm text-muted-foreground">
                    The AC will be turned off for the selected frequency in
                    every selected interval.
                  </p>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <Separator orientation="vertical" className="mx-0.5" />

          <div className="w-1/2 p-6 bg-gray-50">
            {/* Appliances Data */}
            <div className=" relative">
              <Input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search Appliances"
                className="mb-4"
              />
              <p className="text-lg font-bold">Select Devices</p>
              <div className="max-h-80 overflow-y-scroll my-4">
                <Table className="w-full bg-white ">
                  <TableHeader className="sticky top-0 z-10 bg-white">
                    <TableRow className="sticky top-0">
                      <TableHead className="text-black">Appliance</TableHead>
                      <TableHead className="text-black">Select</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="max-h-64 overflow-y-scroll">
                    {houseData &&
                      houseData.rooms?.map((room) => {
                        return (
                          <>
                            <div
                              className="text-muted-foreground my-2"
                              key={room._id}
                            >
                              {room.roomName}
                            </div>

                            {room.devices.map((device) => {
                              return device.switches.map((swit) => {
                                if (
                                  swit.deviceType !== DeviceTypeMap.NA ||
                                  swit.switchName
                                    .toLowerCase()
                                    .includes(searchText.toLowerCase())
                                ) {
                                  return (
                                    <>
                                      <AutoTimersSelectAppliances
                                        data={{
                                          ...swit,
                                          deviceId: device.deviceId,
                                        }}
                                        state={selectedAppliances}
                                        updateState={setSelectedAppliances}
                                        key={device.deviceId + swit.switchId}
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
              className="w-full"
              onClick={() => createAutoTimers()}
              disabled={loading}
            >
              {loading ? <Spinner /> : "Update"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
