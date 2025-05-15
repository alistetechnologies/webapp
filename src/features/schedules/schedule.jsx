import { removeSchedule, toggleSchedule } from "./api/schedules";
import toast from "react-hot-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SchedulesTableHeaders } from "./components/SchedulesTableHeaders";
import { AddSchedule } from "./components/AddSchedule";
import moment from "moment";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import useScheduleStore from "./scheduleStore";

export default function Schedule() {
  const schedules = useScheduleStore((state) => state.schedules);

  async function handleDelete(schId) {
    const response = await removeSchedule({ scheduleId: schId });

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success("Successfully deleted Schedule.");
  }

  async function toggleScheduleStatus(schId, enabled) {
    const response = await toggleSchedule({ scheduleId: schId, enabled });

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success("Successfully Updated Schedule.");
  }

  function convertCronTo12HourFormat(cronExpression) {
    // Split the cron expression by spaces
    const cronParts = cronExpression.split(" ");

    // Extract relevant components
    const minute = cronParts[0]; // Minute
    const hour24 = parseInt(cronParts[1]); // 24-hour format hour
    const weekdayNumbers = cronParts[4].split(","); // Weekdays (1-7)

    // Convert hour to 12-hour format
    const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12; // Convert to 12-hour format
    const ampm = hour24 >= 12 ? "PM" : "AM"; // AM/PM
    const formattedTime = `${hour12}:${minute} ${ampm}`;

    // Map weekdays to abbreviated names (Mon, Tue, etc.)
    const weekdayMap = {
      1: "Mon",
      2: "Tue",
      3: "Wed",
      4: "Thu",
      5: "Fri",
      6: "Sat",
      7: "Sun",
    };

    const weekdays = weekdayNumbers.map((num) => weekdayMap[num]);

    return {
      time: formattedTime,
      weekdays: weekdays,
    };
  }
  return (
    <div className="w-full h-full bg-white p-4 overflow-scroll">
      <AddSchedule />
      <Table className="w-full bg-white">
        <TableHeader>
          <SchedulesTableHeaders />
        </TableHeader>
        <TableBody>
          {schedules.length > 0 &&
            schedules.map((sch, i) => (
              <TableRow key={sch._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{sch.name}</TableCell>
                <TableCell>
                  {sch.type === "at"
                    ? moment(sch.expression).format("hh:mm A")
                    : convertCronTo12HourFormat(sch.expression).time}
                </TableCell>
                <TableCell>
                  {sch.type === "at" ? (
                    moment(sch.expression).format("DD/MM/YYYY")
                  ) : (
                    <div>
                      <div>
                        {/* {convertCronTo12HourFormat(sch.expression).time} */}
                      </div>
                      <div>
                        {convertCronTo12HourFormat(
                          sch.expression
                        ).weekdays.join(", ")}
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>{sch?.actions?.length || "-"}</TableCell>
                <TableCell
                  className="cursor-pointer"
                  onClick={() => toggleScheduleStatus(sch._id, !sch.enabled)}
                >
                  {sch.enabled ? (
                    <span className="text-green-600 font-bold">Enabled</span>
                  ) : (
                    <span className="text-red-400">Disabled</span>
                  )}
                </TableCell>
                <TableCell>
                  <AddSchedule update={true} data={sch} />
                  <Button
                    onClick={() => handleDelete(sch._id)}
                    variant="destructive"
                  >
                    <Trash2 />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
