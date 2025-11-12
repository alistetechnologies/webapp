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
    const [record, setRecord] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const getOtpDetails = async () => {
        const toastId = toast.loading("Fetching OTP Details...");
        try {
            const response = await axios.post(
                `${serverUrl.lockservice}/getpasscodewithroomId`,
                {
                    roomId,
                    keyboardPwdType,
                    startDate,
                    endDate,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token,
                    },
                }
            );
            console.log(response)
            const data = response?.data?.data;

            setRecord(withUserNames);

            if (withUserNames.length === 0) {
                toast.error("No records found for selected filters");
            } else {
                toast.success("Data fetched successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while fetching OTP Details");
            setRecord([]);
        } finally {
            toast.dismiss(toastId);
        }
    };

    useEffect(() => {
        if (open && roomId) {
            getOtpDetails();
        } else {
            setRecord([]);
            setStartDate("");
            setEndDate("");
        }
    }, [open, roomId]);

    const handleClose = () => {
        setRecord([]);
        setStartDate("");
        setEndDate("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                style={{
                    zIndex: "1234532",
                    position: "fixed",
                    maxHeight: "80vh",
                    width: "90vw",
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
                        <div className="text-xl font-semibold">Generate OTP Details</div>
                        <div
                            className="shadow-sm justify-center items-center flex cursor-pointer border leading-none rounded-full w-7 h-7 text-center"
                            onClick={handleClose}
                        >
                            ✕
                        </div>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                {/* --- Filters Section --- */}
                <div className="flex flex-wrap items-end gap-4 mt-4 mb-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                            max={endDate || new Date().toISOString().split("T")[0]}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">End Date</label>
                        <input
                            type="date"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                            min={startDate}
                            max={new Date().toISOString().split("T")[0]}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        />
                    </div>

                    <Button onClick={getOtpDetails} variant="default">
                        Generate
                    </Button>
                </div>

                {/* --- Table Section --- */}
                <Table className="w-full bg-white mt-5">
                    <TableHeader>
                        <Header />
                    </TableHeader>
                    <TableBody>
                        {record.length > 0 ? (
                            record.map((rec, index) => (
                                <Row data={rec} index={index} key={index} />
                            ))
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
