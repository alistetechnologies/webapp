import { TableHead, TableRow } from "@/components/ui/table";

export function MainHeader() {
  return (
    <TableRow className="text-black">
      <TableHead className="text-black">S.No</TableHead>
      <TableHead className="text-black">Room Name</TableHead>
      <TableHead className="text-black">Occupied</TableHead>
      <TableHead className="text-black">Total Devices</TableHead>
      <TableHead className="text-black">On Devices</TableHead>
      <TableHead className="text-black">Connectivity Status</TableHead>
      <TableHead className="text-black">Total Commands</TableHead>
      <TableHead className="text-black">Smart Commands</TableHead>
      <TableHead className="text-black">Switch Commands</TableHead>
      <TableHead className="text-black">Actions</TableHead>
    </TableRow>
  );
}
