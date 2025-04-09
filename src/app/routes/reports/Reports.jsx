import { Button } from "@/components/ui/button";
import ReportsModel from "@/components/ui/common/ReportsModel";
import React from "react";

export function Reports() {
  return (
    <div className="bg-[#f7f7f7] p-4 w-full h-full">
      <h1 className="text-2xl font-bold text-gray-800 mb-4 p-2">Reports</h1>
      {/* Report  */}
      <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg">
        <div className="">
          <h4 className="text-xl font-bold text-gray-800">House Analysis</h4>
          <p className="text-sm text-gray-600">
            Analysis of house appliances with OnTime, OnlineTime, SmartCommands,
            SwitchCommands and TotalCommands
          </p>
        </div>
        <ReportsModel
          modelHeader={"House Analysis"}
          modelDescription={
            "Analysis of house appliances with OnTime, OnlineTime, SmartCommands, SwitchCommands and TotalCommands"
          }
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg">
        <div className="">
          <h4 className="text-xl font-bold text-gray-800">House Analysis</h4>
          <p className="text-sm text-gray-600">
            Analysis of house appliances with House Name, Room Name, Lock Name, Admin Passcode
          </p>
        </div>
        <ReportsModel
          modelHeader={"House Analysis"}
          modelDescription={
            "Analysis of house appliances with House Name, Room Name, Lock Name, Admin Passcode"
          }
          isDateRequired={"No"}
        />
      </div>
    </div>
  );
}
