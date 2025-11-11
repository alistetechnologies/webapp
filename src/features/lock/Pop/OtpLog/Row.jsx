import { TableCell, TableRow } from '@/components/ui/table'
import { octiotFont, otpType } from '@/constants/config';
import { isOctiot } from '@/utils/browser';
import moment from 'moment';
import React from 'react'

function Row({data,index}) {
  return (
   <TableRow>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{index+1}</TableCell>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{moment(data?.timestamp).format('LT')}</TableCell>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{data?.otp}</TableCell>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{otpType[String(data?.otpType)]} - {data?.otpType}</TableCell>
   </TableRow>
  )
}

export default Row