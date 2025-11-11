import { TableHead, TableRow } from '@/components/ui/table'
import { octiotFont } from '@/constants/config'
import { isOctiot } from '@/utils/browser'
import React from 'react'

function Header() {
  return (
    <TableRow>
        <TableHead style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>S. No.</TableHead>
        <TableHead style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Time Stamp</TableHead>
        <TableHead style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>OTP</TableHead>
        <TableHead style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Type</TableHead>
    </TableRow>
  )
}

export default Header