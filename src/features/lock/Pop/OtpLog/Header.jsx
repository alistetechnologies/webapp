import { TableHead, TableRow } from '@/components/ui/table'
import React from 'react'

function Header() {
  return (
    <TableRow>
        <TableHead>S. No.</TableHead>
        <TableHead>Time Stamp</TableHead>
        <TableHead>OTP</TableHead>
        <TableHead>Type</TableHead>
    </TableRow>
  )
}

export default Header