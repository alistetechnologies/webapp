import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { serverUrl, token } from "@/constants/config";

function GenerateEKey({ roomId, open, setOpen }) {
    const today = new Date().toISOString().split("T")[0];
    const [loading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState(null);
    const [mobile, setMobile] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [keyName, setKeyName] = useState("");
    const [type, setType] = useState("");
    const [startDate, setStartDate] = useState(today);
    const [endDate, setEndDate] = useState(today);

    const resetForm = () => {
        setMobile("");
        setFirstName("");
        setLastName("");
        setKeyName("");
        setType("");
        setStartDate(today);
        setEndDate(today);
        setResponseData(null);
        setLoading(false);
    };

    const handleOpenChange = (value) => {
        setOpen(value);
        if (!value) {
            resetForm();
        }
    };

    const handleMobileChange = (e) => {
        const value = e.target.value.replace(/\D/g, "").slice(0, 10);
        setMobile(value);
    };

    const handleNameChange = (setter) => (e) => {
        const value = e.target.value.replace(/[^a-zA-Z ]/g, "");
        setter(value);
    };

    const handleGenerate = async () => {
        setLoading(true);
        setResponseData(null);

        try {
            const response = await axios.post(
                `${serverUrl.lockservice}/registerEkey`,
                {
                    mobile,
                    first_name: firstName,
                    last_name: lastName,
                    roomId,
                    keyName,
                    type,
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

            const data = response?.data?.data?.data?.ekey;
            if (data) setResponseData(data);
        } catch (error) {
            console.error("Error generating E-Key:", error);
            toast.error("Failed to generate E-Key. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        if (responseData?.keyData) {
            navigator.clipboard.writeText(responseData.keyData).then(() => {
                toast.success("Key data copied to clipboard!");
            }).catch((err) => {
                console.error("Clipboard copy failed:", err);
                toast.error("Failed to copy key data to clipboard!");
            });
        } else {
            toast.error("No key data found!");
        }
    };

    const labelStyle =
        "absolute left-3 -top-2 bg-white px-1 text-xs text-gray-500";

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        Generate E-Key
                    </DialogTitle>
                </DialogHeader>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">

                    {/* FIRST NAME */}
                    <div className="relative">
                        <Input
                            value={firstName}
                            onChange={handleNameChange(setFirstName)}
                        />
                        <span className={labelStyle}>First Name</span>
                    </div>

                    {/* LAST NAME */}
                    <div className="relative">
                        <Input
                            value={lastName}
                            onChange={handleNameChange(setLastName)}
                        />
                        <span className={labelStyle}>Last Name</span>
                    </div>

                    {/* PHONE */}
                    <div className="relative">
                        <Input
                            value={mobile}
                            onChange={handleMobileChange}
                            maxLength={10}
                        />
                        <span className={labelStyle}>Phone Number</span>
                    </div>

                    {/* KEY NAME */}
                    <div className="relative">
                        <Input
                            value={keyName}
                            onChange={(e) => setKeyName(e.target.value)}
                        />
                        <span className={labelStyle}>Key Name</span>
                    </div>

                    {/* TYPE */}
                    <div className="relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="peer block w-full border border-gray-300 rounded-md px-3 py-3 bg-white focus:outline-none focus:border-blue-500"
                        >
                            <option value="" disabled hidden></option>
                            <option value="recurring">Recurring</option>
                            <option value="one-time">One Time</option>
                        </select>

                        <label className={labelStyle}>Key Type</label>
                    </div>

                    {/* START DATE */}
                    <div className="relative">
                        <Input
                            type="date"
                            value={startDate}
                            min={today}
                            onChange={(e) => {
                                setStartDate(e.target.value);
                                if (e.target.value > endDate) {
                                    setEndDate(e.target.value);
                                }
                            }}
                        />
                        <span className={labelStyle}>Start Date</span>
                    </div>

                    {/* END DATE */}
                    <div className="relative">
                        <Input
                            type="date"
                            value={endDate}
                            min={startDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                        <span className={labelStyle}>End Date</span>
                    </div>
                </div>

                <Button
                    className="mt-6 w-full"
                    onClick={handleGenerate}
                    disabled={
                        loading ||
                        mobile.length !== 10 ||
                        !firstName ||
                        !lastName ||
                        !keyName ||
                        !type ||
                        !startDate ||
                        !endDate
                    }
                >
                    {loading ? "Generating…" : "Generate E-Key"}
                </Button>

                {responseData && (
                    <div className="mt-6 p-5 border rounded-lg bg-gray-100 shadow-sm">
                        <h3 className="font-semibold text-lg mb-4">
                            E-Key Generated Successfully
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <p><strong>Lock ID:</strong> {responseData.lockId}</p>
                            <p><strong>E-Key ID:</strong> {responseData.ekeyId}</p>
                            <p><strong>Type:</strong> {responseData.type}</p>
                            <p><strong>Start Time:</strong> {new Date(responseData.startTime).toLocaleString()}</p>
                            <p><strong>End Time:</strong> {new Date(responseData.endTime).toLocaleString()}</p>
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-center gap-3 mt-4">
                            <p className="m-0">
                                <strong>Key Data:</strong>
                            </p>
                            <Button size="sm" onClick={handleCopy}>
                                Copy Key Data
                            </Button>
                        </div>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
}

export default GenerateEKey;
