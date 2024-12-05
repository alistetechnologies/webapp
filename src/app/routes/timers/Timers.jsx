import { Spinner } from '@/components/ui/spinner';
import { Table, TableBody, TableHeader } from '@/components/ui/table';
import { useUser } from '@/features/auth/api/userStore';

import {
  fetchHouse,
  fetchConnectedDevices,
} from '@/features/dashboard/api/house';
import Filter from '@/features/dashboard/filter';
import useHouseStore from '@/features/dashboard/houseStore';

import { MainHeader } from '@/features/dashboard/MainHeader';
import NoRooms from '@/features/dashboard/no-rooms';
import Rooms from '@/features/dashboard/Rooms';
import { AutoTimers } from '@/features/timers/AutoTimers';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

let rerender = 0;
export function Timers() {
  const user = useUser.getState().user;
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || '',
  });
  const [house, setHouse] = useState({});
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    const getUserHouse = async () => {
      setLoading(true);
      const houseDetails = await fetchHouse(selectedHouse?.value);

      if (!houseDetails.success) {
        toast.error('Failed to fetch House!!');
        setLoading(false);
        return;
      }

      setHouse(houseDetails?.data);
      setLoading(false);
      useHouseStore.getState().updateHouse(houseDetails?.data);
    };

    getUserHouse();
  }, [selectedHouse?.value]);

  console.log('[house]', house);
  // console.log('[devices] ', connectedDevices);

  rerender += 1;

  // if (loading) {
  //   return (
  //     <div className='flex justify-center items-center h-full w-full bg-[#EAEBF0]'>
  //       <Spinner size='lg' />
  //     </div>
  //   );
  // }
  return (
    <div className='w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll'>
      <Filter
        house={selectedHouse}
        setSelectedHouse={setSelectedHouse}
        date={date}
        setDate={setDate}
      />

      {loading && (
        <div className='flex justify-center items-center h-full w-full bg-[#EAEBF0]'>
          <Spinner size='lg' />
        </div>
      )}

      {!loading && <AutoTimers houseData={house} />}
    </div>
  );
}
