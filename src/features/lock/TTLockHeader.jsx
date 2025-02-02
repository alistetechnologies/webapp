import { TableHead, TableRow } from '@/components/ui/table'
import React from 'react'

function TTLockHeader() {
  return (
    <TableRow className='text-black'>
    <TableHead className='text-black text-center'>S.No</TableHead>
    <TableHead className='text-black text-center'>Id</TableHead>
    <TableHead className='text-black text-center'>Room</TableHead>
    <TableHead className='text-black text-center'>Conneted to Hub</TableHead>
    <TableHead className='text-black text-center'>Battery Percentage</TableHead> 
    <TableHead className='text-black text-center'>Last Sync Time</TableHead>
    {/* <TableHead className='text-black'>Last Unlock</TableHead>
    <TableHead className='text-black'>Last Lock Status</TableHead>
    <TableHead className='text-black'>Last Door Status</TableHead> */}
    {/* <TableHead className='text-black'>No of Unlocks</TableHead>*/}

    <TableHead className='text-black'>Action</TableHead>
  </TableRow>
  )
}

export default TTLockHeader