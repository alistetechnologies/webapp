import { TableCell, TableRow } from '@/components/ui/table'
import { otpType } from '@/constants/config';
import moment from 'moment';
import React from 'react'

function Row({data,index}) {
  return (
   <TableRow>
    <TableCell>{index+1}</TableCell>
    <TableCell>{moment(data?.timestamp).format('LT')}</TableCell>
    <TableCell>{data?.hubId}</TableCell>
 
   </TableRow>
  )
}

export default Row