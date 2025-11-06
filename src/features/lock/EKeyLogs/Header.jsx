import { TableHead, TableRow } from '@/components/ui/table'
import React from 'react'

function Header() {
    return (
        <TableRow>
            <TableHead>E Key ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Type Of</TableHead>
            <TableHead>Start Time</TableHead>
            <TableHead>End Time</TableHead>
            <TableHead>Active</TableHead>
            <TableHead>Created Date</TableHead>
            <TableHead></TableHead>
        </TableRow>
    )
}

export default Header
