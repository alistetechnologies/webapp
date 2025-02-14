import { TableCell, TableRow } from '@/components/ui/table'
import { remoteTypes } from '@/constants/config'
import React from 'react'
import { Remote } from './Remote'

function NovaRow({remote,sno,deviceId}) {
  return (
    <TableRow className=''>
    <TableCell  className='text-lg'>{sno}</TableCell>
    <TableCell  className='text-lg'>{remote.name}</TableCell>
    <TableCell  className='text-lg'>{remoteTypes[remote.type]}</TableCell>
    <TableCell ><Remote remoteData={remote} deviceId={deviceId}/></TableCell>
    </TableRow>
  )
}

export default NovaRow