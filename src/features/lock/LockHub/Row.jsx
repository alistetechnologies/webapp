import { Button } from '@/components/ui/button';
import { TableCell, TableRow } from '@/components/ui/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react'

function Row({ lock, index, lockRoomName, hubConneted }) {
  let [roomName, setRoomName] = useState("")
  useEffect(() => {
    if (Object.keys(lockRoomName).length > 0 && hubConneted.length > 0) {
      let name = hubConneted.filter(e => e.hubId === lock.gatewayId).reduce((p, c) => {
        if (lockRoomName[c.lockId] !== undefined) {
          return `${p === "" ? "" : `${p},`}${lockRoomName[c.lockId]}`
        } else {
          return p
        }
      }, "")

      setRoomName(name)
    }
  }, [lockRoomName, hubConneted])
  return (

    <TableRow className='text-lg' key={lock?.gatewayId}>
      <TableCell className=" text-center">{index + 1}</TableCell>
      <TableCell className=" text-center">{lock?.gatewayId}</TableCell>
      <TableCell className=" text-center">{lock?.roomName}</TableCell>

      {/* <TableCell>{}</TableCell> */}
      <TableCell className=" text-center">{lock?.locks?.length}</TableCell>
      <TableCell className=" text-center whitespace-nowrap">{roomName}</TableCell>

    </TableRow>


  )
}

export default Row