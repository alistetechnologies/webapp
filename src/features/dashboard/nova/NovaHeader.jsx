import { TableHead, TableRow } from '@/components/ui/table';

export function NovaHeader() {
  return (
    <TableRow className='text-[0.85rem]'>
      <TableHead className='text-black'>S.NO</TableHead>
      <TableHead className='text-black'>Remote Name</TableHead>
      <TableHead className='text-black'>Type</TableHead>
      <TableHead className='text-black'>Remote</TableHead>

    </TableRow>
  );
}