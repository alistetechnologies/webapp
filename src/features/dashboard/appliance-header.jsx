import { TableHead, TableRow } from '@/components/ui/table';

export function ApplianceHeader() {
  return (
    <TableRow>
      <TableHead>S.NO</TableHead>
      <TableHead>Appliance Name</TableHead>
      <TableHead>Appliance On time</TableHead>
      <TableHead>Appliance Online time</TableHead>
      <TableHead>Total Commands</TableHead>
      <TableHead>Smart Commands</TableHead>
      <TableHead>Switch Commands</TableHead>
      <TableHead>State</TableHead>
      <TableHead>Status</TableHead>
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
