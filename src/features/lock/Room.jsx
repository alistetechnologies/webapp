import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import useRoomStore from './roomSore'
import { isOctiot } from '@/utils/browser'
import { octiotFont } from '@/constants/config'

export default function Room({room,index}) {
   const navigate=useNavigate()

  return (
    <TableRow className='text-lg'>
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{index+1}</TableCell>
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{room?.roomName}</TableCell>
        <TableCell style={{...(isOctiot ? {fontSize:octiotFont.subHeaderFontSize}:{})}}>{(room?.ttlocks?.length || 0)+(room.ttgateways.length || 0)}</TableCell>
        <TableCell>
          <Button
            onClick={() => {
              useRoomStore.getState().updateRoom(room);
               navigate(`/lock/room/${room._id}`)
            }}
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>
  )
}
