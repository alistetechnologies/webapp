import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/common/InputWithLabel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DeviceTypeMap } from "@/constants/config";
import useHouseStore from "@/features/dashboard/houseStore";
import { Plus } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectAppliance } from "./SelectAppliance";
import toast from "react-hot-toast";
import { createSchedule } from "../api/schedules";
import { Spinner } from "@/components/ui/spinner";

export function AddSchedule() {
  const house = useHouseStore((state) => state.house);

  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [frequency, setFrequency] = useState("cron");

  const [days, setDays] = useState({
    1: true,
    2: true,
    3: true,
    4: true,
    5: true,
    6: true,
    7: true,
  });

  const [selectedDevicesData, setSelectedDevicesData] = useState([]);
  console.log("[selected Devices Data]", selectedDevicesData);

  // Initializing State
  useEffect(() => {
    if (!open) {
      setName("");
      setTime("");
      setDate(moment(new Date()).format("YYYY-MM-DD"));
      setFrequency("cron");
      setDays({
        1: true,
        2: true,
        3: true,
        4: true,
        5: true,
        6: true,
        7: true,
      });
      setSelectedDevicesData([]);
    }
  }, [open]);

  useEffect(() => {
    const appliances = [];
    for (const room of house.rooms) {
      for (let d of room.devices) {
        for (let s of d.switches) {
          if (s.deviceType !== DeviceTypeMap.NA) {
            appliances.push(s);
          }
          continue;
        }
      }
    }

    setAppliances(appliances);
  }, [house]);
  function createCronExpression(timeStr, weekdays) {
    const [hour, minute] = timeStr.split(":").map(Number);
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      throw new Error("Invalid time format");
    }
    const cronWeekdays = weekdays.join(",");
    return `${minute} ${hour} ? * ${cronWeekdays} *`;
  }

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  async function handleSubmit() {
    if (name === "") {
      toast.error("Enter Schedule Name!!");
      return;
    }

    if (time === "" || !time) {
      toast.error("Select Valid TIme");
      return;
    }

    let expression = "";

    if (frequency === "cron") {
      let day = [];
      Object.keys(days).forEach((d) => {
        if (days[d] === true) {
          day.push(d);
        }
      });

      if (day.length === 0) {
        toast("Please select at least one day.");
        return;
      }

      expression = createCronExpression(time, day);
    } else {
      expression = `${date}T${time}:00`;
    }

    const payload = {
      name,
      house: house._id,
      type: frequency,
      expression,
      enabled: true,
      actions: selectedDevicesData,
      tags: [new Date().getTime()],
    };

    setLoading(true);
    const response = await createSchedule(payload);

    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success("Successfully created Schedule.");
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className="mb-4" onClick={() => setOpen(true)}>
          <Plus />
          Add Schedule
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedules</DialogTitle>
          {/* <DialogDescription>
            Set up your energy savings system by fixing the frequency of
            regulating your appliances operation. For example, you can set your
            AC to turn off for 5 minutes every 30 minutes during the night :
            Thereby reducing your power consumption by 17%
          </DialogDescription> */}
        </DialogHeader>

        <div className="space-y-4">
          <InputWithLabel
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            // label='Schedule Name'
            placeholder="Schedule Name"
          />

          <InputWithLabel
            label="Select Time"
            name="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <RadioGroup
            defaultValue="option-one"
            value={frequency}
            onValueChange={setFrequency}
          >
            <div className="flex gap-8 items-center">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cron" id="cron" />
                <Label htmlFor="cron">Repeat Every</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="at" id="at" />
                <Label htmlFor="at">Repeat Once</Label>
              </div>
            </div>
          </RadioGroup>

          {/* Date */}
          {frequency === "at" && (
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          )}

          {/* Day selector */}
          <div className="flex justify-between">
            {frequency === "cron" &&
              daysOfWeek.map((day, index) => {
                return (
                  <Button
                    key={index}
                    onClick={() =>
                      setDays({ ...days, [index + 1]: !days[index + 1] })
                    }
                    variant={days[index + 1] === false ? "outlined" : ""}
                  >
                    {day.slice(0, 3)}
                  </Button>
                );
              })}
          </div>

          {/* Appliances Data */}
          <div className="max-h-64 overflow-y-scroll">
            <p>Select Devices</p>
            <Table className="w-full bg-white">
              <TableHeader>
                <TableRow>
                  <TableHead className="text-black">Appliance</TableHead>
                  <TableHead className="text-black">On/Off State</TableHead>
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
                                  <SelectAppliance
                                    data={{
                                      ...swit,
                                      deviceId: device.deviceId,
                                    }}
                                    state={selectedDevicesData}
                                    updateState={setSelectedDevicesData}
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
