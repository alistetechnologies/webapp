import React, { useEffect, useState } from 'react';
import {
  fetchAllSchedulesForHouse,
  removeSchedule,
  toggleSchedule,
} from './api/schedules';
import toast from 'react-hot-toast';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { SchedulesTableHeaders } from './components/SchedulesTableHeaders';
import { AddSchedule } from './components/AddSchedule';
import moment from 'moment';
import { Delete } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useScheduleStore from './scheduleStore';

export default function Schedule() {
  const schedules = useScheduleStore((state) => state.schedules);
  useEffect(() => {
    async function fetchData() {
      const response = await fetchAllSchedulesForHouse();
      if (!response.success) {
        toast.error(response.message);
      }
    }

    fetchData();
  }, []);

  async function handleDelete(schId) {
    const response = await removeSchedule({ scheduleId: schId });

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success('Successfully deleted Schedule.');
  }

  async function toggleScheduleStatus(schId, enabled) {
    const response = await toggleSchedule({ scheduleId: schId, enabled });

    if (!response.success) {
      toast.error(response.message);
      return;
    }
    toast.success('Successfully deleted Schedule.');
  }
  return (
    <div className='w-full h-full bg-white p-4 overflow-scroll'>
      <AddSchedule />
      <Table className='w-full bg-white'>
        <TableHeader>
          <SchedulesTableHeaders />
        </TableHeader>
        <TableBody>
          {schedules.length > 0 &&
            schedules.map((sch, i) => (
              <TableRow key={sch._id}>
                <TableCell>{i + 1}</TableCell>
                <TableCell>{sch.name}</TableCell>
                <TableCell>
                  {sch.type === 'at'
                    ? moment(sch.expression).format('HH:mm')
                    : ''}
                </TableCell>
                <TableCell>{sch.type === 'at' ? 'Once' : 'Every'}</TableCell>
                <TableCell
                  className='cursor-pointer'
                  onClick={() => toggleScheduleStatus(sch._id, !sch.enabled)}
                >
                  {sch.enabled ? (
                    <span className='text-green-600 font-bold'>Enabled</span>
                  ) : (
                    <span className='text-red-400'>Disabled</span>
                  )}
                </TableCell>
                <TableCell>
                  <Button onClick={() => handleDelete(sch._id)}>
                    <Delete /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
