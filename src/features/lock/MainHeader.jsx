import { TableHead, TableRow } from '@/components/ui/table';

export function MainHeader() {
  return (
    <TableRow className='text-black'>
      <TableHead className='text-black'>S.No</TableHead>
      <TableHead className='text-black'>House Name</TableHead>
      <TableHead className='text-black'>Actions</TableHead>
    </TableRow>
  );
}
