import { TableHead, TableRow } from '@/components/ui/table'
import React from 'react'

function Header() {
  return (
    <TableRow className='text-black'>
    <TableHead className='text-black text-center'>S.No</TableHead>
    <TableHead className='text-black text-center'>Id</TableHead>
    <TableHead className='text-black whitespace-nowrap text-center'>Room installaed in</TableHead>
    {/* <TableHead className='text-black'>Connection Status</TableHead> */}
    <TableHead className='text-black whitespace-nowrap text-center'>Connected Locks</TableHead> 
    <TableHead className='text-black text-center'>Connected Lock Rooms</TableHead>
  </TableRow>
  )
}

export default Header