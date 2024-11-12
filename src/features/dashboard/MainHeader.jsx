import { TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Table } from 'lucide-react';

export function MainHeader() {
  return (
    <TableRow>
      <TableHead>S.NO</TableHead>
      <TableHead>ROOM NAME</TableHead>
      <TableHead>TOTAL DEVICES</TableHead>
      <TableHead>CONNECTED DEVICES</TableHead>
      <TableHead>TOTAL COMMANDS</TableHead>
      <TableHead>SMART COMMANDS</TableHead>
      <TableHead>SWITCH COMMANDS</TableHead>
      <TableHead>ACTIONS</TableHead>
    </TableRow>
  );
}
