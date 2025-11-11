import { TableHead, TableRow } from '@/components/ui/table';
import { octiotFont } from '@/constants/config';
import { isOctiot } from '@/utils/browser';

export function NovaHeader() {
  return (
    <TableRow className='text-[0.85rem]'>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>S.NO</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Remote Name</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Type</TableHead>
      <TableHead className='text-black' style={{...(isOctiot ? {fontSize:octiotFont.headerFontSize} : {})}}>Remote</TableHead>

    </TableRow>
  );
}