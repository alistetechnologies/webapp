import { TableCell, TableRow } from '@/components/ui/table'
import { octiotFont, remoteTypes } from '@/constants/config'
import React from 'react'
import { Remote } from './Remote'
import { isOctiot } from '@/utils/browser'

function NovaRow({remote,sno,deviceId}) {
  return (
    <TableRow className=''>
    <TableCell  className='text-lg' style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{sno}</TableCell>
    <TableCell  className='text-lg' style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{remote.name}</TableCell>
    <TableCell  className='text-lg' style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{remoteTypes[remote.type]}</TableCell>
    <TableCell ><Remote remoteData={remote} deviceId={deviceId}/></TableCell>
    </TableRow>
  )
}

export default NovaRow