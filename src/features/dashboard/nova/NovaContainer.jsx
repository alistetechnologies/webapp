import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import React from 'react'
import { NovaHeader } from './novaHeader'
import NovaRow from './NovaRow'

function NovaContainer({novas}) {
  return (
    <TableRow className=' w-full p-0'>
      <TableCell colspan='8' className='p-0'>
        <Table className='bg-slate-100/50 rounded w-full'>
          <TableHeader>
            <NovaHeader/>
          </TableHeader>
          <TableBody>
            {
              novas.length>0 && novas.map((nova,outer)=>{
                return nova.custom_remotes.map((remote,inner)=>{
                    let sno= (outer+1)*(inner+1)
                    return (
                        <NovaRow
                         remote={remote}
                         deviceId={nova.deviceId}
                         sno={sno}
                        />
                    )
                })
                
            
              })}
         </TableBody>
        </Table>
        </TableCell>
        </TableRow>
  )
}

export default NovaContainer