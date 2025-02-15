import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import useRoomStore from './roomSore'

export default function Room({room,index}) {
   const navigate=useNavigate()

  return (
    <TableRow className='text-lg'>
        <TableCell>{index+1}</TableCell>
        <TableCell>{room?.roomName}</TableCell>
        <TableCell>{(room?.ttlocks?.length || 0)+(room.ttgateways.length || 0)}</TableCell>
        <TableCell>
  <Button
    onClick={() => {
      useRoomStore.getState().updateRoom(room);
      navigate(`/lock/room/${room._id}`);
    }}
  >
    {showRoomDetails ? "Hide Details" : "View Details"}
  </Button>
</TableCell>

      </TableRow>
  )
}
