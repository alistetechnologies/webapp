import { TableCell, TableRow } from '@/components/ui/table'
import { unlockType } from '@/constants/config';
import moment from 'moment';
import React from 'react'

function Row({data,index}) {
  return (
   <TableRow>
    <TableCell>{index+1}</TableCell>
    <TableCell>{moment(data?.lockDate).format('LT')}</TableCell>
    <TableCell>{data?.recordType===32?"Inside":"OutSide"}</TableCell>
    <TableCell>{unlockType[String(data?.recordType)]}</TableCell>
   </TableRow>
  )
}

export default Row