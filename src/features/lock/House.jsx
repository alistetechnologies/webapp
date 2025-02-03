import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import React from 'react'
import { useNavigate, useNavigation } from 'react-router-dom'
import { useUser } from '../auth/api/userStore'


export default function House({house,index}) {
   const navigate=useNavigate()
   const user = useUser.getState().user
  
  return (
    <TableRow className='text-lg'>
        <TableCell>{index+1}</TableCell>
        <TableCell>{house?.label}</TableCell>
        <TableCell>
          <Button
            onClick={() => {
            useUser.getState().updateUser({...user,selectedHouse:house?.value});
               navigate(`/lock/house`)
            }}
          >
            View Details
          </Button>
        </TableCell>
      </TableRow>
  )
}
