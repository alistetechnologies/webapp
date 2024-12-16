import React, { useEffect, useState } from 'react';
import { fetchAllSchedulesForHouse } from './api/schedules';
import toast from 'react-hot-toast';

export default function Schedule() {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllSchedulesForHouse();
      console.log('[response]', response);
      if (!response.success) {
        toast.error(response.message);
      }

      setData(response.data.schedules);
    }

    fetchData();
  }, []);
  return <div className='w-full h-full bg-white p-4 overflow-scroll'></div>;
}
