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

function EkeyDetails({ open, setOpen, roomId }) {
    const [record, setRecord] = useState([]);
    const [filteredRecord, setFilteredRecord] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedActive, setSelectedActive] = useState("All");
    const [selectedType, setSelectedType] = useState("All");
    const [userList, setUserList] = useState([]);

    const handleFilterChange = (filter, value) => {
        if (filter === "user") setSelectedUser(value);
        if (filter === "active") setSelectedActive(value);
        if (filter === "type") setSelectedType(value);
    };

    const filters = (data) => {
        let filtered = [...data];

        if (selectedUser) {
            filtered = filtered.filter(
                (item) =>
                    item.userName?.toLowerCase() === selectedUser.toLowerCase()
            );
        }

        if (selectedActive !== "All") {
            const isActive = selectedActive === "True";
            filtered = filtered.filter((item) => item.active === isActive);
        }

        if (selectedType !== "All") {
            filtered = filtered.filter(
                (item) =>
                    item.type?.toLowerCase() === selectedType.toLowerCase()
            );
        }

        return filtered;
    };

    const getEkeyDetails = async () => {
        if (!roomId) {
            toast.error("Room ID is missing");
            return;
        }

        const toastId = toast.loading("Fetching eKey Details...");
        try {
            const response = await axios.post(
                `${serverUrl.lockservice}/fetch/ekeyLogs`,
                {
                    roomId,
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

            const data = response?.data?.data?.ekeys || [];
            const withUserNames = data.map((item) => ({
                ...item,
                userName: `${item?.userId?.first_name || ""} ${item?.userId?.last_name || ""}`.trim(),
            }));

            const uniqueUsers = [
                ...new Set(
                    withUserNames
                        .map((i) => i.userName)
                        .filter((name) => name && name.length > 0)
                ),
            ];
            setUserList(uniqueUsers);

            setRecord(withUserNames);
            setFilteredRecord(filters(withUserNames));

            if (withUserNames.length === 0) {
                toast.error("No records found");
            } else {
                toast.success("Data fetched successfully");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong while fetching Details");
            setRecord([]);
            setFilteredRecord([]);
            setUserList([]);
        } finally {
            toast.dismiss(toastId);
        }
    };
    useEffect(() => {
        const updated = filters(record);
        setFilteredRecord(updated);
    }, [selectedUser, selectedActive, selectedType, record]);

    useEffect(() => {
        if (open) {
            const today = new Date();
            const oneMonthAgo = new Date();
            oneMonthAgo.setMonth(today.getMonth() - 1);

            const formatDate = (d) => d.toISOString().split("T")[0];

            setEndDate(formatDate(today));
            setStartDate(formatDate(oneMonthAgo));
        } else {
            setRecord([]);
            setFilteredRecord([]);
            setStartDate("");
            setEndDate("");
            setSelectedUser("");
            setSelectedActive("All");
            setSelectedType("All");
            setUserList([]);
        }
    }, [open]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent
                style={{
                    zIndex: 1234532,
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
                        <div className="text-xl font-semibold">E-Key Details</div>
                        <button
                            type="button"
                            aria-label="Close"
                            className="shadow-sm justify-center items-center flex cursor-pointer border leading-none rounded-full w-7 h-7 text-center"
                            onClick={handleClose}
                        >
                            ✕
                        </button>
                    </DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>

                <div className="flex flex-wrap items-end gap-4 mt-4 mb-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Start Date</label>
                        <input
                            type="date"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
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
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">User</label>
                        <select
                            value={selectedUser}
                            onChange={(e) => handleFilterChange("user", e.target.value)}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600 w-52"
                        >
                            <option value="">All Users</option>
                            {userList.map((user) => (
                                <option key={user} value={user}>
                                    {user}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Active</label>
                        <select
                            value={selectedActive}
                            onChange={(e) => handleFilterChange("active", e.target.value)}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600 w-40"
                        >
                            <option value="All">All</option>
                            <option value="True">True</option>
                            <option value="False">False</option>
                        </select>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium mb-1">Type</label>
                        <select
                            value={selectedType}
                            onChange={(e) => handleFilterChange("type", e.target.value)}
                            className="border p-2 rounded-md border-gray-300 hover:border-slate-600 w-52"
                        >
                            <option value="All">All</option>
                            <option value="Recurring">Recurring</option>
                            <option value="One Time">One Time</option>
                        </select>
                    </div>

                    <Button onClick={getEkeyDetails} variant="default">
                        Fetch Data
                    </Button>
                </div>

                <Table className="w-full bg-white mt-5">
                    <TableHeader>
                        <Header />
                    </TableHeader>
                    <TableBody>
                        {filteredRecord.length > 0 ? (
                            filteredRecord.map((rec, index) => (
                                <Row data={rec} index={index} key={index} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8" className="text-center text-gray-500 py-4">
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

export default EkeyDetails;
