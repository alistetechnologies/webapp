import React, { useEffect, useState } from 'react';
import { fetchAllSchedulesForHouse } from './api/schedules';
import toast from 'react-hot-toast';
import { Table, TableHeader } from '@/components/ui/table';
import { SchedulesTableHeaders } from './components/SchedulesTableHeaders';
import { AddSchedule } from './components/AddSchedule';

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
  return (
    <div className='w-full h-full bg-white p-4 overflow-scroll'>
      <AddSchedule />
      <Table className='w-full bg-white'>
        <TableHeader>
          <SchedulesTableHeaders />
        </TableHeader>
      </Table>
    </div>
  );
}
