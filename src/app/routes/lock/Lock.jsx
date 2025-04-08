import { Spinner } from "@/components/ui/spinner";
import Filter from "@/features/dashboard/filter";
import React, { useEffect, useState } from "react";
import { useUser } from "@/features/auth/api/userStore";
import { fetchHouse, fetchUserHouses } from "@/features/dashboard/api/house";
import Rooms from "@/features/dashboard/Rooms";
import NoRooms from "@/features/dashboard/no-rooms";
import { Table, TableBody, TableHeader } from '@/components/ui/table';
import { MainHeader } from "@/features/lock/MainHeader";
import Room from "@/features/lock/Room";
import useHouseStore from "@/features/dashboard/houseStore";
import House from "@/features/lock/House";
import { Download } from "lucide-react";
import { CSVLink } from "react-csv";

export function Lock() {
  const user = useUser.getState().user;
  const [houses, setHouses] = useState([]);
  const [search,setSearch] = useState('')
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [CSVData, setCsvData] = useState([]);

  const getDashboardCsv = async () => {
    try {
      const response = await fetchUserHouses(user?.email);
			const options = response?.masterOf?.map((h) => ({
				label: h?.houseName,
				value: h?.houseAccessCode,
			}));
			let memberof = response?.memberOf?.map((h) => ({
				label: h?.houseName,
				value: h?.houseAccessCode,
			}));
      const allHouses = [...options, ...memberof];
      let csvData = [];
      const allRecordsIds = [];
      let extra = 0;

      for (let house of allHouses) {
        const houseName = house.label;
        const houseID = house.value;
        if (!allRecordsIds.includes(houseID)) {
          const res = await fetchHouse(houseID);
          allRecordsIds.push(houseID);
          if (!res || !res?.data) continue;
          const data = res?.data;
          for(let room of data?.rooms){
            const roomName = room?.roomName;
            const roomId = room._id;
            for (const ttlock of room.ttlocks) {
              csvData.push({
                "House Name": houseName,
                HouseId: houseID,
                "Room Name": roomName,
                RoomId: roomId,
                "Lock Name": ttlock.lockName,
                "LockId": ttlock.lockId,
                "Admin Password": ttlock.adminPasscode,
              })
            }
          }
        }
        else {
          extra++;
        }
      }

      console.log("Extra calls");
      console.log(extra)
      console.log("Csv")
      console.log(csvData);
      setCsvData(csvData);
    } 
    catch (err) {
      console.log(err.message)
    }
  };

  useEffect(() => {
    const getUserHouses = async () => {
      const response = await fetchUserHouses(user?.email);

      const options = response?.masterOf?.map((h) => ({
        label: h?.houseName,
        value: h?.houseAccessCode,
      }));
     setHouses(options)
    };
    getUserHouses();
    getDashboardCsv()
  }, [user]);
  return (
    <div className="w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll">
        <div className='w-full bg-white p-4 mb-6 rounded-md'>
      <div className='space-y-4 flex gap-4 items-center'>
        <div className='flex gap-4 items-center flex-1'>
          <h2 className='text-2xl hover:underline'>House Name:</h2>

         <input
          type="text"
          className='border p-2 rounded-lg'
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
         />
        </div>
         {CSVData.length > 0 && (
            <CSVLink
              className="inline-flex items-center gap-2 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-lg border border-gray-200 shadow-sm transition-colors duration-200 ease-in-out hover:border-gray-300"
              filename="master-otp-details.csv"
              data={CSVData}
            >
              <Download className="w-4 h-4 text-gray-600" />
              <span>Export CSV</span>
            </CSVLink>
          )}
        </div>
        </div>

      {loading && (
        <div className="flex justify-center items-center h-full w-full bg-[#EAEBF0]">
          <Spinner size="lg" />
        </div>
      )}
        {!loading && (
        <Table className='w-full bg-white'>
          <TableHeader>
            <MainHeader />
          </TableHeader>
          <TableBody>
             {
              houses?.length>0 && houses?.filter((e)=>e.label.toLowerCase().includes(search.toLowerCase())).map((house,index)=>{
                return(
                  <House
                    house={house}
                    index={index}
                  />
                )
              })
             }
          </TableBody>
        </Table>
      )}
    </div>
  );
}
