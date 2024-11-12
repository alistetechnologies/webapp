import { TableHead, TableRow } from '@/components/ui/table';

export function MainHeader() {
  return (
    <TableRow className='text-[1rem]'>
      <TableHead className='font-semibold text-black'>S.No</TableHead>
      <TableHead className='font-semibold text-black'>Room Name</TableHead>
      <TableHead className='font-semibold text-black'>Total Devices</TableHead>
      <TableHead className='font-semibold text-black'>
        Connected Devices
      </TableHead>
      <TableHead className='font-semibold text-black'>Total Commands</TableHead>
      <TableHead className='font-semibold text-black'>Smart Commands</TableHead>
      <TableHead className='font-semibold text-black'>
        Switch Commands
      </TableHead>
      <TableHead className='font-semibold text-black'>Actions</TableHead>
    </TableRow>
  );
}
