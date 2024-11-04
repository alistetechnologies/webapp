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
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

let rerender = 0;
export function Dashboard() {
  const user = useUser.getState().user;
  const [selectedHouse, setSelectedHouse] = useState({
    value: user?.selectedHouse || '',
  });
  const [house, setHouse] = useState({});
  const [connectedDevices, setConnectedDevices] = useState([]);

  useEffect(() => {
    const getUserHouse = async () => {
      const houseDetails = await fetchHouse(selectedHouse?.value);

      if (!houseDetails.success) {
        toast.error('Failed to fetch House!!');
        return;
      }

      setHouse(houseDetails?.data);
      useHouseStore.getState().updateHouse(houseDetails?.data);
    };

    getUserHouse();
  }, [selectedHouse?.value]);

  useEffect(() => {
    const getConnectedDevices = async () => {
      if (!selectedHouse?.value) {
        toast.error('No Selected House!!');
      }

      const connectedDevicesResponse = await fetchConnectedDevices({
        houseId: selectedHouse?.value,
      });

      if (!connectedDevicesResponse.success) {
        toast.error('Failed to fetch Connected devices!!');
        return;
      }

      setConnectedDevices(connectedDevicesResponse?.data?.devices);
    };

    getConnectedDevices();
  }, [selectedHouse?.value]);

  console.log('[house]', house);

  rerender += 1;
  return (
    <div className='w-full h-full bg-[#EAEBF0] p-8 overflow-y-scroll'>
      <Filter house={selectedHouse} setSelectedHouse={setSelectedHouse} />
      <h2>{rerender}</h2>
      <MainHeader />
      {house?.rooms ? (
        <Rooms roomsData={house?.rooms} connectedDevices={connectedDevices} />
      ) : (
        <NoRooms />
      )}
    </div>
  );
}
