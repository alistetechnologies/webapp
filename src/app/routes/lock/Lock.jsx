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

export function Lock() {
  const user = useUser.getState().user;
  const [houses, setHouses] = useState([]);
  const [search,setSearch] = useState('')
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
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
