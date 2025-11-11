import { TableCell, TableRow } from '@/components/ui/table'
import { octiotFont, unlockType } from '@/constants/config';
import { isOctiot } from '@/utils/browser';
import moment from 'moment';
import React from 'react'

function Row({data,index}) {
  return (
   <TableRow>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{index+1}</TableCell>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{moment(data?.lockDate).format('LT')}</TableCell>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{data?.recordType===32?"Inside":"OutSide"}</TableCell>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{unlockType[String(data?.recordType)]}{data?.recordType===4 && ` - ${data?.keyboardPwd}`}</TableCell>
    <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{data?.success===1?"Yes":"NO"}</TableCell>
   </TableRow>
  )
}

export default Row