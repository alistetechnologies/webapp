import { TableHead, TableRow } from '@/components/ui/table';
import React from 'react';

export function SchedulesTableHeaders() {
  return (
    <TableRow className='text-black'>
      <TableHead className='text-black'>S.No</TableHead>
      <TableHead className='text-black'>Name</TableHead>
      <TableHead className='text-black'>Time</TableHead>
      <TableHead className='text-black'>Days</TableHead>
      <TableHead className='text-black'>Appliances</TableHead>
      <TableHead className='text-black'>Status</TableHead>
      {/* <TableHead className='text-black'>Schedule Status</TableHead> */}
      <TableHead className='text-black'>Action</TableHead>
    </TableRow>
  );
}
