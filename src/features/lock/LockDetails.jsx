import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CSVLink } from "react-csv";
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
import Header from "./LockHub/Header";
import Row from "./LockHub/Row";
import Filter from "../dashboard/filter";
import { useUser } from "../auth/api/userStore";
import toast from "react-hot-toast";
import { Download } from "lucide-react";
import moment from 'moment';

export function LockDetails() {
  const params = useParams();
  const user = useUser.getState().user;
  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
  let [unlockingHistory, setUnlockingHistory] = useState(false);
  let [otpHistory, setOtpHistory] = useState(false);
  let [timeSyncHistory, setTimeSyncHistory] = useState(false);
  let [lockDetails, setLockDetails] = useState({});
  let [hubConneted, setHubConcted] = useState([]);
  let [lockRoomName, setLockRoomName] = useState({});
  let [lockHubId, setLockHubId] = useState({});
  const [csvData, setCsvData] = useState([]);
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || "",
  });

  useEffect(() => {
    const getUserHouse = async () => {
      setLoading(true);''
      const houseDetails = await fetchHouse(selectedHouse?.value);

      if (!houseDetails.success) {
        toast.error("Failed to fetch House!!");
        setLoading(false);
        return;
      }
      setHouse(houseDetails?.data);
      setLoading(false);
      useHouseStore.getState().updateHouse(houseDetails?.data);
    };

    getUserHouse();
  }, [selectedHouse]);

  useEffect(() => {
    if (Object.keys(house).length > 0) {
      let hubConnetedData=[]
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
            let dataAarray = typeof res?.data  === "object"? Object.keys(res?.data).reduce((p,c)=>{
               let mapHubID = res?.data[c].map((e)=>{
                return{...e,hubId:c}
              })
              return [...p,...mapHubID]
            },[]):res?.data
            setHubConcted(dataAarray || []);
            hubConnetedData=dataAarray || []
            if (house?.rooms?.length > 0) {
              const locks = house.rooms.reduce((p, c) => {
                return [
                  ...p,
                  ...c.ttlocks.map((l) => {
                    const battery = hubConnetedData.find((e) => e.lockId === l.lockId)?.electricQuantity || null;
                    return {
                      "Lock ID": l.lockId,
                      "Room Name": c.roomName,
                      "Hub Connected": hubConnetedData.some((e) => e.lockId === l.lockId) ? "Yes" : "No",
                      "Battery Level": battery !== null ? battery : "---",
                      "Last Updated": moment(l.lastUpdatedTime).format("DD MMMM YYYY, LT"),
                      "Hub ID": ttlockHubId[l.lockId] || "---"
                    };
                  }),
                ];
              }, []);
              setCsvData(locks.sort((a,b)=>a["Room Name"]-b["Room Name"]));
            }
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

 
      if (house?.rooms?.length > 0) {
        const locks = house.rooms.reduce((p, c) => {
          return [
            ...p,
            ...c.ttlocks.map((l) => {
              const battery = hubConnetedData.find((e) => e.lockId === l.lockId)?.electricQuantity || null;
              return {
                "Lock ID": l.lockId,
                "Room Name": c.roomName,
                "Hub Connected": hubConnetedData.some((e) => e.lockId === l.lockId) ? "Yes" : "No",
                "Battery Level": battery !== null ? battery : "---",
                "Last Updated": moment(l.lastUpdatedTime).format("DD MMMM YYYY, LT"),
                "Hub ID": ttlockHubId[l.lockId] || "---"
              };
            }),
          ];
        }, []);
        setCsvData(locks.sort((a,b)=>a["Room Name"]-b["Room Name"]));
      }
    }
  }, [house]);

  const styles = {
    lebelHeader: {
      fontSize: "20px",
      marginBottom: "12px",
      fontWeight: "bolder",
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
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}
      {!loading && (
        <div>
          <div className="flex justify-between items-center mb-4">
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
          <Table className="w-full bg-white">
            <TableHeader>
              <TTLockHeader />
            </TableHeader>
            <TableBody>
              {house?.rooms?.length > 0 &&
                house?.rooms
                  ?.reduce((p, c) => {
                    return [
                      ...p,
                      ...c.ttlocks.map((l) => {
                        return { ...l, roomName: c.roomName };
                      }),
                    ];
                  }, [])
                  .sort((a, b) => a.roomName - b.roomName)
                  .map((lock, index) => {
                    return (
                      <TTLockRow
                        lock={lock}
                        index={index}
                        setLockDetails={setLockDetails}
                        setUnlockingHistory={setUnlockingHistory}
                        setOtpHistory={setOtpHistory}
                        setTimeSyncHistory={setTimeSyncHistory}
                        hubConneted={hubConneted}
                        lockHubId={lockHubId}
                        key={lock?.lockId}
                      />
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
                        hubConneted={hubConneted}
                      />
                    );
                  })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default LockDetails