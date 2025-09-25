import { Button } from "@/components/ui/button";
import ReportsModel from "@/components/ui/common/ReportsModel";
import React, { useEffect } from "react";
import { useUser } from "@/features/auth/api/userStore";
import { useNavigate } from "react-router-dom";

export function Reports() {
  const user = useUser((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.email) {
      navigate("/", { replace: true });
    } else {
      navigate("/app", { replace: true });
    }
  }, [user, navigate]);

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
      <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg mt-2">
        <div className="">
          <h4 className="text-xl font-bold text-gray-800">Lock Details with Admin Password</h4>
          <p className="text-sm text-gray-600">
            Analysis of Admin Password with House Name, Room Name, Lock Name, Admin Password
          </p>
        </div>
        <ReportsModel
          modelHeader={"Lock Details with Admin Password"}
          modelDescription={
            "Analysis of Admin Password with House Name, Room Name, Lock Name, Admin Password"
          }
          isDateRequired={"No"}
        />
      </div>
      <div className="flex items-center justify-between p-4 bg-white border border-gray-300 rounded-lg mt-2">
        <div className="">
          <h4 className="text-xl font-bold text-gray-800">House Details</h4>
          <p className="text-sm text-gray-600">
            Analysis of house details with House Name, Room Name.
          </p>
        </div>
        <ReportsModel
          modelHeader={"House Details"}
          modelDescription={
            "Analysis of house details with House Name, Room Name."
          }
          isDateRequired={"no"}
        />
      </div>
    </div>
  );
}
