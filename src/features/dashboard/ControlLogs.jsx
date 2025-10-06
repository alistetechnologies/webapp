import React, { useEffect, useState } from "react";

const isValidDate = (date) => {
    const dateToTest = new Date(date);
    return !isNaN(dateToTest.getTime());
};

const ControlLogs = ({ data = [], appliance, selectedDate }) => {
    const [applianceAnalysis, setApplianceAnalysis] = useState([]);


    useEffect(() => {
        const applianceData =
            data?.snapshot?.appliances?.[appliance?.split("_")[1]]?.controlLogs || [];
        setApplianceAnalysis(applianceData);
    }, [data, appliance]);
    const filteredLogs = (applianceAnalysis || [])
        ?.filter((log) => {
            if (!log?.timestamp || !selectedDate) return false;
            const logDate = new Date(log.timestamp);
            const selected = new Date(selectedDate);
            if (isNaN(logDate.getTime()) || isNaN(selected.getTime())) return false;
            return logDate.getTime() > selected.getTime();
        })
        ?.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


    // useEffect(() => {
    //     const applianceData =
    //         data?.snapshot?.appliances?.[appliance?.split("_")[1]]?.controlLogs || [];
    //     setApplianceAnalysis(applianceData);
    // }, [data, appliance]);
    // console.log(applianceAnalysis)
    // const filteredLogs = (applianceAnalysis || [])
    //     .filter((log) => {
    //         const logDate = new Date(log?.timestamp);
    //         const selectedDateObject = new Date(new Date(selectedDate).setHours(0, 0, 0, 0));
    //         if (!(logDate instanceof Date) || isNaN(logDate)) {
    //             return false;
    //         }
    //         console.log("logDate", logDate.getTime(), selectedDateObject.getTime(), logDate.getTime() >= selectedDateObject.getTime(), logDate, selectedDate)
    //         return logDate.getTime() >= selectedDateObject.getTime()

    //     }).sort((a, b) => b.timestamp - a.timestamp)


    // .filter((log) => {
    //     const logDate = isValidDate(log.originalTimestamp)
    //         ? new Date(log.originalTimestamp)
    //         : isValidDate(log.timestamp)
    //             ? new Date(log.timestamp)
    //             : null;
    //             console.log(logDate)
    //             console.log(first)
    //     if (!logDate) return false;
    //     const selected = new Date(selectedDate);
    //     selected.setHours(0, 0, 0, 0);
    //     return logDate.getTime() > selected.getTime();
    // })
    // .sort((a, b) => {
    //     const aTime = isValidDate(a.timestamp)
    //         ? new Date(a.timestamp).getTime()
    //         : isValidDate(a.originalTimestamp)
    //             ? new Date(a.originalTimestamp).getTime()
    //             : 0;
    //     const bTime = isValidDate(b.timestamp)
    //         ? new Date(b.timestamp).getTime()
    //         : isValidDate(b.originalTimestamp)
    //             ? new Date(b.originalTimestamp).getTime()
    //             : 0;
    //     return bTime - aTime;
    // });
    console.log("filteredData", filteredLogs)
    return (
        <div className="mt-4">
            {filteredLogs.length === 0 ? (
                <div className="p-8 text-center">
                    <p className="text-gray-400">
                        No Logs Available
                    </p>
                </div>
            ) : (
                <>
                    <p className="text-gray-600 mb-4 font-semibold">
                        Logs
                    </p>
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="text-left font-bold px-4 py-2">Medium</th>
                                <th className="text-center font-bold px-4 py-2">State</th>
                                <th className="text-center font-bold px-4 py-2">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredLogs.map((item, index) => {
                                const rowColor = item.command === 0 ? "text-red-600" : "text-green-700";
                                return (
                                    <tr key={`${item.controllerId}-${index}`} className="border-b last:border-b-0">
                                        <td className="px-4 py-2">
                                            {(item.controllerType || "").charAt(0).toUpperCase() +
                                                (item.controllerType || "").slice(1)}{" "}
                                            {item.controllerType === "app"
                                                ? (item.controllerId || "").split("(")[0]
                                                : ""}
                                        </td>
                                        <td className={`text-center px-4 py-2 ${rowColor}`}>
                                            {item.command === 0 ? "OFF" : "ON"}
                                        </td>
                                        <td className="text-center px-4 py-2 text-gray-700">
                                            {isValidDate(item.originalTimestamp)
                                                ? new Date(item.originalTimestamp).toLocaleTimeString("en-IN", {
                                                    hour: "numeric",
                                                    minute: "2-digit",
                                                    hour12: true,
                                                })
                                                : isValidDate(item.timestamp)
                                                    ? new Date(item.timestamp).toLocaleTimeString("en-IN", {
                                                        hour: "numeric",
                                                        minute: "2-digit",
                                                        hour12: true,
                                                    })
                                                    : "-"}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default ControlLogs;
