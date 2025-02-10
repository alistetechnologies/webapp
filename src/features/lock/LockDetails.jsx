import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv"; // Import CSV export
import useRoomStore from "./roomSore";
import { Table, TableBody, TableHeader } from "@/components/ui/table";
import TTLockHeader from "./TTLockHeader";
import { fetchHouse } from "../dashboard/api/house";
import useHouseStore from "../dashboard/houseStore";
import { Spinner } from "@/components/ui/spinner";
import TTLockRow from "./TTLockRow";
import UnlockRecored from "./Pop/UnLockRecord/UnlockRecored";
import OtpLog from "./Pop/OtpLog/OtpLog";
import TimeSync from "./Pop/TimeSync/TimeSync";
import axios from "axios";
import { serverUrl, token } from "@/constants/config";
import Filter from "../dashboard/filter";
import { useUser } from "../auth/api/userStore";
import toast from "react-hot-toast";
import moment from "moment";

export function LockDetails() {
  const params = useParams();
  const user = useUser.getState().user;
  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
  const [csvData, setCsvData] = useState([]); // State for CSV data
  const [hubConneted, setHubConnected] = useState([]);
  const [lockHubId, setLockHubId] = useState({});
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || "",
  });

  useEffect(() => {
    const getUserHouse = async () => {
      setLoading(true);
      try {
        const houseDetails = await fetchHouse(selectedHouse?.value);

        if (!houseDetails?.success) {
          toast.error("Failed to fetch House!!");
          return;
        }

        setHouse(houseDetails?.data);
        useHouseStore.getState().updateHouse(houseDetails?.data);
      } catch (error) {
        toast.error("Error fetching house data!");
      } finally {
        setLoading(false);
      }
    };

    if (selectedHouse?.value) {
      getUserHouse();
    }
  }, [selectedHouse]);

  // Fetch Hub Connection Details
  useEffect(() => {
    const fetchHubData = async () => {
      try {
        const response = await axios.get(`${serverUrl}/hub-data`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response?.data?.success) {
          setHubConnected(response.data.hubConnections || []);
          setLockHubId(response.data.lockHubIds || {});
        }
      } catch (error) {
        toast.error("Failed to fetch hub data!");
      }
    };

    fetchHubData();
  }, []);

  // Generate CSV Data Based on Displayed Table Rows
  useEffect(() => {
    if (house?.rooms?.length) {
      const csvExportData = house.rooms.flatMap((room) =>
        room.ttlocks?.map((lock) => {
          let battery = hubConneted?.find((e) => e.lockId === lock.lockId)?.electricQuantity || "N/A";
          let hubStatus = hubConneted?.some((e) => e.lockId === lock.lockId) ? "Yes" : "No";
          let lastUpdated = lock.lastUpdatedTime ? moment(lock.lastUpdatedTime).format("DD MMMM YYYY, LT") : "N/A";
          let hubId = lockHubId?.[lock.lockId] ?? "N/A";

          return {
            "Room Name": room.roomName,
            "Lock ID": lock.lockId,
            "Lock Name": lock.lockName,
            "Lock Status": lock.isLocked ? "Locked" : "Unlocked",
            "Hub Connected": hubStatus,
            "Hub ID": hubId,
            "Battery (%)": battery,
            "Last Updated": lastUpdated,
          };
        })
      );

      setCsvData(csvExportData);
    }
  }, [house, hubConneted, lockHubId]);

  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll">
      <UnlockRecored open={false} />
      <OtpLog open={false} />
      <TimeSync open={false} />
      <Filter
        house={selectedHouse}
        setSelectedHouse={setSelectedHouse}
        dateShow={false}
        backBtn={true}
        link={"/lock"}
      />

      {loading ? (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Locks</h2>
            {csvData.length > 0 && (
              <CSVLink
                data={csvData}
                filename="Lock_Details.csv"
                className="px-4 py-2 border rounded bg-blue-500 text-white"
              >
                Download CSV
              </CSVLink>
            )}
          </div>

          <Table className="w-full bg-white">
            <TableHeader>
              <TTLockHeader />
            </TableHeader>
            <TableBody>
              {house?.rooms?.length > 0
                ? house.rooms.flatMap((room) =>
                    room.ttlocks?.map((lock, index) => (
                      <TTLockRow
                        key={lock.lockId}
                        lock={{ ...lock, roomName: room.roomName }}
                        index={index}
                        hubConneted={hubConneted}
                        lockHubId={lockHubId}
                      />
                    ))
                  )
                : null}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default LockDetails;
