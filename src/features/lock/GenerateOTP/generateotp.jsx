import { DialogHeader } from "@/components/ui/dialog";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@radix-ui/react-dialog";
import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import { serverUrl, token } from "@/constants/config";
import toast from "react-hot-toast";
import Row from "./Row";
import { Button } from "@/components/ui/button";

function GenerateOtp({ open, setOpen, roomId }) {
    const [record, setRecord] = useState(null);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("23:59");
    const [passwordType, setPasswordType] = useState("1");

    const passwordTypeOptions = [
        { value: "1", label: "One-time" },
        { value: "2", label: "Permanent" },
        { value: "3", label: "Period" },
        { value: "4", label: "Delete" },
        { value: "5", label: "Weekend Cyclic" },
        { value: "6", label: "Daily Cyclic" },
        { value: "7", label: "Workday Cyclic" },
        { value: "8", label: "Monday Cyclic" },
        { value: "9", label: "Tuesday Cyclic" },
        { value: "10", label: "Wednesday Cyclic" },
        { value: "11", label: "Thursday Cyclic" },
        { value: "12", label: "Friday Cyclic" },
        { value: "13", label: "Saturday Cyclic" },
        { value: "14", label: "Sunday Cyclic" },
    ];

    useEffect(() => {
        const now = new Date();

        const formattedDate = now.toISOString().split("T")[0];
        const formattedTime = now
            .toTimeString()
            .split(" ")[0]
            .slice(0, 5);

        setStartDate(formattedDate);
        setEndDate(formattedDate);
        setStartTime(formattedTime);
        setEndTime(formattedTime);
    }, []);


    const getOtpDetails = async () => {
        if (!roomId) {
            toast.error("Room ID is missing!");
            return;
        }

        if (!startDate || !endDate) {
            toast.error("Please select both start and end dates!");
            return;
        }

        const toastId = toast.loading("Fetching OTP Details...");
        try {
            const startMillis = new Date(`${startDate}T${startTime}`).getTime();
            const endMillis = new Date(`${endDate}T${endTime}`).getTime();

            const response = await axios.post(
                `${serverUrl.lockservice}/getpasscodewithroomId`,
                {
                    roomId,
                    keyboardPwdType: passwordType,
                    startDate: startMillis,
                    endDate: endMillis,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );

            const data = response?.data?.data || null;
            setRecord(data);

            if (data.length === 0) {
                toast.error("No records found for selected filters");
            } else {
                toast.success("Data fetched successfully");
            }
        } catch (error) {
            toast.error("Something went wrong while fetching OTP Details");
            setRecord([]);
        } finally {
            toast.dismiss(toastId);
        }
    };

    const handleClose = () => {
        setRecord(null);
        setStartDate("");
        setEndDate("");
        setStartTime("00:00");
        setEndTime("23:59");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                style={{
                    zIndex: "1234532",
                    position: "fixed",
                    maxHeight: "80vh",
                    width: "60vw",
                    overflow: "scroll",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    padding: "2%",
                    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                }}
                className="bg-white rounded-xl"
            >
                <DialogHeader>
                    <DialogTitle className="flex justify-between items-center">
                        <div className="text-xl font-semibold">
                            Generate OTP Details
                        </div>
                        <div
                            className="shadow-sm justify-center items-center flex cursor-pointer border leading-none rounded-full w-7 h-7 text-center"
                            onClick={handleClose}
                        >
                            ✕
                        </div>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap items-end gap-4 mt-4 mb-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                            Start Date
                        </label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                            Start Time
                        </label>
                        <input
                            type="time"
                            value={startTime}
                            onChange={(e) => setStartTime(e.target.value)}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                            End Date
                        </label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                            End Time
                        </label>
                        <input
                            type="time"
                            value={endTime}
                            onChange={(e) => setEndTime(e.target.value)}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">
                            Password Type
                        </label>
                        <select
                            value={passwordType}
                            onChange={(e) => setPasswordType(e.target.value)}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        >
                            {passwordTypeOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <Button onClick={getOtpDetails} variant="default">
                        Generate
                    </Button>
                </div>

                <Table className="w-full bg-white mt-5">
                    <TableHeader>
                        <Header />
                    </TableHeader>
                    <TableBody>
                        {record ? (
                            <Row data={record} />
                        ) : (
                            <tr>
                                <td
                                    colSpan="8"
                                    className="text-center text-gray-500 py-4"
                                >
                                    No records found.
                                </td>
                            </tr>
                        )}
                    </TableBody>
                </Table>
            </DialogContent>
        </Dialog>
    );
}

export default GenerateOtp;
