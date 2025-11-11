import { TableHead, TableRow } from '@/components/ui/table';
import { octiotFont } from '@/constants/config';
import { isOctiot } from '@/utils/browser';

export function MainHeader() {
  return (
    <TableRow className='text-black'>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>S.No</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>House Name</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Actions</TableHead>
    </TableRow>
  );
}
