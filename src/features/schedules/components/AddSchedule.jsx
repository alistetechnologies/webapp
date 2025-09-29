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
import { Pencil, Plus } from "lucide-react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { SelectAppliance } from "./SelectAppliance";
import toast from "react-hot-toast";
import { createSchedule, updateSchedule } from "../api/schedules";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";

export function AddSchedule({ update = false, data }) {
  const house = useHouseStore((state) => state.house);

  const [appliances, setAppliances] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [frequency, setFrequency] = useState("cron");
  const [searchText, setSearchText] = useState("");

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

  // Initializing State
  useEffect(() => {
    if (update) {
      setName(data.name);
      setFrequency(data.type);
      setSelectedDevicesData(data.actions);

      if (data.type === "cron") {
        const cronDestructuredExpression = data.expression.split(" ");
        const minute = cronDestructuredExpression[0].padStart(2, "0");
        const hour = cronDestructuredExpression[1].padStart(2, "0");
        setTime(`${hour}:${minute}`);

        const days = {
          1: false,
          2: false,
          3: false,
          4: false,
          5: false,
          6: false,
          7: false,
        };
        cronDestructuredExpression[4]
          .split(",")
          .map((day) => (days[day] = true));

        setDays(days);
      } else {
        const expressionDate = new Date(data.expression);
        setDate(moment(expressionDate).format("YYYY-MM-DD"));
        setTime(moment(expressionDate).format("HH:mm"));
        // setTime(
        //   `${cronDestructuredExpression[1]}:${cronDestructuredExpression[0]}`
        // );
      }
    } else if (!open) {
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
    if (house && Array.isArray(house.rooms)) {
      const appliances = [];
      for (const room of house.rooms) {
        if (Array.isArray(room?.devices)) {
          for (let d of room.devices) {
            if (Array.isArray(d?.switches)) {
              for (let s of d.switches) {
                if (s.deviceType !== DeviceTypeMap.NA) {
                  appliances.push({ ...s, deviceId: d.deviceid });
                }
              }
            }
          }
        }
      }
      setAppliances(appliances);
    }
  }, [house]);

  function createCronExpression(timeStr, weekdays) {
    if (!Array.isArray(weekdays)) {
      throw new Error("Weekdays should be an array.");
    }
    const [hour, minute] = timeStr
      .split(":")
      .map((v) => v.toString().padStart(2, "0"));
    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      throw new Error("Invalid time format");
    }
    return `${minute} ${hour} ? * ${weekdays.join(",")} *`;
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
      toast.error("Select Valid Time");
      return;
    }

    if (selectedDevicesData?.length === 0) {
      toast.error("No appliance selected");
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
        toast.error("Please select at least one day.");
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

    let response;
    if (update) {
      response = await updateSchedule({ ...payload, scheduleId: data._id });
    } else {
      response = await createSchedule(payload);
    }

    if (!response.success) {
      toast.error(response.message);
      setLoading(false);
      return;
    }

    setLoading(false);
    toast.success(`Successfully ${update ? "updated " : "created "} Schedule.`);
    setOpen(false);
  }

  const sorted = (arr) => {
    if (arr === undefined || arr === null) return [];

    return arr?.sort((a, b) => {
      if (a?.devices?.length === 0 && b?.devices?.length > 0) return 1;

      if (b?.devices?.length === 0 && a?.devices?.length > 0) return -1;

      if (a?.devices?.length === 0 && b?.devices?.length === 0) return 0;

      return a.roomName.localeCompare(b.roomName, undefined, {
        sensitivity: "base",
      });
    });
  };

  // const handleSelectAll = () => {
  //   for (const room of house?.rooms) {
  //     for (const device of room?.devices) {
  //       const filteredDevices = device.switches
  //         .filter(
  //           (s) =>
  //             s?.deviceType !== DeviceTypeMap.NA &&
  //             `${s?.switchName} ${room?.roomName}`
  //               .toLowerCase()
  //               .includes(searchText.toLowerCase())
  //         )
  //         .map((s) => ({
  //           action: "Sync/Control",
  //           payload: {
  //             deviceId: device.deviceId,
  //             switchId: s.switchId,
  //             command: 0,
  //             controllerType: "centralSchedule",
  //             controllerId: "centralSchedule",
  //             control: true,
  //           },
  //         }));

  //       setSelectedDevicesData((prevState) => [
  //         ...prevState,
  //         ...filteredDevices,
  //       ]);
  //     }
  //   }
  // };

  const handleSelectAll = () => {
    let allFilteredDevices = [];

    if (!house?.rooms) return;

    for (const room of house.rooms) {
      if (!room.devices) continue;

      for (const device of room?.devices) {
        if (!device?.switches) continue;

        const filteredDevices = device?.switches
          .filter(
            (s) =>
              s?.deviceType !== DeviceTypeMap.NA &&
              `${room?.roomName} ${s?.switchName}`
                .toLowerCase()
                .includes(searchText.toLowerCase())
          )
          .map((s) => ({
            action: "Sync/Control",
            payload: {
              deviceId: device.deviceId,
              switchId: s.switchId,
              command: 0,
              controllerType: "centralSchedule",
              controllerId: "centralSchedule",
              control: true,
            },
          }));
        allFilteredDevices = [...filteredDevices, ...allFilteredDevices];
      }
    }

    setSelectedDevicesData((prevState) => [
      ...prevState,
      ...allFilteredDevices,
    ]);
  };
  const handleUnSelectAll = () => {
    let devicesToRemove = [];

    if (!house?.rooms) return;

    for (const room of house?.rooms) {
      if (!room?.devices) continue;

      for (const device of room.devices) {
        if (!device.switches) continue;

        const filteredDevices = device.switches
          .filter(
            (s) =>
              s.deviceType !== DeviceTypeMap.NA &&
              `${room?.roomName} ${s.switchName}`
                .toLowerCase()
                .includes(searchText)
          )
          .map((s) => ({
            action: "Sync/Control",
            payload: {
              deviceId: device.deviceId,
              switchId: s.switchId,
              command: 0,
              controllerType: "centralSchedule",
              controllerId: "centralSchedule",
              control: true,
            },
          }));

        devicesToRemove = [...devicesToRemove, ...filteredDevices];
      }
    }

    setSelectedDevicesData((prevState) => {
      // Remove devices that match the ones found in devicesToRemove
      return prevState.filter(
        (deviceData) =>
          !devicesToRemove.some(
            (device) =>
              device.payload.deviceId === deviceData.payload.deviceId &&
              device.payload.switchId === deviceData.payload.switchId
          )
      );
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        {update ? (
          <Button
            className="mb-4"
            variant="outline"
            onClick={() => setOpen(true)}
          >
            <Pencil />
          </Button>
        ) : (
          <Button className="mb-4" onClick={() => setOpen(true)}>
            <Plus />
            Add Schedule
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="min-w-[1100px] ">
        <DialogHeader>
          <DialogTitle className="text-center">
            {update ? "Update Schedule" : "Create Schedule"}
          </DialogTitle>
          {/* <DialogDescription>
            Set up your energy savings system by fixing the frequency of
            regulating your appliances operation. For example, you can set your
            AC to turn off for 5 minutes every 30 minutes during the night :
            Thereby reducing your power consumption by 17%
          </DialogDescription> */}
        </DialogHeader>
        <div className="flex h-sceen w-full">
          {/* Left */}
          <div className="w-1/2 p-6 bg-gray-50">
            <div className="space-y-10 w-full">
              <InputWithLabel
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                label="Schedule Name"
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
                defaultValue="cron"
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

              {/* Day selector or Date selector */}
              <div className="flex flex-col gap-2">
                {frequency === "cron" && (
                  <>
                    <div className="flex justify-between">
                      {daysOfWeek.map((day, index) => {
                        const isSelected = days[index + 1];
                        const selectedCount =
                          Object.values(days).filter(Boolean).length;
                        return (
                          <Button
                            key={index}
                            onClick={() => {
                              if (isSelected && selectedCount === 1) {
                                toast.error(
                                  "At least one day must remain selected"
                                );
                                return;
                              }
                              setDays({ ...days, [index + 1]: !isSelected });
                            }}
                            variant={isSelected ? "" : "outline"}
                          >
                            {day.slice(0, 3)}
                          </Button>
                        );
                      })}
                    </div>
                    <div className="text-sm text-muted-foreground mt-2">
                      <strong>Every - </strong>
                      {Object.entries(days)
                        .filter(([_, val]) => val)
                        .map(([key]) => daysOfWeek[key - 1].slice(0, 3))
                        .join(", ")}
                    </div>
                  </>
                )}

                {frequency === "at" && (
                  <>
                    <Input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                    />
                    <div className="text-sm text-muted-foreground mt-2">
                      <strong>Once - </strong>
                      {moment(date).format("DD/MM/YYYY")}
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <Separator orientation="vertical" className="mx-0.5" />
          <div className="w-1/2 p-6 bg-white space-y-10">
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search Appliances"
            />
            {/* Appliances Data */}

            <div className="flex justify-between">
              <p className="text-lg font-bold">Select Devices</p>
              <div className="flex align-bottom text-sm text-muted-foreground gap-1">
                <p className="cursor-pointer" onClick={handleSelectAll}>
                  Select All
                </p>

                <span> / </span>
                <p className="cursor-pointer" onClick={handleUnSelectAll}>
                  Clear
                </p>
              </div>
            </div>

            <div className="max-h-64 overflow-y-scroll">
              <Table className="w-full bg-white">
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-black">Appliance Name</TableHead>
                    <TableHead className="text-black">On/Off State</TableHead>
                    <TableHead className="text-black">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="max-h-64 overflow-y-scroll">
                  {house &&
                    sorted(house?.rooms)
                      .filter((room) =>
                        room.devices.some((device) =>
                          device.switches.some(
                            (swit) =>
                              swit.deviceType !== DeviceTypeMap.NA &&
                              `${swit.switchName} ${room.roomName}`
                                .toLowerCase()
                                .includes(searchText.toLowerCase())
                          )
                        )
                      )
                      .map((room) => (
                        <React.Fragment key={room._id}>
                          <div className="text-black font-semibold text-lg underline mt-4 pl-2">
                            {room.roomName}
                          </div>
                          {room.devices.map((device) =>
                            device.switches.map((swit) => {
                              if (
                                swit.deviceType !== DeviceTypeMap.NA &&
                                `${swit.switchName} ${room.roomName}`
                                  .toLowerCase()
                                  .includes(searchText.toLowerCase())
                              ) {
                                return (
                                  <SelectAppliance
                                    key={swit.switchId}
                                    data={{
                                      ...swit,
                                      deviceId: device.deviceId,
                                    }}
                                    state={selectedDevicesData}
                                    updateState={setSelectedDevicesData}
                                  />
                                );
                              }
                              return null;
                            })
                          )}
                        </React.Fragment>
                      ))}
                </TableBody>
              </Table>
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
