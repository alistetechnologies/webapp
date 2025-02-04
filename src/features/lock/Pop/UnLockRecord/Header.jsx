import { TableHead, TableRow } from '@/components/ui/table'
import React from 'react'

function Header() {
  return (
    <TableRow>
        <TableHead>S. No.</TableHead>
        <TableHead>Time Stamp</TableHead>
        <TableHead>Area</TableHead>
        <TableHead>Method</TableHead>
        <TableHead>Lock Un-Lock</TableHead>
    </TableRow>
  )
}

export default Header