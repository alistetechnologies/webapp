import { TableHead, TableRow } from '@/components/ui/table'
import { octiotFont } from '@/constants/config'
import { isOctiot } from '@/utils/browser'
import React from 'react'

function TTLockHeader() {
  return (
    <TableRow className='text-black'>
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>S.No</TableHead>
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Id</TableHead>
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Room</TableHead>
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Conneted to Hub</TableHead>
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Battery Percentage</TableHead> 
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Last Sync Time</TableHead>
    {/* <TableHead className='text-black'>Last Unlock</TableHead>
    <TableHead className='text-black'>Last Lock Status</TableHead>
    <TableHead className='text-black'>Last Door Status</TableHead> */}
    {/* <TableHead className='text-black'>No of Unlocks</TableHead>*/}

    <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Action</TableHead>
  </TableRow>
  )
}

export default TTLockHeader