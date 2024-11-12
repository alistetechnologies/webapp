import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ApplianceDetails } from './appliance-details';
import { ApplianceHeader } from './appliance-header';

export function Appliances({ appliances, analysisData, connectedDevices }) {
  return (
    <TableRow className=' w-full p-0'>
      <TableCell colspan='8' className='p-0'>
        <Table className='bg-[#e6e4ee] rounded w-full'>
          <TableHeader>
            <ApplianceHeader />
          </TableHeader>
          <TableBody>
            {analysisData &&
              analysisData
                ?.flat()
                ?.map((device, sno) => (
                  <ApplianceDetails
                    appliances={appliances}
                    analysisData={device}
                    sno={sno + 1}
                    connectedDevices={connectedDevices}
                  />
                ))}
          </TableBody>
        </Table>
      </TableCell>
    </TableRow>
  );
  return (
    <Table className='bg-[#e6e4ee] rounded-lg'>
      <TableHeader></TableHeader>
      <ApplianceHeader />

      {analysisData &&
        analysisData
          ?.flat()
          ?.map((device, sno) => (
            <ApplianceDetails
              appliances={appliances}
              analysisData={device}
              sno={sno + 1}
              connectedDevices={connectedDevices}
            />
          ))}
    </Table>
  );
}