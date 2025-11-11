import { TableHead, TableRow } from '@/components/ui/table';
import { octiotFont } from '@/constants/config';
import { isOctiot } from '@/utils/browser';
import React from 'react';

export function SchedulesTableHeaders() {
  return (
    <TableRow className='text-black'>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>S.No</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Name</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Time</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Days</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Appliances</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Status</TableHead>
      {/* <TableHead className='text-black'>Schedule Status</TableHead> */}
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Action</TableHead>
    </TableRow>
  );
}
