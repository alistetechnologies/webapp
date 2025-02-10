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
<<<<<<< Updated upstream
import moment from "moment";
=======
import { CSVLink } from "react-csv";
import { Download } from "lucide-react";
import moment from 'moment';
>>>>>>> Stashed changes

export function LockDetails() {
  const params = useParams();
  const user = useUser.getState().user;
  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
<<<<<<< Updated upstream
  const [csvData, setCsvData] = useState([]); // State for CSV data
  const [hubConneted, setHubConnected] = useState([]);
  const [lockHubId, setLockHubId] = useState({});
=======
  let [unlockingHistory, setUnlockingHistory] = useState(false);
  let [otpHistory, setOtpHistory] = useState(false);
  let [timeSyncHistory, setTimeSyncHistory] = useState(false);
  let [lockDetails, setLockDetails] = useState({});
  let [hubConneted, setHubConcted] = useState([]);
  let [lockRoomName, setLockRoomName] = useState({});
  let [lockHubId, setLockHubId] = useState({});
  const [csvData, setCsvData] = useState([]);
>>>>>>> Stashed changes
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

<<<<<<< Updated upstream
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
=======
    getUserHouse();
  }, [selectedHouse]);

  useEffect(() => {
    if (Object.keys(house).length > 0) {
      let ttlockhub = house?.rooms?.reduce((p, c) => {
        return [
          ...p,
          ...c.ttgateways.map((l) => {
            return { ...l, roomName: c.roomName };
          }),
        ];
      }, []);

      if (ttlockhub.length > 0) {
        axios
          .post(
            `${serverUrl.lockservice}/hubDetails`,
            {
              hubIds: ttlockhub.map((e) => e.gatewayId),
            },
            {
              headers: {
                Authorization: token,
              },
            }
          )
          .then((res) => {
            setHubConcted(res?.data || []);
          })
          .catch((err) => {
            setHubConcted([]);
          });
      }
      let ttlock = house?.rooms?.reduce((p, c) => {
        return {
          ...p,
          ...c.ttlocks.reduce((pp, cc) => {
            pp[cc.lockId] = c.roomName;
            return pp;
          }, {}),
        };
      }, {});
      setLockRoomName(ttlock);

      let ttlockHubId = house?.rooms?.reduce((p, c) => {
        return {
          ...p,
          ...c.ttgateways.reduce((pp, cc) => {
            let res = cc.locks.reduce((lp, lc) => {
              lp[lc.lockId] = cc.gatewayId;
              return lp;
            }, {});

            return { ...pp, ...res };
          }, {}),
        };
      }, {});

      setLockHubId(ttlockHubId);

      // Prepare CSV data
      if (house?.rooms?.length > 0) {
        const locks = house.rooms.reduce((p, c) => {
          return [
            ...p,
            ...c.ttlocks.map((l) => {
              const battery = hubConneted.find((e) => e.lockId === l.lockId)?.electricQuantity || null;
              return {
                "Lock ID": l.lockId,
                "Room Name": c.roomName,
                "Hub Connected": hubConneted.some((e) => e.lockId === l.lockId) ? "Yes" : "No",
                "Battery Level": battery !== null ? battery : "---",
                "Last Updated": moment(l.lastUpdatedTime).format("DD MMMM YYYY, LT"),
                "Hub ID": ttlockHubId[l.lockId] || "---"
              };
            }),
          ];
        }, []);
        setCsvData(locks);
      }
    }
  }, [house, hubConneted]);

  const styles = {
    lebelHeader: {
      fontSize: "20px",
      marginBottom: "12px",
      fontWeight: "bolder",
      marginTop: "10px", // Added this line to push it down
    },
  };

  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll">
      <UnlockRecored
        lock={lockDetails}
        open={unlockingHistory}
        setOpen={setUnlockingHistory}
      />
      <OtpLog lock={lockDetails} open={otpHistory} setOpen={setOtpHistory} />
      <TimeSync
        lock={lockDetails}
        open={timeSyncHistory}
        setOpen={setTimeSyncHistory}
      />
      <div className="mb-4">
        <Filter
          house={selectedHouse}
          setSelectedHouse={setSelectedHouse}
          dateShow={false}
          backBtn={true}
          link={'/lock'}
        />
      </div>
      {loading && (
>>>>>>> Stashed changes
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
<<<<<<< Updated upstream
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

=======
            <div style={styles.lebelHeader}>Locks</div>
            {csvData.length > 0 && (
              <CSVLink
                className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 shadow-sm transition-colors duration-200 ease-in-out hover:border-gray-300"
                filename="lock-details.csv"
                data={csvData}
              >
                <Download className="w-4 h-4 text-gray-600" />
                <span>Export CSV</span>
              </CSVLink>
            )}
          </div>
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
                    ))
                  )
                : null}
=======
                    );
                  })}
            </TableBody>
          </Table>
        </div>
      )}

      {!loading && (
        <div className="mt-6">
          <div style={styles.lebelHeader}>Lock Hubs</div>
          <Table className="w-full bg-white">
            <TableHeader>
              <Header />
            </TableHeader>
            <TableBody>
              {house?.rooms?.length > 0 &&
                house?.rooms
                  ?.reduce((p, c) => {
                    return [
                      ...p,
                      ...c.ttgateways.map((l) => {
                        return { ...l, roomName: c.roomName };
                      }),
                    ];
                  }, [])
                  .sort((a, b) => a.roomName - b.roomName)
                  .map((lock, index) => {
                    return (
                      <Row
                        lock={lock}
                        index={index}
                        lockRoomName={lockRoomName}
                        key={lock?.gatewayId}
                      />
                    );
                  })}
>>>>>>> Stashed changes
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

<<<<<<< Updated upstream
export default LockDetails;
=======
export default LockDetails
>>>>>>> Stashed changes
