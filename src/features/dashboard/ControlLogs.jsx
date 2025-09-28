import React, { useEffect, useState } from "react";
import {
    Box,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";

const isValidDate = (date) => {
    const dateToTest = new Date(date);
    return !isNaN(dateToTest.getTime());
};

const ControlLogs = ({ data = [], appliance, selectedDate }) => {
    const [applianceAnalysis, setApplianceAnalysis] = useState(null);

    useEffect(() => {
        const applianceData =
            data?.snapshot?.appliances?.[appliance?.split("_")[1]]?.controlLogs || [];
        setApplianceAnalysis(applianceData);
    }, [data, appliance]);

    const filteredLogs =
        applianceAnalysis
            ?.filter((log) => {
                const logDate = new Date(log.timestamp);
                const selected = new Date(selectedDate);
                if (!(logDate instanceof Date) || isNaN(logDate.getTime())) return false;
                return logDate.getTime() > selected.getTime();
            })
            ?.sort((a, b) => b.timestamp - a.timestamp) || [];

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
                Logs
            </Typography>

            {filteredLogs.length === 0 ? (
                <Box sx={{ p: 4, textAlign: "center" }}>
                    <Typography variant="body1" color="text.disabled">
                        No controllers available
                    </Typography>
                </Box>
            ) : (
                <Paper elevation={2} sx={{ borderRadius: 2, overflow: "hidden" }}>
                    <Table>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
                                <TableCell sx={{ fontWeight: "bold" }}>Medium</TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                                    State
                                </TableCell>
                                <TableCell sx={{ fontWeight: "bold", textAlign: "center" }}>
                                    Time
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredLogs.map((item, index) => {
                                const rowColor = item.command === 0 ? "#D32F2F" : "#388E3C";

                                return (
                                    <TableRow key={`${item.controllerId}-${index}`}>
                                        <TableCell>
                                            {item.controllerType.charAt(0).toUpperCase() +
                                                item.controllerType.slice(1)}{" "}
                                            {item.controllerType === "app"
                                                ? item.controllerId.split("(")[0]
                                                : ""}
                                        </TableCell>
                                        <TableCell sx={{ color: rowColor, textAlign: "center" }}>
                                            {item.command === 0 ? "OFF" : "ON"}
                                        </TableCell>
                                        <TableCell sx={{ textAlign: "center", color: "#444" }}>
                                            {isValidDate(item.originalTimestamp)
                                                ? new Date(item.originalTimestamp).toLocaleTimeString(
                                                    "en-IN",
                                                    {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    }
                                                )
                                                : isValidDate(item.timestamp)
                                                    ? new Date(item.timestamp).toLocaleTimeString("en-IN", {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })
                                                    : "-"}
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </Paper>
            )}
        </Box>
    );
};

export default ControlLogs;
