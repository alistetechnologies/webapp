import { TableHead, TableRow } from '@/components/ui/table'
import { octiotFont } from '@/constants/config'
import { isOctiot } from '@/utils/browser'
import React from 'react'

function Header() {
  return (
    <TableRow className='text-black'>
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>S.No</TableHead>
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Id</TableHead>
    <TableHead className='text-black whitespace-nowrap text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Room installaed in</TableHead>
    {/* <TableHead className='text-black'>Connection Status</TableHead> */}
    <TableHead className='text-black whitespace-nowrap text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Connected Locks</TableHead> 
    <TableHead className='text-black text-center' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Connected Lock Rooms</TableHead>
  </TableRow>
  )
}

export default Header