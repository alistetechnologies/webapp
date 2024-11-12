import { TableHead, TableRow } from '@/components/ui/table';

export function ApplianceHeader() {
  return (
    <TableRow className='text-[0.85rem]'>
      <TableHead className='font-semibold text-black'>S.NO</TableHead>
      <TableHead className='font-semibold text-black'>Appliance Name</TableHead>
      <TableHead className='font-semibold text-black'>
        Appliance On time
      </TableHead>
      <TableHead className='font-semibold text-black'>
        Appliance Online time
      </TableHead>
      <TableHead className='font-semibold text-black'>Total Commands</TableHead>
      <TableHead className='font-semibold text-black'>Smart Commands</TableHead>
      <TableHead className='font-semibold text-black'>
        Switch Commands
      </TableHead>
      <TableHead className='font-semibold text-black'>State</TableHead>
      <TableHead className='font-semibold text-black'>Status</TableHead>
    </TableRow>
  );
  return (
    <div className='grid grid-cols-12 border-b border-gray-600/20 rounded-lg'>
      {/* Row 1 */}
      <div className='col-span-1 p-4 flex items-center justify-center'>
        S.No
      </div>

      <div className='col-span-2 p-4 flex items-center justify-center'>
        Appliance Name
      </div>

      <div className='col-span-2 p-4 flex items-center justify-center'>
        Appliance On time
      </div>

      <div className='col-span-2 p-4 flex items-center justify-center'>
        Appliance Online time
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        Total Command
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        Switch Command
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        Smart Command
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        State
      </div>

      <div className='col-span-1 p-4 flex items-center justify-center'>
        Status
      </div>
    </div>
  );
}
