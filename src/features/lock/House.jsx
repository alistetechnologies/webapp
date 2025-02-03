import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import React, { useEffect, useState } from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'


export default function House({house,index}) {
   const navigate=useNavigate()
  
  return (
    <TableRow className='text-lg'>
        <TableCell>{index+1}</TableCell>
        <TableCell>{house?.label}</TableCell>
        <TableCell>
          <Button
            onClick={() => {
            //   useRoomStore.getState().updateRoom(room);
               navigate(`/lock/house/${house?.value}`)
            }}
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>
  )
}
